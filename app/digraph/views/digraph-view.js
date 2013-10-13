define([
  'graph/views/graph-view',
  'graph/views/graph-view-utils'
], function( GraphView, Utils ) {
  'use strict';

  var DigraphView = GraphView.extend({
    initialize: function( options ) {
      GraphView.prototype.initialize.call( this, options );

      this.vis.append( 'defs' )
        .append( 'marker' )
          .attr( 'id', 'arrow' )
          .attr( 'viewBox', '0 -5 10 10' )
           // 10 is the length of the arrow.
          .attr( 'refX', Utils.radius + 10 )
          .attr( 'refY', 0 )
          .attr( 'markerWidth', 5 )
          .attr( 'markerHeight', 5 )
          .attr( 'orient', 'auto' )
          .append( 'path' )
            .attr( 'd', 'M 0,-5 L 10,0 L0,5' );
    },

    linkEnter: function() {
      var linkEnter = GraphView.prototype.linkEnter.call( this );
      linkEnter.attr( 'marker-end', 'url(#arrow)' );
      return linkEnter;
    }
  });

  return DigraphView;
});
