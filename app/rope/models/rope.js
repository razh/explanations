/*globals define*/
define([
  'backbone'
], function( Backbone ) {
  'use strict';

  var Rope = Backbone.Model.extend({
    defaults: function() {
      return {
        root: null
      };
    }
  });

  return Rope;
});
