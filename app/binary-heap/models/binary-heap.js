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
        var nodes = this.get( 'nodes' ),
            node  = nodes[1];

        return node ? node.toTree( nodes, 1 ) : {};
      },

      insert: function( data ) {
        var nodes = this.get( 'nodes' );
        var node = new BinaryHeapNode({
          data: Number.NEGATIVE_INFINITY
        });

        nodes.push( node );
        this.increaseKey( nodes.length - 1, data );

        this.trigger( 'change' );
        return node;
      },

      pop: function() {
        var nodes = this.get( 'nodes' );
        if ( nodes.length < 1 ) {
          return;
        }

        var max = nodes[1];
        nodes[1] = nodes[ nodes.length - 1 ];
        nodes.pop();
        this.maxHeapify(1);

        this.trigger( 'change' );
        return max;
      },

      top: function() {
        return this.get( 'nodes' )[1].get( 'data' );
      },

      maxHeapify: function( index ) {
        var nodes  = this.get( 'nodes' ),
            length = nodes.length - 1;

        var leftIndex  = this.left( index ),
            rightIndex = this.right( index );

        var largest;
        if ( leftIndex <= length &&
             nodes[ leftIndex ].get( 'data' ) > nodes[ index ].get( 'data' ) ) {
          largest = leftIndex;
        } else {
          largest = index;
        }

        if ( rightIndex <= length &&
             nodes[ rightIndex ].get( 'data' ) > nodes[ largest ].get( 'data' ) ) {
          largest = rightIndex;
        }

        if ( largest !== index ) {
          // Swap largest and this.
          var temp = nodes[ largest ];
          nodes[ largest ] = nodes[ index ];
          nodes[ index ] = temp;
          this.maxHeapify( largest );
        }
      },

      parent: function( index ) {
        return Math.floor( 0.5 * index );
      },

      left: function( index ) {
        return 2 * index;
      },

      right: function( index ) {
        return 2 * index + 1;
      },

      increaseKey: function( index, key ) {
        var nodes = this.get( 'nodes' ),
            node  = nodes[ index ];

        if ( !node || key < node.get( 'data' ) ) {
          return;
        }

        var parentIndex = this.parent( index ),
            temp;

        node.set( 'data', key );
        while ( index > 1 &&
                nodes[ parentIndex ].get( 'data' ) < nodes[ index ].get( 'data' ) ) {
          // Swap parent and this.
          temp = nodes[ index ];
          nodes[ index ] = nodes[ parentIndex ];
          nodes[ parentIndex ] = temp;

          // Move up the tree.
          index = parentIndex;
          parentIndex = this.parent( index );
        }
      }
    });

    return BinaryHeap;
  }
);
