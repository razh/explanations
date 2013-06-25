define(
  [ 'binary-tree/models/tree',
    'red-black-tree/models/rb-tree-node' ],
  function( Tree, RBTreeNode ) {
    'use strict';

    // Direction of rotations.
    var LEFT  = 0,
        RIGHT = 1;

    var RBTree = Tree.extend({
      defaults: function() {
        var defaults = Tree.prototype.defaults();
        defaults.nodeClass = RBTreeNode;
        return defaults;
      },

      insert: function( data ) {
        var newNode = Tree.prototype.insert.call( this, data );
        // TODO: Set children to nil?
        newNode.set( 'color', RBTreeNode.RED );
        this.insertFixup( newNode );
        return newNode;
      },

      insertFixup: function( node ) {
        var current = node,
            parent  = current.get( 'parent' ),
            grandParent, parentSibling;

        while ( parent && parent.get( 'color' ) === RBTreeNode.RED ) {
          grandParent = parent.get( 'parent' );

          if ( grandParent ) {
            if ( parent === grandParent.get( 'left' ) ) {
              parentSibling = grandParent.get( 'right' );

              if ( parentSibling.get( 'color' ) === RBTreeNode.RED ) {
                parent.set( 'color', RBTreeNode.BLACK );
                parentSibling.set( 'color', RBTreeNode.BLACK );
                grandParent.set( 'color', RBTreeNode.RED );
                current = grandParent;
              } else if ( current === parent.get( 'right' ) ) {
                current = parent;
                this.leftRotate( current );
              }

              parent.set( 'color', RBTreeNode.BLACK );
              grandParent.set( 'color', RBTreeNode.RED );
              this.rightRotate( grandParent );
            } else {

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

        var child      = node.get( left ),
            parent     = node.get( 'parent' ),
            grandChild = child.get( right );

        node.set( right, grandChild );

        if ( grandChild ) {
          grandChild.set( 'parent', node );
        }

        child.set( 'parent', parent );

        if ( !parent ) {
          this.set( 'root', child );
        } else if ( node === parent.get( right ) ) {
          parent.set( left, child );
        } else {
          parent.set( right, child );
        }

        child.set( left, node );
        node.set( 'parent', child );
      },

      delete: function( data ) {
        Tree.prototype.delete.call( this, data );
      }
    });

    return RBTree;
  }
);
