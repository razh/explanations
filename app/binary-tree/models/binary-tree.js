/*globals define*/
define([
  'tree/models/tree',
  'binary-tree/models/binary-tree-node'
], function( Tree, BinaryTreeNode ) {
  'use strict';

  var BinaryTree = Tree.extend({
    /*
      Inserts the given data and returns the containing node.
     */
    insert: function( data ) {
      var current = this.get( 'root' ),
          parent  = null;

      while ( current !== null ) {
        parent = current;
        if ( data < current.get( 'data' ) ) {
          current = current.get( 'left' );
        } else {
          current = current.get( 'right' );
        }
      }

      var newNode = new BinaryTreeNode({ data: data });
      newNode.set( 'parent', parent );

      if ( parent === null ) {
        this.set( 'root', newNode );
      } else if ( data < parent.get( 'data' ) ) {
        parent.set( 'left', newNode );
      } else {
        parent.set( 'right', newNode );
      }

      this.trigger( 'change' );
      return newNode;
    },

    delete: function( node ) {
      if ( !node ) {
        return;
      }

      var left  = node.get( 'left' ),
          right = node.get( 'right' );

      if ( left === null ) {
        node.transplant( this, right );
      } else if ( right === null ) {
        node.transplant( this, left );
      } else {
        // Get the successor node and move it in.
        var next = right.min();
        if ( next.get( 'parent' ) !== node ) {
          next.transplant( this, next.get( 'right' ) );
          next.set( 'right', right );
          right.set( 'parent', next );
        }

        node.transplant( this, next );
        next.set( 'left', left );
        left.set( 'parent', next );
      }

      this.trigger( 'change' );
    },

    search: function( data ) {
      return this.rootFn( 'search', data );
    },

    searchBy: function( key, value ) {
      return this.rootFn( 'searchBy', key, value );
    },

    toArray: function() {
      return this.rootFn( 'toArray' ) || [];
    },

    toJSON: function() {
      return this.rootFn( 'toJSON' ) || {};
    },

    min: function() {
      return this.rootFn( 'min' );
    },

    max: function() {
      return this.rootFn( 'max' );
    },

    // Handles functions called on this tree's root.
    rootFn: function() {
      var args = [].slice.call( arguments ),
          fn   = args.shift();

      var root = this.get( 'root' );
      return root ? root[ fn ].apply( root, args ) : null;
    }
  });

  return BinaryTree;
});
