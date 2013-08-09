define([
  'backbone'
], function( Backbone ) {
  'use strict';

  var Tree = Backbone.Model.extend({
    defaults: function() {
      return {
        root: null,
      };
    },

    toJSON: function() {
      var root = this.get( 'root' );
      return root ? root.toJSON() : {};
    }
  });

  return Tree;
});
