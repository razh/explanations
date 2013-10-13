/*globals define*/
define([
  'jquery',
  'red-black-tree/models/rb-tree',
  'red-black-tree/views/rb-tree-view',
  'shared/views/input-view',
  'linked-list/views/list-view-utils'
], function( $, RBTree, RBTreeView, InputView, Utils ) {
  'use strict';

  var tree, treeView, inputView, el;

  function initialize() {
    el = $( '#app' )
      .append( '<div class="rb-tree padded" id="rb-tree"></div>' )
      .append( '<div class="input" id="input"></div>' );

    tree = new RBTree();
    tree.insert( 1 );

    var insertAt = Utils.insertAtFn( tree ),
        duration = 1000;

    insertAt( 2,     duration );
    insertAt( 3, 2 * duration );
    insertAt( 4, 3 * duration );
    insertAt( 5, 4 * duration );

    console.log( tree.toArray() );
    console.log( tree.get( 'root' ) );

    treeView = new RBTreeView({
      el: '#rb-tree',
      model: tree
    });

    console.log( treeView );
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
});
