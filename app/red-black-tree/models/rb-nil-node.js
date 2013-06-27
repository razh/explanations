define(
  [ 'red-black-tree/models/rb-tree-node' ],
  function( RBTreeNode ) {
    'use strict';

    function nullFn() {
      return null;
    }

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

      searchBy: nullFn,
      min:      nullFn,
      max:      nullFn,

      toArray: function() {
        return [];
      },

      toJSON: function() {
        return {
          id: Math.random(),
          data: 'nil',
          color: RBTreeNode.BLACK
        };
      },
    });

    return Nil;
  }
);
