define(
  [ 'backbone' ],
  function( Backbone ) {
    'use strict';

    var Tree = Backbone.Model.extend({
      defaults: function() {
        return {
          root: null,
        };
      }
    });

    return Tree;
  }
);
