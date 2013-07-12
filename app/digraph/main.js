define(
  [ 'jquery',
    'graph/collections/graph',
    'graph/models/graph-node',
    'digraph/views/digraph-view' ],
  function( $, Graph, GraphNode, DigraphView ) {
    'use strict';

    var graph, digraphView, el;

    function initialize() {
      el = $( '#app' )
        .append( '<div class="digraph full" id="digraph"></div>' );

      graph = new Graph();

      var node0 = new GraphNode({ data: 'A' }),
          node1 = new GraphNode({ data: 'B' }),
          node2 = new GraphNode({ data: 'C' }),
          node3 = new GraphNode({ data: 'D' }),
          node4 = new GraphNode({ data: 'E' }),
          node5 = new GraphNode({ data: 'F' });

      node0.to( node4, node5 );
      node1.to( node2, node3 );
      node2.to( node4, node5 );
      node3.to( node4 );

      digraphView = new DigraphView({
        el: '#digraph',
        collection: graph
      });

      graph.add([
        node0,
        node1,
        node2,
        node3,
        node4,
        node5
      ]);
    }

    function destroy() {
      graph.reset();
      digraphView.remove();
      el.empty();
    }

    return {
      initialize: initialize,
      destroy: destroy
    };
  }
);
