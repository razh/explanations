define(
  [ 'shared/models/node' ],
  function( Node ) {
    'use strict';

    var TreeNode = Node.extend({
      defaults: function() {
        var defaults = Node.prototype.defaults();
        defaults.parent   = null;
        defaults.children = [];
        return defaults;
      }
    });

    return TreeNode;
  }
);
