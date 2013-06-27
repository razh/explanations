define(
  [ 'binary-tree/models/tree-node' ],
  function( TreeNode ) {
    'use strict';

    var RED   = 0,
        BLACK = 1;

    var RBTreeNode = TreeNode.extend({
      defaults: function() {
        var defaults = TreeNode.prototype.defaults();
        defaults.color = RED;
        return defaults;
      },

      toJSON: function() {
        var jsonObject = TreeNode.prototype.toJSON.call( this );
        jsonObject.color = this.get( 'color' );
        return jsonObject;
      },

      search: function( data, nil ) {
        var current     = this,
            child       = current,
            currentData = current.get( 'data' );

        while ( child !== nil && data !== currentData ) {
          if ( data < currentData ) {
            child = current.get( 'left' );
          } else {
            child = current.get( 'right' );
          }

          if ( child !== nil ) {
            current = child;
            currentData = current.get( 'data' );
          }
        }

        return current;
      },

      min: function( nil ) {
        return this.minFn( nil );
      },

      max: function( nil ) {
        return this.maxFn( nil );
      },

      /*
        Like TreeNode's transplant, but with nil.
       */
      transplant: function( tree, node ) {
        var parent = this.get( 'parent' );

        if ( parent === tree.get( 'nil' ) ) {
          tree.set( 'root', node );
        } else if ( this === parent.get( 'left' ) ) {
          parent.set( 'left', node );
        } else {
          parent.set( 'right', node );
        }

        node.set( 'parent', parent );
      }
    });

    // Attach enum to exports.
    RBTreeNode.RED   = RED;
    RBTreeNode.BLACK = BLACK;

    return RBTreeNode;
  }
);
