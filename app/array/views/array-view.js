define(
  [ 'underscore',
    'backbone',
    'd3',
    'shared/views/d3-view',
    'shared/views/svg-view',
    'linked-list/views/list-view-utils' ],
  function( _, Backbone, d3, D3View, SVGView, Utils ) {
    'use strict';

    var data     = Utils.data,
        duration = 0.5 * Utils.duration;

    var light = 'white',
        dark  = '#555';

    var ArrayView = D3View.extend({
      initialize: function() {
        D3View.prototype.initialize.call( this );
        this.listenTo( this.model, 'change', this.render );

        this.vis = this.vis.append( 'table' );
        this.vis.append( 'tr' ).attr( 'id', 'nodes' );

        this.nodes = [];
        this.node  = null;

        this.resize();
      },

      resize: function() {
        D3View.prototype.resize.call( this );
      },

      render: function() {
        this.nodes = this.model.toArray();
        this.renderNodes();
        return this;
      },

      renderNodes: function() {
        SVGView.prototype.renderNodes.call( this );
      },

      nodeEnter: function() {
        var nodeEnter = this.node.enter()
          .append( 'td' )
            .attr( 'class', 'node' )
              .style( 'background-color', dark );

        nodeEnter.append( 'text' )
          .text( data )
            .style( 'color', light );
      },

      nodeUpdate: function() {
        // Reorder DOM elements.
        this.node.order();

        var nodeUpdate = this.node.transition()
          .duration( duration );

        nodeUpdate.style( 'background-color', light );

        nodeUpdate.select( 'text' )
          .style( 'color', dark );
      },

      nodeExit: function() {
        this.node.exit()
          .remove();
      }
    });

    return ArrayView;
  }
);
