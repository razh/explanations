define(
  [ 'binary-tree/models/tree-node' ],
  function( TreeNode ) {
    'use strict';

    var RED   = 0,
        BLACK = 1;

    var RBTreeNode = TreeNode.extend({
      defaults: function() {
        var defaults = TreeNode.prototype.defaults();
        defaults.color = RED;
        return defaults;
      },

      toJSON: function() {
        var jsonObject = TreeNode.prototype.toJSON.call( this );
        jsonObject.color = this.get( 'color' );
        return jsonObject;
      }
    });

    // Attach enum to exports.
    RBTreeNode.RED   = RED;
    RBTreeNode.BLACK = BLACK;

    return RBTreeNode;
  }
);
