define(
  [ 'jquery',
    'red-black-tree/models/rb-tree',
    'red-black-tree/views/rb-tree-view',
    'linked-list/views/input-view' ],
  function( $, RBTree, RBTreeView, InputView ) {
    'use strict';

    var tree, treeView, inputView, el;

    function initialize() {
      el = $( '#app' )
        .append( '<div id="rb-tree-view"></div>' )
        .append( '<div id="input-view"></div>' );

      tree = new RBTree();
      // tree.insert( 5 );
      // tree.insert( 3 );
      // tree.insert( 2 );
      // tree.insert( 4 );
      // tree.insert( 6 );

      tree.insert( 1 );
      tree.insert( 2 );
      tree.insert( 3 );
      tree.insert( 4 );
      tree.insert( 5 );
      // tree.insert( 59 );
      // tree.insert( 6 );
      // tree.delete( tree.search( 59 ));
      console.log( tree.toArray() );
      console.log( tree.get( 'root' ) );

      // setTimeout(function() {
      //   tree.insert( 20 );
      //   tree.insert( 78 );
      //   treeView.render();
      // }, 5000 );

      treeView = new RBTreeView({
        el: '#rb-tree-view',
        model: tree
      });

      console.log( treeView );
      treeView.render();

      inputView = new InputView({
        el: '#input-view',
        model: tree
      });

      inputView.render();
    }

    function destroy() {
      tree.destroy();

      treeView.remove();
      inputView.remove();

      el.empty();
    }

    return {
      initialize: initialize,
      destroy: destroy
    };
  }
);
