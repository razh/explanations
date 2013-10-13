/*globals define*/
define(function() {
  'use strict';

  // Global unique id.
  // Starts at 1 because the id filter function ignores nodes with ids of 0.
  var uid = 1;

  return {
    nextUid: function() {
      return uid++;
    }
  };
});
