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
          children: []
        };
      },

      to: function() {
        // The children array is unique and sorted.
        var children = this.get( 'children' ),
            args     = Array.prototype.slice.call( arguments );

        args.forEach(function( arg ) {
          children.push( arg );
        });

        children.sort( function( a, b ) { return a.id - b.id; } );
        this.set( 'children', _.uniq( children, true ) );
      }
    });

    return GraphNode;
  }
);
