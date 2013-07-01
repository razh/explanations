define(
  [ 'shared/models/node' ],
  function( Node ) {
    'use strict';

    var ListNode = Node.extend({
      defaults: function() {
        var defaults = Node.prototype.defaults();
        defaults.prev = null;
        defaults.next = null;
        return defaults;
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
