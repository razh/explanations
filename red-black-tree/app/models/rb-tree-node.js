define(
  [ '../../../binary-tree/app/models/tree-node' ],
  function( TreeNode ) {
    'use strict';

    var RED   = 0,
        BLACK = 1;

    var RBTreeNode = TreeNode.extend({
      defaults: function() {
        var defaults = TreeNode.prototype.defaults();
        defaults.color = RED;
        return defaults;
      }
    });

    // Attach enum to exports.
    RBTreeNode.RED   = RED;
    RBTreeNode.BLACK = BLACK;

    return RBTreeNode;
  }
);
