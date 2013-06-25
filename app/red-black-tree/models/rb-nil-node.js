define(
  [ 'red-black-tree/models/tree-node' ],
  function( RBTreeNode ) {
    'use strict';

    var Nil = RBTreeNode.extend({
      defaults: function() {
        // Set default color to black.
        var defaults = RBTreeNode.prototype.defaults();
        defaults.color = RBTreeNode.BLACK;
        return defaults;
      },

      toArray: function() {
        return [];
      },

      toJSON: function() {
        return {};
      },
    });

    return Nil;
  }
);
