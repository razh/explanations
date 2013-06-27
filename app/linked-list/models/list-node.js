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
      }
    });

    return ListNode;
  }
);
