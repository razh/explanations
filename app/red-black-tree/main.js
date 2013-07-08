define(
  [ 'jquery',
    'red-black-tree/models/rb-tree',
    'red-black-tree/views/rb-tree-view',
    'shared/views/input-view' ],
  function( $, RBTree, RBTreeView, InputView ) {
    'use strict';

    var tree, treeView, inputView, el;

    function initialize() {
      el = $( '#app' )
        .append( '<div id="rb-tree-view"></div>' )
        .append( '<div id="input-view"></div>' );

      tree = new RBTree();
      tree.insert( 1 );

      var duration = 1000;
      function insertAt( value, time ) {
        return setTimeout(function() {
          tree.insert( value );
        }, time );
      }

      insertAt( 2,     duration );
      insertAt( 3, 2 * duration );
      // insertAt( 4, 3 * duration );
      // insertAt( 5, 4 * duration );

      console.log( tree.toArray() );
      console.log( tree.get( 'root' ) );

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
