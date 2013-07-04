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

      var node0 = new GraphNode({ data: 'A' }),
          node1 = new GraphNode({ data: 'B' }),
          node2 = new GraphNode({ data: 'C' }),
          node3 = new GraphNode({ data: 'D' }),
          node4 = new GraphNode({ data: 'E' }),
          node5 = new GraphNode({ data: 'F' }),
          node6 = new GraphNode({ data: 'G' }),
          node7 = new GraphNode({ data: 'H' });

      node0.to( node1, node3 );
      node1.to( node2, node3, node0, node1 );
      node2.to( node4, node5 );
      node3.to( node4 );

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

      setTimeout(function() {
        node1.to( node6 );
        node2.to( node6 );
        graph.add( node6 );
        graphView.render();
      }, 1000 );

      setTimeout(function() {
        node6.to( node7 );
        graph.add( node7 );
        graphView.render();
      }, 2000 );

      setTimeout(function() {
        graph.remove( graph.at(2) );
        graphView.render();
      }, 3000 )

      console.log( graph.nodes() );
      console.log( graph.links() );

      graphView = new GraphView({
        el: '#graph-view',
        collection: graph
      });

      graphView.render();
    }

    function destroy() {
      graph.reset();
      graphView.remove();
      el.empty();
    }

    return {
      initialize: initialize,
      destroy: destroy
    };
  }
);
