/*
 * A very simple AMD module with no dependencies to drive the index.html page.
 */

requirejs.config({
  baseUrl: '',
  paths: {
      app: 'js'
  }
});

require([
  'commonUtilities'
], function (commonUtilities) {

  document.body.className += ' loaded';
  var str = commonUtilities.objectToString({id: 45, name: "testObject", version: commonUtilities.version, description: "Test object for testing things", runDate: new Date()});
  document.getElementById('test3').innerText = str;
});
