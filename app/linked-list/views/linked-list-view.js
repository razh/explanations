define(
  [ 'd3',
    'shared/views/struct-view',
    'linked-list/views/list-view-utils' ],
  function( d3, StructView, Utils ) {
    'use strict';

    var x            = Utils.x,
        y            = Utils.y,
        id           = Utils.id,
        data         = Utils.data,
        children     = Utils.children,
        translate    = Utils.translate,
        linkId       = Utils.linkId,
        duration     = Utils.duration * 4,
        sourceX      = Utils.sourceX,
        sourceY      = Utils.sourceY,
        targetX      = Utils.targetX,
        targetY      = Utils.targetY,
        midpointX    = Utils.midpointX,
        midpointY    = Utils.midpointY,
        // Constants.
        borderRadius = Utils.borderRadius,
        width        = Utils.width,
        height       = Utils.height;

    var LinkedListView = StructView.extend({
      initialize: function() {
        StructView.prototype.initialize.call( this );

        // d3 configuration.
        this.tree = d3.layout.tree()
          .children( children );
      },

      renderLinks: function( nodes ) {
        var link = this.vis.select( '#links' )
          .selectAll( '.link' )
          .data( this.tree.links( nodes ), linkId );
          console.log(this.tree.links( nodes ));

        link.enter()
          .append( 'g' )
          .append( 'line' )
          .attr( 'x1', sourceX )
          .attr( 'y1', sourceY )
          .attr( 'x2', sourceX )
          .attr( 'y2', sourceY )
          .style( 'stroke-opacity', 0 );

        link.transition()
          .duration( duration )
          .select( 'line' )
          .attr( 'x1', sourceX )
          .attr( 'y1', sourceY )
          .attr( 'x2', targetX )
          .attr( 'y2', targetY )
          .style( 'stroke-opacity', 1 );

        link.exit()
          .transition()
          .duration( duration )
          .select( 'line' )
          .attr( 'x1', 0 )
          .attr( 'y1', 0 )
          .attr( 'x2', 0 )
          .attr( 'y2', 0 )
          .style( 'stroke-opacity', 0 )
          .remove();
      },

      renderNodes: function( nodes ) {
        var node = this.vis.select( '#nodes' )
          .selectAll( '.node' )
          .data( nodes, id );

        // Enter.
        var nodeEnter = node.enter()
          .append( 'g' )
            .filter( id ) // Draw non-empty nodes.
              .attr( 'class', 'node' )
              .attr( 'transform', translate );

        nodeEnter.append( 'rect' )
          .attr( 'rx', borderRadius )
          .attr( 'ry', borderRadius )
          .attr( 'x', 0 )
          .attr( 'y', 0 )
          .attr( 'width', 0 )
          .attr( 'height', 0 );

        nodeEnter.append( 'text' )
          .text( data )
          .style( 'fill-opacity', 0 )
          // Center text.
          .style( 'text-anchor', 'middle' )
          .style( 'dominant-baseline', 'middle' );

        // Mouse over event.
        nodeEnter.on( 'mouseover', function() {
          d3.select( this )
              .classed( 'delete-overlay', true )
            .select( 'text' )
              .text( '—' );
        });

        nodeEnter.on( 'mouseout', function() {
          d3.select( this )
              .classed( 'delete-overlay', false )
            .select( 'text' )
              .text( data );
        });

        var that = this;
        nodeEnter.on( 'click', function( d ) {
          var node = that.model.searchBy( 'id', d.id );
          if ( node ) {
            that.model.delete( node );
            that.render();
          }
        });

        // Update.
        var nodeUpdate = node.transition()
          .duration( duration )
          .attr( 'transform', translate );

        nodeUpdate.select( 'rect' )
          .attr( 'x', -0.5 * width )
          .attr( 'y', -0.5 * height )
          .attr( 'width', width )
          .attr( 'height', height );

        nodeUpdate.select( 'text' )
          .text( data )
          .style( 'fill-opacity', 1 );

        // Exit.
        var nodeExit = node.exit()
          .transition()
          .duration( duration )
          .attr( 'transform', translate )
          .remove();

        nodeExit.select( 'rect' )
          .attr( 'x', 0 )
          .attr( 'y', 0 )
          .attr( 'width', 0 )
          .attr( 'height', 0 );

        nodeExit.select( 'text' )
          .style( 'fill-opacity', 0 );
      }
    });

    return LinkedListView;
  }
);
