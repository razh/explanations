/*globals define*/
define([
  'underscore',
  'backbone',
  'graph/models/graph-node'
], function( _, Backbone, GraphNode ) {
  'use strict';

  var Graph = Backbone.Collection.extend({
    model: GraphNode,

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
    },

    remove: function( node ) {
      // Remove all references to the node first.
      this.forEach(function( currNode ) {
        currNode.set( 'children',  _.without( currNode.get( 'children' ), node ) );
      });

      // Normal remove.
      return Backbone.Collection.prototype.remove.call( this, node );
    }
  });

  return Graph;
});
