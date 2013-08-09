define([
  'underscore',
  'shared/models/node'
], function( _, Node ) {
  'use strict';

  /*
    Node in directed acyclic graph.
   */
  var GraphNode = Node.extend({
    defaults: function() {
      var defaults = Node.prototype.defaults();
      defaults.children = [];
      defaults.weight   = 1;
      return defaults;
    },

    to: function() {
      // The children array is unique and sorted.
      var children = this.get( 'children' ),
          args     = Array.prototype.slice.call( arguments );

      var that = this;
      args.forEach(function( arg ) {
        // Check that we don't already have an edge coming in from that node.
        if ( arg.get( 'children' ).indexOf( that ) < 0 ) {
          children.push( arg );
        }
      });

      children.sort( function( a, b ) { return a.id - b.id; } );
      this.set( 'children', _.uniq( children, true ) );
    },

    toJSON: function() {
      var jsonObject = Node.prototype.toJSON.call( this );

      jsonObject.weight = this.get( 'weight' );
      jsonObject.children = this.get( 'children' ).map(function( child ) {
        return child.id;
      });

      return jsonObject;
    }
  });

  return GraphNode;
});
