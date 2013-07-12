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

      toJSON: function() {
        var jsonObject = Node.prototype.toJSON.call( this );

        jsonObject.children = this.get( 'children' ).map(function( child ) {
          return child.toJSON();
        });

        return jsonObject;
      }
    });

    return TreeNode;
  }
);
