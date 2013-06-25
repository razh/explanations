define(
  [ 'jquery',
    'red-black-tree/models/rb-tree',
    'red-black-tree/views/rb-tree-view',
    'binary-tree/views/input-view' ],
  function( $, RBTree, RBTreeView, InputView ) {
    'use strict';

    var tree, treeView, inputView, el;

    function initialize() {
      el = $( '#app' )
        .append( '<div id="rb-tree-view"></div>' )
        .append( '<div id="input-view"></div>' );

      tree = new RBTree();
      tree.insert( 59 );
      tree.insert( 6 );
      tree.delete( tree.search( 59 ));
      console.log( tree.toArray() );

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
    }
  }
);
