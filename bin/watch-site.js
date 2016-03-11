/**
 * Created by john8301 on 3/4/16.
 */
var browserSync = require("browser-sync").create(),
    publicBuildFolder = './public',
    args = process.argv.slice(2);

if (args[1]) {
  publicBuildFolder = args[0];
  console.log("Build folder is set to " + publicBuildFolder);
}

// .init starts the server
browserSync.init({
  server: publicBuildFolder
});

// Now call methods on bs instead of the
// main browserSync module export
browserSync.reload("*.html");
