var vows = require('vows');
var assert = require('assert');
var util = require('util');
var github = require('passport-cloudsdale');


vows.describe('passport-cloudsdale').addBatch({
  
  'module': {
    'should report a version': function (x) {
      assert.isString(github.version);
    },
  },
  
}).export(module);
