define(
  [ 'd3',
    'shared/views/struct-view',
    'graph/views/graph-view-utils' ],
  function( d3, StructView, Utils ) {
    'use strict';

    var x         = Utils.x,
        y         = Utils.y,
        data      = Utils.data,
        sourceX   = Utils.sourceX,
        sourceY   = Utils.sourceY,
        targetX   = Utils.targetX,
        targetY   = Utils.targetY,
        duration  = Utils.duration,
        radius    = Utils.radius;

    var GraphView = StructView.extend({
      initialize: function() {
        StructView.prototype.initialize.call( this );

        this.force = d3.layout.force()
          .charge( -150 )
          .linkDistance( 50 )
          .size( [ window.innerWidth, window.innerHeight ] );

        this.tree = d3.layout.tree();
      },

      render: function() {
        var nodes = this.collection.nodes(),
            links = this.collection.links();

        this.force
          .nodes( nodes )
          .links( links )
          .start();

        this.renderLinks( links );
        this.renderNodes( nodes );

        var that = this;
        this.force.on( 'tick', function() {
          that.link
            .attr( 'x1', sourceX )
            .attr( 'y1', sourceY )
            .attr( 'x2', targetX )
            .attr( 'y2', targetY );

          that.node.select( 'circle' )
            .attr( 'cx', x )
            .attr( 'cy', y );

          that.node.select( 'text' )
            .attr( 'x', x )
            .attr( 'y', y );
        });

        return this;
      },

      linkEnter: function() {
        this.link.enter()
          .append( 'line' )
            .style( 'stroke-opacity', 0 );
      },

      linkUpdate: function() {
        this.link.transition()
          .duration( duration )
          .style( 'stroke-opacity', 1 );
      },

      linkExit: function() {
        this.link.exit()
          .transition()
          .duration( duration )
          .style( 'stroke-opacity', 0 )
          .remove();
      },

      nodeEnter: function() {
        var nodeEnter = this.node.enter()
          .append( 'g' )
          .attr( 'class', 'node' )
          .call( this.force.drag );

        nodeEnter.append( 'circle' )
          .attr( 'r', 0 );

        nodeEnter.append( 'text' )
          .text( data )
          .style( 'fill-opacity', 0 )
          // Center text.
          .style( 'text-anchor', 'middle' )
          .style( 'dominant-baseline', 'middle' );
      },

      nodeUpdate: function() {
        var nodeUpdate = this.node.transition()
          .duration( duration );

        nodeUpdate.select( 'circle' )
          .attr( 'r', radius );

        nodeUpdate.select( 'text' )
          .text( data )
          .style( 'fill-opacity', 1 );
      },

      nodeExit: function() {
        this.node.exit().remove();
      }
    });

    return GraphView;
  }
);
