/**
 * Node.js script to write the build info file with the current build information.
 */
require('shelljs/global');

var path = require('path'),
    dateFormat = require('dateformat'),
    buildFolder = './public',
    user = env['USER'],
    package_name = env['npm_package_name'],
    version = env['npm_package_version'],
    buildFile = path.join(buildFolder, 'builddate.txt'),
    currentDateTime = dateFormat('dddd yyyy-mm-dd HH:MM'),
    infoMessage = 'Built ' + package_name + ' version ' + version + ' on ' + currentDateTime + ' by ' + user;

echo(infoMessage).to(buildFile);
