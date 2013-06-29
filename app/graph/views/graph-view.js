define(
  [ 'd3',
    'shared/views/struct-view',
    'graph/views/graph-view-utils' ],
  function( d3, StructView, Utils ) {
    'use strict';

    var linkId = Utils.linkId;

    var GraphView = StructView.extend({
      initialize: function() {
        StructView.prototype.initialize.call( this );

        this.force = d3.layout.force()
          .children();
      },

      render: function() {
        var nodes = this.force ? this.forces.nodes( this.collection.toJSON() ) : [];

        this.renderLinks( nodes );
        this.renderNodes( nodes );

        return this;
      },

      renderLinks: function( nodes ) {
        var link = this.vis.select( '#links' )
          .selectAll( '.link' )
          .data( this.force.links( nodes ), linkId );
      },

      renderNodes: function( nodes ) {

      }
    });

    return GraphView;
  }
);
