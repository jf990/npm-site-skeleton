/**
 * Unit test to validate site-skeleton using Chai expect interface.
 * expect(expr, error-message).
 * .to.equal(expr-b) text is expr === expr-b
 * .to.be.a(string) test expr is of type(string)
 * .to.have.length(int) test expr is evaluated to length()
 * .to.have.property(string) test expr is an object with property.string
 * See http://chaijs.com/api/bdd/ for more chains.
 * Created by john8301 on 2/17/16.
 */

define(function (require) {
  var registerSuite = require('intern!object'),
      expect = require('intern/chai!expect'),
      commonUtilities = require('src/app/js/commonUtilities'),
      dateformat = require('intern/dojo/node!dateformat'); // use the Dojo loader to get our node module

  registerSuite(function () {
    var testCounter = 0;
    return {
      name: 'common',

      /**
       * A set of unit tests to verify Chai+Intern are working properly.
       */
      ObjectUnitTest: function () {
        var obj = {id: 1, name: 'test', title: 'test', value: 500, items: [1, 2, 3, 4, 5, 6]};
        testCounter ++;
        expect(obj, 'Object test Chai expect interface on prop').to.have.property('title');
        expect(obj, 'Object test Chai expect interface on non-existent prop').not.to.have.property('info');
        expect(obj, 'Object test Chai expect interface on type').to.be.an('object');
        expect(obj.title, 'Object test Chai expect interface on type').to.be.a('string');
        expect(obj.items, 'Object test Chai expect interface on type').to.be.an('array');
        expect(obj.id, 'Object test Chai expect interface on type').to.be.a('number');
        expect(obj.id, 'Object test Chai expect interface on value').to.be.equal(1);
      },

      ChaiCoreUnitTest: function () {
        testCounter ++;
        expect(1, 'Integer 1').to.be.a('number');
        expect(1, 'Integer 1').to.equal(1);
        expect(true, 'Boolean/true').to.equal(1 == 1);
        expect(false, 'Boolean/false').to.equal(1 == 0);
        expect(true, 'Boolean/true').to.be.true;
        expect(false, 'Boolean/false').to.be.false;
      },

      DateFormatTest: function () {
        var value,
            testString;

        testCounter ++;
        expect(dateformat, 'DateFormatTest 1').to.be.a('Function');
        testString = "Jun 9 2007";
        value = dateformat(testString, "fullDate");
        expect(value, 'DateFormatTest "' + testString + '"').to.equal('Saturday, June 9, 2007');
      },

      TestCounterTest: function () {
        testCounter ++;
        expect(testCounter, 'testCounter should be 4').to.equal(4);
      },

      /**
       * General test of the CommonUtilities package
       * @constructor
       */
      CommonUtiltiesTest: function () {
        var value;

        value = commonUtilities.version;
        expect(value, 'commonUtilities.version to be a non-empty string').to.be.a('string');
        expect(value.length, 'commonUtilities.version to be a non-empty string').to.be.greaterThan(0);
      },

      /**
       * Test of the CommonUtilities package utf8 functions
       * @constructor
       */
      "CommonUtiltiesTest utf8Encode": function () {
        var value,
            testString,
            compareString;

        testString = "♔ ♕ ♖ ♗ ♘ ♙ ♚ ♛ ♜ ♝ ♞ ♟ ♠ ♡ ♢ ♣ ♤ ♥ ♦ ♧ ♨ ♩ ♪ ♫ ♬ ♭ ♮ ♯";
        value = commonUtilities.utf8Encode(testString);
        expect(value, 'commonUtilities.utf8Encode to be a non-empty string').to.be.a('string');
        expect(value.length, 'commonUtilities.utf8Encode to be a non-empty string').to.be.greaterThan(0);

        compareString = commonUtilities.utf8Decode(value);
        expect(compareString, 'commonUtilities.utf8Decode to be a non-empty string').to.be.a('string');
        expect(compareString.length, 'commonUtilities.utf8Decode to be a non-empty string').to.be.greaterThan(0);
        expect(compareString, 'commonUtilities.utf8Decode to equal original string').to.equal(testString);
      },

      /**
       * Test of the CommonUtilities package base64 functions
       * @constructor
       */
      "CommonUtiltiesTest base64": function () {
        var value,
            testString,
            compareString;

        testString = "Line feature will not be written to the output if they are made up of less than two vertices.";
        value = commonUtilities.base64Encode(testString);
        expect(value, 'commonUtilities.base64Encode to be a non-empty string').to.be.a('string');
        expect(value.length, 'commonUtilities.base64Encode to be a non-empty string').to.be.greaterThan(0);

        compareString = commonUtilities.base64Decode(value);
        expect(compareString, 'commonUtilities.base64Decode to be a non-empty string').to.be.a('string');
        expect(compareString.length, 'commonUtilities.base64Decode to be a non-empty string').to.be.greaterThan(0);
        expect(compareString, 'commonUtilities.base64Decode to equal original string').to.equal(testString);
      },

      /**
       * Test of the CommonUtilities package queryString functions
       * @constructor
       */
      "CommonUtiltiesTest queryString": function () {
        var value,
            testString;

        testString = "i=main&mode=front&sid=de8d49b78a85a322c4155015fdce22c4&enc=+Hello%20&empty";
        value = commonUtilities.queryStringToObject(testString);
        expect(value, 'commonUtilities.queryStringToObject expect type').to.be.an('object');
        expect(value, 'commonUtilities.queryStringToObject expect prop').to.have.property('mode');
        expect(value, 'commonUtilities.queryStringToObject expect non-existent prop').not.to.have.property('info');
        expect(value.i, 'commonUtilities.queryStringToObject expect prop').to.be.a('string');
        expect(value.i, 'commonUtilities.queryStringToObject expect prop').to.equal('main');
      },

      /**
       * Test of the CommonUtilities package arrayToString functions
       * @constructor
       */
      "CommonUtiltiesTest arrayToString": function () {
        var value,
            testArray;

        testArray = Array(1,2,3,4,5,6,7,8,9,0);
        value = commonUtilities.arrayToString(testArray);
        expect(value, 'commonUtilities.queryStringToObject expect type').to.be.a('string');
        expect(value, 'commonUtilities.queryStringToObject expect value').to.equal('[0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 0]');

        testArray = Array("red", "blue", "green", "yellow", "orange", "cyan", "magenta");
        value = commonUtilities.arrayToString(testArray);
        expect(value, 'commonUtilities.queryStringToObject expect type').to.be.a('string');
        expect(value, 'commonUtilities.queryStringToObject expect value').to.equal('[0: red, 1: blue, 2: green, 3: yellow, 4: orange, 5: cyan, 6: magenta]');

        testArray = Array();
        value = commonUtilities.arrayToString(testArray);
        expect(value, 'commonUtilities.queryStringToObject expect type').to.be.a('string');
        expect(value, 'commonUtilities.queryStringToObject expect empty value').to.equal('[]');

        testArray = null;
        value = commonUtilities.arrayToString(testArray);
        expect(value, 'commonUtilities.queryStringToObject expect type').to.be.a('string');
        expect(value, 'commonUtilities.queryStringToObject expect null value').to.equal('null');

        testArray = Array();
        testArray['red'] = 'banana';
        testArray[2] = 'apple';
        testArray['id'] = 'kiwi';
        testArray[12] = 'grapefruit';
        value = commonUtilities.arrayToString(testArray);
        expect(value, 'commonUtilities.queryStringToObject expect type').to.be.a('string');
        expect(value, 'commonUtilities.queryStringToObject expect value').to.equal('[2: apple, 12: grapefruit, red: banana, id: kiwi]');
      },

      /**
       * Test of the CommonUtilities package tokenReplace functions
       * @constructor
       */
      "CommonUtiltiesTest tokenReplace": function () {
        var value,
            testString;

        testString = "This {nounA} is a {nounB}.";
        value = commonUtilities.tokenReplace(testString, {nounA: "Dog", nounB: "Husky"});
        expect(value, 'commonUtilities.tokenReplace validation').to.equal('This Dog is a Husky.');
        testString = "This {nounA} is a {nounB}. We love {nounA}! Time for more {nounA}!";
        value = commonUtilities.tokenReplace(testString, {nounA: "Dog", nounB: "Husky", a: 1, b: 34, c: "chocolate"});
        expect(value, 'commonUtilities.tokenReplace validation').to.equal('This Dog is a Husky. We love Dog! Time for more Dog!');
        testString = "This {a} is a {b}. We love {c}! Time for more {nounA}!";
        value = commonUtilities.tokenReplace(testString, {nounA: "Dog", nounB: "Husky", a: 1.5, b: 34, c: "chocolate"});
        expect(value, 'commonUtilities.tokenReplace validation').to.equal('This 1.5 is a 34. We love chocolate! Time for more Dog!');
      },

      /**
       * Test of the CommonUtilities package validateFields functions
       * @constructor
       */
      "CommonUtilitesTest validateFields": function () {
        var value,
            testString;

        var testObject = {firstName: "Janice",
              lastName: "Brown",
              dob: new Date(Date.parse("2002/02/26")),
              email: "",
              phone: "",
              password: "xx",
              level: "guest",
              gender: "X",
              optIn: "Y"
            };
        var testRules = {
          firstName: {type: "string", optional: false, min: 1, max: 20},
          lastName: {type: "string", optional: false, min: 2, max: 20},
          dob: {type: "date", optional: false, min: new Date(Date.parse("2001-01-01")).getTime(), max: new Date(Date.parse("2005-12-31")).getTime()},
          gender: {type: "string", optional: false, validator: function (field, value) {return value == "M" || value == "Male" || value == 'F' || value == 'Female';}},
          optIn: {type: "bool", optional: false, options: ["Y", "N"]},
          email: {type: "string", optional: false, min: 5, max: 80},
          phone: {type: "string", optional: true, min: 10, max: 20},
          level: {type: "string", optional: false, options:["guest","user","editor","moderator","admin"]},
          password: {type: "string", optional: false, min: 4, max: 20}
        };

        value = commonUtilities.validateFields(testObject, testRules);
        expect(value, 'commonUtilities.validateFields expect type').to.be.an('Array');
      },

      /**
       * Validate the roundTo function
       * @constructor
       */
      "CommonUtilitesTest roundTo" : function () {
        var value,
            result,
            expectedResult;

        value = 45;
        expectedResult = 45;
        result = commonUtilities.roundTo(value, 2);
        expect(result, 'commonUtilities.roundTo expect equal').to.equal(expectedResult);

        value = 45.00001;
        expectedResult = 45.00;
        result = commonUtilities.roundTo(value, 2);
        expect(result, 'commonUtilities.roundTo expect equal').to.equal(expectedResult);

        value = 45.222222222222;
        expectedResult = 45.22;
        result = commonUtilities.roundTo(value, 2);
        expect(result, 'commonUtilities.roundTo expect equal').to.equal(expectedResult);

        value = 45.222299999999;
        expectedResult = 45.2223;
        result = commonUtilities.roundTo(value, 4);
        expect(result, 'commonUtilities.roundTo expect equal').to.equal(expectedResult);

        value = 45.222249999999;
        expectedResult = 45.2222;
        result = commonUtilities.roundTo(value, 4);
        expect(result, 'commonUtilities.roundTo expect equal').to.equal(expectedResult);
      }
    }
  });
});
