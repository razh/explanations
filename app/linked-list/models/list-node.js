define(
  [ 'backbone',
    'id' ],
  function( Backbone, Id ) {

    var ListNode = Backbone.Model.extend({
      defaults: function() {
        return {
          id: Id.nextUid(),
          data: null,
          next: null
        };
      }
    });
  }
);
