requirejs.config({
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: [ 'jquery', 'underscore' ],
      exports: 'Backbone'
    }
  },

  paths: {
    'backbone': '../../lib/backbone/backbone',
    'jquery': '../../lib/jquery/jquery-2.0.2',
    'underscore': '../../lib/underscore/underscore'
  }
});


define(
  [ 'jquery',
    'underscore',
    'backbone',
    'models/tree',
    'models/tree-node' ],
  function( $, _, Backbone, Tree, TreeNode ) {
    'use strict';

    var node = new TreeNode();
    var left = new TreeNode();
    var right = new TreeNode();

    node.set( 'left', left );
    node.set( 'right', right );

    // console.log( node );

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


    // console.log( tree );
  }
);
