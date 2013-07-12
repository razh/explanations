define(
  [ 'shared/models/node' ],
  function( Node ) {
    'use strict';

    var TreeNode = Node.extend({
      defaults: function() {
        var defaults = Node.prototype.defaults();
        defaults.parent   = null;
        defaults.children = [];
        return defaults;
      },

      insert: function( data ) {
        var newNode = new TreeNode({ data: data });

        this.get( 'children' ).push( newNode );
        newNode.set( 'parent', this );

        return newNode;
      }
    });

    return TreeNode;
  }
);
