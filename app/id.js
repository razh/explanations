define(function() {
  'use strict';

  // Global unique id.
  var uid = 1;

  return {
    nextUid: function() {
      var currUid = uid;
      uid++;
      return currUid;
    }
  };
});
