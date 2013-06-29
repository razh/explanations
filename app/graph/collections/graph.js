define(
  [ 'backbone',
    'graph/models/graph-node' ],
  function( Backbone, GraphNode ) {
    'use strict';

    var Graph = Backbone.Collection.extend({
      model: GraphNode
    });

    return Graph;
  }
);
