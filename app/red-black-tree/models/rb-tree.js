define(
  [ 'binary-tree/models/tree',
    'red-black-tree/models/rb-tree-node',
    'red-black-tree/models/rb-nil-node' ],
  function( Tree, RBTreeNode, Nil ) {
    'use strict';

    // Direction of rotations.
    var LEFT  = 0,
        RIGHT = 1;

    var RBTree = Tree.extend({
      defaults: function() {
        var defaults = Tree.prototype.defaults();
        defaults.nodeClass = RBTreeNode;
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

        var Node    = this.get( 'nodeClass' ),
            newNode = new Node({ data: data });

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

        console.log( 'data: ' + this.get( 'root' ).get( 'data' ) + ', color: ' +  ( ( this.get( 'root' ).get( 'color' ) === RBTreeNode.BLACK ) ? 'black' : 'red' ) );
        return newNode;
      },

      insertFixup: function( node ) {
        console.log('fixup')
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

            parentSibling = grandParent.get( right );

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
            } else {
              // node is a left child.
              parent.set( 'color', RBTreeNode.BLACK );
              grandParent.set( 'color', RBTreeNode.RED );

              if ( direction ) {
                this.rightRotate( grandParent );
              } else {
                this.leftRotate( grandParent );
              }
            }
          }

          parent = current.get( 'parent' );
        }

        this.get( 'root' ).set( 'color', RBTreeNode.BLACK );
      },

      leftRotate: function( node ) {
        console.log( 'leftRotate' );
        this.rotate( node, LEFT );
      },

      rightRotate: function( node ) {
        console.log( 'rightRotate' );
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

      delete: function( data ) {
        Tree.prototype.delete.call( this, data );
      },

      deleteFixup: function( node ) {
        var root   = this.get( 'right' ),
            parent = node.get( 'parent' ),
            sibling;

        while ( node !== root && node.get( 'color' ) === RBTreeNode.BLACK ) {
          if ( node === parent.get( 'left' ) ) {
            sibling = parent.get( 'right' );
          }
        }
      }
    });

    return RBTree;
  }
);
