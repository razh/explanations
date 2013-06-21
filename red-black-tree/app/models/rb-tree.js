define(
  [ '../../../binary-tree/app/models/tree',
    './rb-tree-node' ],
  function( Tree, RBTreeNode ) {

    var RBTree = Tree.extend({
      defaults: {
        nil: new RBTreeNode()
      },

      insert: function( data ) {
        var child = this.get( 'nil' );
        console.log( 'insert' );
        console.log( child );

      },

      delete: function( data ) {

      }
    });

    return RBTree;
  }
);
