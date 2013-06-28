define(
  [ 'underscore',
    'd3',
    'shared/views/struct-view',
    'binary-tree/views/tree-view-utils' ],
  function( _, d3, StructView, Utils ) {
    'use strict';

    // Load utility functions/variables.
    var id                = Utils.id,
        data              = Utils.data,
        children          = Utils.children,
        translate         = Utils.translate,
        translateToParent = Utils.translateToParent,
        linkId            = Utils.linkId,
        diagonal          = Utils.diagonal,
        duration          = Utils.duration,
        radius            = Utils.radius;

    var TreeView = StructView.extend({
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

        link.enter()
          .append( 'path' )
            .style( 'fill-opacity', 0 ) // Stop hidden paths from being rendered.
            .filter( function( d ) { return d.target.id; } ) // Draw only paths that have an existing target.
              .attr( 'class', 'link' )
              .attr( 'd', diagonal )
              .style( 'stroke-opacity', 0 );

        link.transition()
          .duration( duration )
          .attr( 'd', diagonal )
          .style( 'stroke-opacity', 1 );

        link.exit()
          .transition()
          .duration( duration )
          .attr( 'd', diagonal )
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
              .attr( 'transform', translateToParent );

        nodeEnter.append( 'circle' )
          .attr( 'r', 0 );

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

        nodeUpdate.select( 'circle' )
          .attr( 'r', radius );

        nodeUpdate.select( 'text' )
          .text( data )
          .style( 'fill-opacity', 1 );

        // Exit.
        var nodeExit = node.exit()
          .transition()
          .duration( duration )
          .attr( 'transform', translate )
          .remove();

        nodeExit.select( 'circle' )
          .attr( 'r', 0 );

        nodeExit.select( 'text' )
          .style( 'fill-opacity', 0 );
      }
    });

    return TreeView;
  }
);
