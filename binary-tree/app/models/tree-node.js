define(
  [ 'backbone' ],
  function( Backbone ) {
    'use strict';

    // Global unique id.
    var uid = 0;

    function nextUid() {
      var currUid = uid;
      uid++;
      return currUid;
    }

    var TreeNode = Backbone.Model.extend({
      defaults: function() {
        return {
          id: nextUid(),
          data: null,

          parent: null,
          left: null,
          right: null
        };
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

      toArray: function() {
        var left  = this.get( 'left' ),
            right = this.get( 'right' );

        var leftArray  = left  !== null ? left.toArray()  : [],
            rightArray = right !== null ? right.toArray() : [];

        return leftArray.concat( [ this.get( 'data' ) ], rightArray );
      },

      toJSON: function() {
        var left  = this.get( 'left' ),
            right = this.get( 'right' );

        return {
          id: this.get( 'id' ),
          data: this.get( 'data' ),
          left:  left  ? left.toJSON()  : null,
          right: right ? right.toJSON() : null
        };
      },

      /**
       * Returns the minimum value in the subtree that is rooted by this node.
       */
      min: function() {
        var min  = this,
            left = min.get( 'left' );

        while ( left !== null ) {
          min = left;
          left = left.get( 'left' );
        }

        return min;
      },

      max: function() {
        var max   = this,
            right = max.get( 'right' );

        while ( right !== null ) {
          max = right;
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
        } else{
          parent.set( 'right', node );
        }

        if ( node !== null ) {
          node.set( 'parent', parent );
        }
      }

    });

    return TreeNode;
  }
);
