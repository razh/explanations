define(
  [ 'jquery',
    'binary-tree/models/binary-tree',
    'binary-tree/views/binary-tree-view',
    'shared/views/input-view',
    'linked-list/views/list-view-utils' ],
  function( $, BinaryTree, BinaryTreeView, InputView, Utils ) {
    'use strict';

    var tree, treeView, inputView, el;

    function initialize() {
      el = $( '#app' )
        .append( '<div class="binary-tree padded" id="binary-tree"></div>' )
        .append( '<div class="input" id="input"></div>' );

      tree = new BinaryTree();
      tree.insert( 180 );
      tree.insert( 49 );
      tree.insert( 59 );
      tree.insert( 72 );
      tree.insert( 20 );
      tree.insert( 25 );

      console.log( tree.toArray() );
      console.log( tree.min().get( 'data' ) );
      console.log( tree.max().get( 'data' ) );

      tree.delete( tree.search( 72 ) );
      console.log( tree.toArray() );

      tree.delete( tree.search( 20 ) );
      console.log( tree.toArray() );

      tree.delete( tree.search( 180 ) );
      console.log( tree.toArray() );

      console.log( tree.toJSON() );

      var insertAt = Utils.insertAtFn( tree ),
          duration = 1000;

      insertAt( 87, duration );
      insertAt( 19, 2 * duration );
      insertAt( 35, 3 * duration );

      treeView = new BinaryTreeView({
        el: '#binary-tree',
        model: tree
      });

      treeView.render();

      inputView = new InputView({
        el: '#input',
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
