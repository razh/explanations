define([
  'shared/models/node'
], function( Node ) {
  'use strict';

  var TreeNode = Node.extend({
    defaults: function() {
      var defaults = Node.prototype.defaults();
      defaults.parent   = null;
      defaults.children = [];
      return defaults;
    },

    /**
     * Adds all of the arguments as children of this node.
     * Like this.get( 'children' ).push( args ), but we also set the
     * child's parent.
     */
    children: function() {
      var args = Array.prototype.slice.call( arguments );

      var that     = this,
          children = this.get( 'children' );

      args.forEach(function( arg ) {
        children.push( arg );
        arg.set( 'parent', that );
      });
    },

    toJSON: function() {
      var jsonObject = Node.prototype.toJSON.call( this );

      jsonObject.children = this.get( 'children' ).map(function( child ) {
        return child.toJSON();
      });

      return jsonObject;
    }
  });

  return TreeNode;
});
