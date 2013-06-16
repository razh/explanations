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

        // Select d3 element.
        this.vis = d3.select( this.el );

        // d3 configuration.
      },

      render: function() {

      }
    });

    return TreeView;
  }
);
