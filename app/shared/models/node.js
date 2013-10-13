/*globals define*/
define([
  'backbone',
  'id'
], function( Backbone, Id ) {
  'use strict';

  /*
    This may be called node.js, but it's not node.js.
   */
  var Node = Backbone.Model.extend({
    defaults: function() {
      return {
        id: Id.nextUid(),
        data: null
      };
    }
  });

  return Node;
});
