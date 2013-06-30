define(
  [ 'backbone',
    'graph/models/graph-node' ],
  function( Backbone, GraphNode ) {
    'use strict';

    var Graph = Backbone.Collection.extend({
      model: GraphNode,

      nodes: function() {
        return this.map(function( node ) {
          return node.toJSON();
        });
      },

      links: function() {
        var that  = this,
            links = [];

        this.each(function( node, nodeIndex ) {
          links = links.concat(node.get( 'children' ).map(function( child ) {
            return {
              source: nodeIndex,
              target: that.indexOf( child ),
              weight: 1
            };
          }));
        });

        return links;
      }
    });

    return Graph;
  }
);
