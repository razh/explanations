define([
  'binary-tree/models/binary-tree',
  'red-black-tree/models/rb-tree-node',
  'red-black-tree/models/rb-nil-node'
], function( BinaryTree, RBTreeNode, Nil ) {
  'use strict';

  // Direction of rotations.
  var LEFT  = 0,
      RIGHT = 1;

  var RBTree = BinaryTree.extend({
    defaults: function() {
      var defaults = BinaryTree.prototype.defaults();
      defaults.nil = new Nil();
      defaults.root = defaults.nil;
      return defaults;
    },

    insert: function( data ) {
      var current = this.get( 'root' ),
          nil     = this.get( 'nil' ),
          parent  = nil;

      while ( current !== nil ) {
        parent = current;
        if ( data < current.get( 'data' ) ) {
          current = current.get( 'left' );
        } else {
          current = current.get( 'right' );
        }
      }

      var newNode = new RBTreeNode({ data: data });
      newNode.set( 'parent', parent );

      if ( parent === nil ) {
        this.set( 'root', newNode );
      } else if ( data < parent.get( 'data' ) ) {
        parent.set( 'left', newNode );
      } else  {
        parent.set( 'right', newNode );
      }

      newNode.set( 'left', nil );
      newNode.set( 'right', nil );
      newNode.set( 'color', RBTreeNode.RED );
      this.insertFixup( newNode );

      this.trigger( 'change' );
      return newNode;
    },

    insertFixup: function( node ) {
      var current = node,
          parent  = current.get( 'parent' ),
          grandParent, parentSibling,
          direction, left, right;

      while ( parent.get( 'color' ) === RBTreeNode.RED ) {
        grandParent = parent.get( 'parent' );

        if ( grandParent ) {
          direction = parent === grandParent.get( 'left' );
          left  = direction ? 'left'  : 'right';
          right = direction ? 'right' : 'left';

          parentSibling = grandParent.get( right );

          if ( parentSibling.get( 'color' ) === RBTreeNode.RED ) {
            parent.set( 'color', RBTreeNode.BLACK );
            parentSibling.set( 'color', RBTreeNode.BLACK );
            grandParent.set( 'color', RBTreeNode.RED );
            current = grandParent;
          } else if ( current === parent.get( right ) ) {
            current = parent;
            this.rotate( current, direction ? LEFT : RIGHT );
          } else {
            // node is a left child.
            parent.set( 'color', RBTreeNode.BLACK );
            grandParent.set( 'color', RBTreeNode.RED );
            this.rotate( grandParent, direction ? RIGHT : LEFT );
          }
        }

        parent = current.get( 'parent' );
      }

      this.get( 'root' ).set( 'color', RBTreeNode.BLACK );
    },

    leftRotate: function( node ) {
      this.rotate( node, LEFT );
    },

    rightRotate: function( node ) {
      this.rotate( node, RIGHT );
    },

    rotate: function( node, direction ) {
      var left  = direction === LEFT  ? 'left' : 'right',
          right = direction === RIGHT ? 'left' : 'right';

      var nil        = this.get( 'nil' ),
          child      = node.get( right ),
          parent     = node.get( 'parent' ),
          grandChild = child.get( left );

      node.set( right, grandChild );

      if ( grandChild !== nil ) {
        grandChild.set( 'parent', node );
      }

      if ( child ) {
        child.set( 'parent', parent );
      }

      if ( parent === nil ) {
        this.set( 'root', child );
      } else if ( node === parent.get( left ) ) {
        parent.set( left, child );
      } else {
        parent.set( right, child );
      }

      child.set( left, node );
      node.set( 'parent', child );
    },

    delete: function( node ) {
      var nil = this.get( 'nil' );

      if ( !node || node === nil ) {
        return;
      }

      var current       = node,
          originalColor = current.get( 'color' ),
          sibling;

      var left  = node.get( 'left' ),
          right = node.get( 'right' );

      if ( left === nil ) {
        sibling = right;
        node.transplant( this, right );
      } else if ( right === nil ) {
        sibling = left;
        node.transplant( this, left );
      } else {
        current = right.min( nil );
        originalColor = current.get( 'color' );
        sibling = current.get( 'right' );

        if ( current.get( 'parent' ) === node ) {
          sibling.set( 'parent', current );
        } else {
          current.transplant( this, current.get( 'right' ) );
          current.set( 'right', right );
          right.set( 'parent', current );
        }

        node.transplant( this, current );
        current.set( 'left', left );
        left.set( 'parent', current );
        current.set( 'color', node.get( 'color' ) );
      }

      if ( originalColor === RBTreeNode.BLACK ) {
        this.deleteFixup( sibling );
      }

      this.trigger( 'change' );
    },

    deleteFixup: function( node ) {
      var current = node,
          root    = this.get( 'root' ),
          parent  = current.get( 'parent' ),
          sibling, siblingLeft, siblingRight,
          direction, left, right;

      while ( current !== root && current.get( 'color' ) === RBTreeNode.BLACK ) {
        direction = current === parent.get( 'left' );
        left  = direction ? 'left'  : 'right';
        right = direction ? 'right' : 'left';

        sibling = parent.get( right );

        if ( sibling.get( 'color' ) === RBTreeNode.RED ) {
        // Case 1.
          sibling.set( 'color', RBTreeNode.BLACK );
          parent.set( 'color', RBTreeNode.RED );
          this.rotate( parent, direction ? LEFT : RIGHT );
          sibling = parent.get( right );
        }

        siblingLeft  = sibling.get( left );
        siblingRight = sibling.get( right );

        if ( siblingLeft.get( 'color' )  === RBTreeNode.BLACK &&
             siblingRight.get( 'color' ) === RBTreeNode.BLACK ) {
          // Case 2.
          sibling.set( 'color', RBTreeNode.RED );
          current = parent;
        } else if ( siblingRight.get( 'color' ) === RBTreeNode.BLACK ) {
          // Case 3.
          siblingLeft.set( 'color', RBTreeNode.BLACK );
          sibling.set( 'color', RBTreeNode.RED );
          this.rotate( sibling, direction ? RIGHT : LEFT );
          sibling = parent.get( right );
        } else {
          // Case 4.
          sibling.set( 'color', parent.get( 'color' ) );
          parent.set( 'color', RBTreeNode.BLACK );
          siblingRight.set( 'color', RBTreeNode.BLACK );
          this.rotate( parent, direction ? LEFT : RIGHT );
          current = root;
        }

        parent = current.get( 'parent' );
      }

      current.set( 'color', RBTreeNode.BLACK );
    },

    search: function( data ) {
      return this.rootFn( 'search', data, this.get( 'nil' ) );
    }
  });

  return RBTree;
});
