/**
 * Created by john8301 on 2/17/16.
 * Functional test to validate index.html
 */

define(function (require) {
  var registerSuite = require('intern!object');
  var assert = require('intern/chai!assert');

  registerSuite(function () {
    var testCounter = 0;

    return {
      name: 'index',

      'greeting form': function () {
        return this.remote
            .get(require.toUrl('index.html'))
            .setFindTimeout(5000)
            .findByCssSelector('body.loaded')
            .findById('nameField')
            .click()
            .type('Varyn')
            .end()
            .findByCssSelector('#loginForm input[type=submit]')
            .click()
            .end()
            .findById('greeting')
            .getVisibleText()
            .then(function (text) {
              assert.strictEqual(text, 'Hello, Varyn!',
                  'Greeting should be displayed when the form is submitted');
            });
      },

      'dummy': function () {
        return this.remote
            .get(require.toUrl('index.html'))
            .setFindTimeout(5000)
            .findByCssSelector('body.awesome');
      }
    }
  });
});
