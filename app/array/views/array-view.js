define(
  [ 'underscore',
    'backbone',
    'd3',
    'shared/views/d3-view',
    'linked-list/views/list-view-utils' ],
  function( _, Backbone, d3, D3View, Utils ) {
    'use strict';

    var id       = Utils.id,
        data     = Utils.data,
        duration = Utils.duration;

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
        this.node = this.vis.select( '#nodes' )
          .selectAll( '.node' )
          .data( this.nodes, id );

        this.nodeEnter();
        this.nodeUpdate();
        this.nodeExit();
      },

      nodeEnter: function() {
        var nodeEnter = this.node.enter()
          .append( 'td' )
            .attr( 'class', 'node' )
            .style( 'opacity', 0 );

        nodeEnter.append( 'text' )
          .text( data );
      },

      nodeUpdate: function() {
        // Reorder DOM elements.
        this.node.order();

        this.node.transition()
          .duration( duration )
          .style( 'opacity', 1 );
      },

      nodeExit: function() {
        this.node.exit()
          .remove();
      }
    });

    return ArrayView;
  }
);
