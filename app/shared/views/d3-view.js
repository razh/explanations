define(
  [ 'underscore',
    'backbone',
    'd3' ],
  function( _, Backbone, d3 ) {
    'use strict';

    var D3View = Backbone.View.extend({
      options: function() {
        return {
          // Default margins.
          margin: {
            top:    25,
            right:  25,
            bottom: 25,
            left:   25
          }
        };
      },

      initialize: function() {
        _.bindAll( this, 'render' );

        // Select d3 element.
        this.vis = d3.select( this.el );

        // Default view dimensions.
        this.width  = this.outerWidth  = 0;
        this.height = this.outerHeight = 0;

        // Scaling functions.
        this.x = this.y = null;
      },

      /**
       * Resizes the view to fit the viewport.
       */
      resize: function() {
        var margin = this.options.margin;

        this.outerWidth  = this.el ? this.el.clientWidth  : 0;
        this.outerHeight = this.el ? this.el.clientHeight : 0;

        this.width  = this.outerWidth  - margin.left - margin.right;
        this.height = this.outerHeight - margin.top  - margin.bottom;

        this.vis
          .attr( 'width', this.outerWidth )
          .attr( 'height', this.outerHeight );
      }
    });

    return D3View;
  }
);
