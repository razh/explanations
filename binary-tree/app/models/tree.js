define(
  [ 'backbone',
    'models/tree-node' ],
  function( Backbone, TreeNode ) {

    var Tree = Backbone.Model.extend({
      defaults: function() {
        return {
          root: null
        };
      },

      insert: function( data ) {
        var current = this.get( 'root' ),
            parent = null;

        while ( current !== null ) {
          parent = current;
          if ( data < current.get( 'data' ) ) {
            current = current.get( 'left' );
          } else {
            current = current.get( 'right' );
          }
        }

        var newNode = new TreeNode({ data: data });
        newNode.set( 'parent', parent );

        if ( parent === null ) {
          this.set( 'root', newNode );
        } else if ( data < parent.get( 'data' ) ) {
          parent.set( 'left', newNode );
        } else {
          parent.set( 'right', newNode );
        }
      },

      delete: function( node ) {
        var left = node.get( 'left' ),
            right = node.get( 'right' );

        if ( left === null ) {
          node.transplant( this, right );
        } else if ( right === null ) {
          node.transplant( this, left );
        } else {
          // Get the successor node and move it in.
          var y = right.min();
          if ( y.get( 'parent' ) !== node ) {
            y.transplant( this, y.get( 'right' ) );
            y.set( 'right', right );
            right.set( 'parent', y );
          }

          node.transplant( this, y );
          y.set( 'left', left );
          left.set( 'parent', y );
        }
      },

      search: function( data ) {
        return this.get( 'root' ).search( data );
      },

      toArray: function( data ) {
        return this.get( 'root' ).toArray();
      },

      min: function() {
        return this.get( 'root' ).min();
      },

      max: function() {
        return this.get( 'root' ).max();
      }
    });

    return Tree;
  }
);
