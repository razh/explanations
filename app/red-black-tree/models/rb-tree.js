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
            grandParent, parentSibling,
            direction, left, right;

        while ( parent && parent.get( 'color' ) === RBTreeNode.RED ) {
          grandParent = parent.get( 'parent' );

          if ( grandParent ) {
            direction = parent === grandParent.get( 'left' );
            left  = direction ? 'left'  : 'right';
            right = direction ? 'right' : 'left';

            if ( parent === grandParent.get( left ) ) {
              parentSibling = grandParent.get( right );

              if ( parentSibling ) {
                if ( parentSibling.get( 'color' ) === RBTreeNode.RED ) {
                  parent.set( 'color', RBTreeNode.BLACK );
                  parentSibling.set( 'color', RBTreeNode.BLACK );
                  grandParent.set( 'color', RBTreeNode.RED );
                  current = grandParent;
                } else if ( current === parent.get( right ) ) {
                  current = parent;

                  if ( direction ) {
                    this.leftRotate( current );
                  } else {
                    this.rightRotate( current );
                  }
                }
              }

              parent.set( 'color', RBTreeNode.BLACK );
              grandParent.set( 'color', RBTreeNode.RED );

              if ( direction ) {
                this.rightRotate( current );
              } else {
                this.leftRotate( current );
              }
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

        var child      = node.get( right ),
            parent     = node.get( 'parent' ),
            grandChild = child ? child.get( left ) : null;

        node.set( right, grandChild );

        if ( grandChild ) {
          grandChild.set( 'parent', node );
        }

        if ( child ) {
          child.set( 'parent', parent );
        }

        if ( !parent ) {
          this.set( 'root', child );
        } else if ( node === parent.get( right ) ) {
          parent.set( left, child );
        } else {
          parent.set( right, child );
        }

        if ( child ) {
          child.set( left, node );
        }
        node.set( 'parent', child );
      },

      delete: function( data ) {
        Tree.prototype.delete.call( this, data );
      }
    });

    return RBTree;
  }
);
