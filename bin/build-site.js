/**
 * Created by john8301 on 3/3/16.
 * Set all our internal variables to defaults.
 * sourceFolder and publicBuildFolder can be overridden from the command line.
 */
var sass = require('node-sass'),
    fs = require('fs'),
    requirejs = require('requirejs'),
    rsync = require('rsync'),
    sourceFolder = './src/app',
    publicBuildFolder = './public',
    cssOutPath = publicBuildFolder + '/css',
    cssOutFile = cssOutPath + '/main.css',
    jsOutPath = publicBuildFolder + '/js',
    jsOutFile = jsOutPath + '/index.js',
    inputPath = sourceFolder + '/styles',
    inputFile = inputPath + '/main.scss',
    args = process.argv.slice(2);

// if we get args, 1st arg is the source, 2nd is the destination.
if (args[0]) {
    sourceFolder = args[0];
    console.log("Source files is set to " + sourceFolder);
}
if (args[1]) {
    publicBuildFolder = args[1];
    console.log("Build folder is set to " + publicBuildFolder);
}

fs.mkdir(publicBuildFolder, function (error) {
      fs.mkdir(cssOutPath, function (error) {
        // ignore already exist error
      });
      fs.mkdir(jsOutPath, function (error) {
        // ignore already exist error
      });
});

// Compile CSS
sass.render({
      file: inputFile,
      includePaths: [inputPath],
      outFile: cssOutFile,
      outputStyle: 'compressed',
      sourceMap: true
  }, function(error, result) {
      if (error) {
          console.log('Error rendering ' + cssOutFile + ' from ' + inputFile + ': ' + error.status + ', (' + error.column + ', ' + error.line + '), ' + error.message);
      } else {
          fs.writeFile(cssOutFile, result.css, function (error) {
              if (error) {
                  console.log('Error writing file ' + cssOutFile + ': ' + error.message);
              }
          })
      }
});

// Copy all assets files verbatim. This phase assumes everything in the source assets folder belongs in the root
// of the website and is copied without any processing.
copyCommand = new rsync();
copyCommand.flags('aqu')
    .shell('ssh')
    .source(sourceFolder + '/assets/*')
    .destination(publicBuildFolder);

copyCommand.execute(function(error, code, cmd) {
    if (error) {
        console.log('Not able to copy assets', cmd, error.message);
    } else {
        console.log('Finished copying assets', cmd);
    }
});

// Next we should process MarkDown files, assemble HTML partials, and copy all HTML files. For now just copy index.html
copyCommand = new rsync();
copyCommand.flags('aqu')
    .shell('ssh')
    .source(sourceFolder + '/*.html')
    .destination(publicBuildFolder);

copyCommand.execute(function(error, code, cmd) {
  if (error) {
    console.log('Not able to copy html files', cmd, error.message);
  } else {
    console.log('Finished copying html files', cmd);
  }
});

// Optimize all JavaScript files
var optimizerConfig = {
  baseUrl: sourceFolder + '/js',
  paths: ['lib'],
  name: 'index',
  out: jsOutFile
};

requirejs.optimize(optimizerConfig, function (buildResponse) {
    console.log('Optimized JavaScript files');
}, function (error) {
    console.log('Error optimizing JavaScript files', error.message);
});

// Copy over unoptimized (because they already are) JavaScript libraries
var libFolder = '/lib';
copyCommand = new rsync();
copyCommand.flags('aqu')
    .shell('ssh')
    .source(sourceFolder + libFolder)
    .destination(publicBuildFolder);

copyCommand.execute(function(error, code, cmd) {
  if (error) {
    console.log('Not able to copy libraries', cmd, error.message);
  } else {
    console.log('Finished copying libraries', cmd);
  }
});
