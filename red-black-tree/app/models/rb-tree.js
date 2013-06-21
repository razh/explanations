define(
  [ '../../../binary-tree/app/models/tree' ],
  function( Tree ) {

    var RBTree = Tree.extend({
      insert: function( data ) {
        console.log( 'rb-insert' );
      },

      delete: function( data ) {

      }
    });

    return RBTree;
  }
);
