define(
  [ 'jquery',
    'graph/collections/graph',
    'graph/models/graph-node',
    'graph/views/graph-view' ],
  function( $, Graph, GraphNode, GraphView ) {
    'use strict';

    var graph, graphView, el;

    function initialize() {
      el = $( '#app' )
        .append( '<div id="graph-view"></div>');

      graph = new Graph();

      var node0 = new GraphNode(),
          node1 = new GraphNode(),
          node2 = new GraphNode(),
          node3 = new GraphNode(),
          node4 = new GraphNode(),
          node5 = new GraphNode();

      node0.to( node1, node3 );
      node1.to( node0, node2, node3 );
      node2.to( node1, node4, node5 );
      node3.to( node0, node1, node4 );
      node4.to( node2, node3 );
      node5.to( node2 );

      // Duplicate.
      node0.to( node1, node3 );

      graph.add([
        node0,
        node1,
        node2,
        node3,
        node4,
        node5
      ]);

      graphView = new GraphView({
        el: '#graph-view',
        collection: graph
      });

      graphView.render();
    }

    function destroy() {
      var graphNode = graph.first();

      while ( graphNode ) {
        graphNode.destroy();
        graphNode = graph.first();
      }

      graphView.remove();

      el.empty();
    }

    return {
      initialize: initialize,
      destroy: destroy
    };
  }
);
