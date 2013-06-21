define(
  [ '../../../binary-tree/app/models/tree',
    './rb-tree-node' ],
  function( Tree, RBTreeNode ) {
    'use strict';

    var RBTree = Tree.extend({
      insert: function( data ) {
        Tree.prototype.insert.call( this, data );
      },

      delete: function( data ) {
        Tree.prototype.delete.call( this, data );
      }
    });

    return RBTree;
  }
);
