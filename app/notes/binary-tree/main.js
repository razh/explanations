define(function( require ) {
  'use strict';

  var Template  = require( 'shared/template' ),
      Tree      = require( 'binary-tree/models/tree' ),
      TreeView  = require( 'binary-tree/views/tree-view' ),
      List      = require( 'linked-list/models/linked-list' ),
      ListView  = require( 'linked-list/views/linked-list-view' ),
      Graph     = require( 'graph/collections/graph' ),
      GraphNode = require( 'graph/models/graph-node' ),
      GraphView = require( 'graph/views/graph-view' );

  var tree, treeView,
      list, listView,
      graph, graphView;

  function initialize( args ) {
    Template.onLoad(function() {
      tree = new Tree();
      tree.insert( 5 );

      treeView = new TreeView({
        el: '#tree-00',
        model: tree
      });

      var duration = 1000;
      function insertAt( value, time ) {
        return setTimeout(function() {
          tree.insert( value );
        }, time );
      }

      insertAt( 1,      duration );
      insertAt( 10, 2 * duration );
      insertAt( 11, 3 * duration );
      insertAt( 12, 4 * duration );

      treeView.render();

      // Graph test.
      graph = new Graph();

      var node0 = new GraphNode({ data: 'A' }),
          node1 = new GraphNode({ data: 'B' }),
          node2 = new GraphNode({ data: 'C' });

      node0.to( node1, node2 );
      node1.to( node2 );

      graphView = new GraphView({
        el: '#graph-00',
        collection: graph
      });

      graph.add([
        node0,
        node1,
        node2
      ]);

      // List test.
      list = new List();
      list.insert( 2 );
      list.insert( 10 );
      list.insert( 15 );

      listView = new ListView({
        el: '#list-00',
        model: list
      });

      listView.render();
    });

    Template.initialize.apply( null, args );
  }

  function destroy() {
    tree.destroy();
    treeView.remove();

    graph.reset();
    graphView.remove();

    Template.destroy();
  }

  return {
    initialize: initialize,
    destroy: destroy
  };
});
