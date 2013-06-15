define(
  [ 'backbone' ],
  function( Backbone ) {
    'use strict';

    // Global unique id.
    var uid = 0;

    function nextUid() {
      var currUid = uid;
      uid++;
      return currUid;
    }

    var TreeNode = Backbone.Model.extend({
      defaults: function() {
        return {
          id: nextUid(),
          data: null,

          parent: null,
          left: null,
          right: null
        };
      }
    });

    return TreeNode;
  }
);
