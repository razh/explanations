define(
  [ '../../../binary-tree/app/models/tree',
    './rb-tree-node' ],
  function( Tree, RBTreeNode ) {
    'use strict';

    var RBTree = Tree.extend({
      defaults: function() {
        var defaults = Tree.prototype.defaults();
        defaults.nodeClass = RBTreeNode;
        return defaults;
      },

      insert: function( data ) {
        var newNode = Tree.prototype.insert.call( this, data );
        this.insertFixup( newNode );
        return newNode;
      },

      insertFixup: function( node ) {
        var current = node,
            parent, grandParent, parentSibling;

        while ( current.get( 'parent' ).get( 'color' ) === RBTreeNode.RED ) {
          parent = current.get( 'parent' );
          if ( parent ) {
            grandParent = parent.get( 'parent' );
          }

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

            } else {

            }
          }
        }

        this.get( 'root' ).set( 'color', RBTreeNode.BLACK );
      },

      delete: function( data ) {
        Tree.prototype.delete.call( this, data );
      }
    });

    return RBTree;
  }
);
