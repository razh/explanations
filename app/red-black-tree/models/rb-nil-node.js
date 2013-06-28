define(
  [ 'red-black-tree/models/rb-tree-node' ],
  function( RBTreeNode ) {
    'use strict';

    var Nil = RBTreeNode.extend({
      defaults: function() {
        // Set default color to black.
        var defaults = RBTreeNode.prototype.defaults();
        defaults.color = RBTreeNode.BLACK;
        return defaults;
      },

      initialize: function() {
        RBTreeNode.prototype.initialize.call( this );
        this.set( 'left', this );
        this.set( 'right', this );
        this.set( 'parent', this );
      },

      searchBy: function() {
        return null;
      },

      toArray: function() {
        return [];
      },

      toJSON: function() {
        return {};
      },
    });

    return Nil;
  }
);
