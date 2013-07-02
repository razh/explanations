define(
  [ 'shared/models/node' ],
  function( Node ) {
    'use strict';

    var TreeNode = Node.extend({
      defaults: function() {
        var defaults = Node.prototype.defaults();
        defaults.parent = null;
        defaults.left   = null;
        defaults.right  = null;
        return defaults;
      },

      search: function( data ) {
        var current     = this,
            currentData = current.get( 'data' );

        while ( current && data !== currentData ) {
          if ( data < currentData ) {
            current = current.get( 'left' );
          } else {
            current = current.get( 'right' );
          }

          if ( current ) {
            currentData = current.get( 'data' );
          }
        }

        return current;
      },

      // Do an in-order traversal to find node with given key/value.
      searchBy: function( key, value ) {
        var left  = this.get( 'left' ),
            right = this.get( 'right' );

        var node;
        if ( left ) {
          node = left.searchBy( key, value );
          if ( node ) { return node; }
        }

        if ( value === this.get( key ) ) {
          return this;
        }

        if ( right ) {
          node = right.searchBy( key, value );
          if ( node ) { return node; }
        }

        return null;
      },

      toArray: function() {
        var left  = this.get( 'left' ),
            right = this.get( 'right' );

        var leftArray  = left  ? left.toArray()  : [],
            rightArray = right ? right.toArray() : [];

        return leftArray.concat( [ this.get( 'data' ) ], rightArray );
      },

      toJSON: function() {
        var left  = this.get( 'left' ),
            right = this.get( 'right' );

        return {
          id: this.id,
          data: this.get( 'data' ),
          left:  left  ? left.toJSON()  : null,
          right: right ? right.toJSON() : null
        };
      },

      /**
       * Returns the minimum value in the subtree that is rooted by this node.
       */
      min: function() {
        return this.minFn( null );
      },

      max: function() {
        return this.maxFn( null );
      },

      minFn: function( end ) {
        var min  = this,
            left = min.get( 'left' );

        while ( left !== end ) {
          min  = left;
          left = left.get( 'left' );
        }

        return min;
      },

      maxFn: function( end ) {
        var max   = this,
            right = max.get( 'right' );

        while ( right !== end ) {
          max   = right;
          right = right.get( 'right' );
        }

        return max;
      },

      /**
       * Transplants/swaps the subtree rooted by this node with the subtree
       * rooted by the given node.
       */
      transplant: function( tree, node ) {
        var parent = this.get( 'parent' );

        if ( !parent ) {
          tree.set( 'root', node );
        } else if ( this === parent.get( 'left' ) ) {
          parent.set( 'left', node );
        } else {
          parent.set( 'right', node );
        }

        if ( node ) {
          node.set( 'parent', parent );
        }
      }

    });

    return TreeNode;
  }
);
