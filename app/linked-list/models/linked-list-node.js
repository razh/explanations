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
        var jsonObject = Node.prototype.toJSON.call( this );

        var prev = this.get( 'prev' ),
            next = this.get( 'next' );

        jsonObject.prev = prev ? prev.id       : null;
        jsonObject.next = next ? next.toJSON() : null;

        return jsonObject;
      }
    });

    return ListNode;
  }
);
