define(
  [ 'underscore',
    'backbone',
    'id' ],
  function( _, Backbone, Id ) {
    'use strict';

    /*
      Node in directed acyclic graph.
     */
    var GraphNode = Backbone.Model.extend({
      defaults: function() {
        return {
          id: Id.nextUid(),
          data: null,

          children: [],
          weight: 1
        };
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
        return {
          id: this.id,
          data: this.get( 'data' ),
          weight: this.get( 'weight' )
        };
      }
    });

    return GraphNode;
  }
);
