define(
  [ 'backbone',
    'binary-heap/models/binary-heap-node' ],
  function( Backbone, BinaryHeapNode ) {
    'use strict';

    var BinaryHeap = Backbone.Model.extend({
      defaults: function() {
        return {
          nodes: [{}] // Initialize with empty object.
        };
      },

      /**
       * Converts the heap to a tree structure.
       * @return {Object} JSONified root node.
       */
      toJSON: function() {
        var nodes = this.get( 'nodes' );
        return nodes[1].toTree( nodes, 1 );
      },

      insert: function( data ) {
        this.get( 'nodes' ).push( new BinaryHeapNode( { data: data } ) );
      }
    });

    return BinaryHeap;
  }
);
