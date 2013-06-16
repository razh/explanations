define(
  [ 'underscore',
    'backbone',
    'd3' ],
  function( _, Backbone, d3 ) {
    'use strict';

    var TreeView = Backbone.View.extend({
      initialize: function() {
        _.bindAll( this, 'render' );
        this.listenTo( this.model, 'change', this.render );
      },

      render: function() {

      }
    });

    return TreeView;
  }
);
