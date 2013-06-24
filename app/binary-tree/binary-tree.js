define(
  [ './models/tree',
    './models/tree-node',
    './views/input-view',
    './views/tree-view' ],
  function( Tree, TreeNode, InputView, TreeView ) {
    'use strict';

    var tree = new Tree();
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

    setTimeout( function() {
      console.log( 'added 87' );
      tree.insert( 87 );
      console.log( tree.toArray() );
      treeView.render();

      setTimeout( function() {
        tree.insert( 19 );
        tree.insert( 35 );
        treeView.render();
        console.log( tree.toArray() );
      }, 500 );
    }, 500 );

    var treeView = new TreeView({
      el: '#tree-view',
      model: tree
    });

    treeView.render();

    var inputView = new InputView({
      el: '#input-view',
      model: tree
    });

    inputView.render();
  }
);
