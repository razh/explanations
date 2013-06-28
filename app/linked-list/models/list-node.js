define(
  [ 'backbone',
    'id' ],
  function( Backbone, Id ) {
    'use strict';

    var ListNode = Backbone.Model.extend({
      defaults: function() {
        return {
          id: Id.nextUid(),
          data: null,

          prev: null,
          next: null
        };
      },

      toJSON: function() {
        var prev = this.get( 'prev' ),
            next = this.get( 'next' );

        return {
          id: this.id,
          data: this.get( 'data' ),
          prev: prev ? prev.id : null,
          next: next ? next.toJSON() : null
        };
      }
    });

    return ListNode;
  }
);
