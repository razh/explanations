requirejs.config({
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: [ 'jquery', 'underscore' ],
      exports: 'Backbone'
    },
    'd3': {
      exports: 'd3'
    }
  },

  paths: {
    'backbone': '../../lib/backbone/backbone',
    'd3': '../../lib/d3/d3.v3',
    'jquery': '../../lib/jquery/jquery-2.0.2',
    'underscore': '../../lib/underscore/underscore'
  }
});


define(
  [ 'jquery',
    'underscore',
    'backbone',
    'models/tree',
    'models/tree-node',
    'views/tree-view' ],
  function( $, _, Backbone, Tree, TreeNode, TreeView ) {
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

    var treeView = new TreeView({
      el: '#tree-view',
      model: tree
    });

    treeView.render();
  }
);
