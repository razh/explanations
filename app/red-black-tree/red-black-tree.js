define(
  [ './models/rb-tree',
    './views/rb-tree-view',
    './../binary-tree/app/views/input-view' ],
  function( RBTree, RBTreeView, InputView ) {
    'use strict';

    var tree = new RBTree();
    tree.insert( 59 );
    tree.insert( 6 );
    tree.delete( tree.search( 59 ));
    console.log( tree.toArray() );

    var treeView = new RBTreeView({
      el: '#rb-tree-view',
      model: tree
    });

    console.log( treeView );
    treeView.render();

    var inputView = new InputView({
      el: '#input-view',
      model: tree
    });

    inputView.render();
  }
);
