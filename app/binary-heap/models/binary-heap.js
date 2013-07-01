define(
  [ 'backbone' ],
  function( Backbone ) {
    'use strict';

    var BinaryHeap = Backbone.Model.extend({
      defaults: function() {
        return {
          nodes: []
        };
      },

      toJSON: function() {
        return this.get( 'nodes' );
      }
    });

    return BinaryHeap;
  }
);
