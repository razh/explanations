define(
  [ 'd3',
    'shared/views/struct-view',
    'graph/views/graph-view-utils' ],
  function( d3, StructView, Utils ) {
    'use strict';

    var id        = Utils.id,
        data      = Utils.data,
        linkId    = Utils.linkId,
        translate = Utils.translate,
        diagonal  = Utils.diagonal,
        duration  = Utils.duration,
        radius    = Utils.radius;

    var GraphView = StructView.extend({
      initialize: function() {
        StructView.prototype.initialize.call( this );

        this.force = d3.layout.force();
        this.tree = d3.layout.tree();
      },

      render: function() {
        var collectionJSON = this.collection.toJSON();
        console.log( collectionJSON );

        var nodes = this.force ? this.force.nodes( collectionJSON ) : [],
            links = this.tree  ? this.tree.links( collectionJSON ) : [];

        console.log('nodes');
        console.log(nodes);
        console.log('links');
        console.log(links);

        this.renderLinks( links );
        this.renderNodes( nodes );

        return this;
      },

      renderLinks: function( links ) {
        var link = this.vis.select( '#links' )
          .selectAll( '.link' )
          .data( links, linkId );

        link.enter()
          .append( 'path' )
            .style( 'fill-opacity', 0 ) // Stop hidden paths from being rendered.
            // .filter( function( d ) { return d.target.id; } ) // Draw only paths that have an existing target.
              .attr( 'class', 'link' )
              // .attr( 'd', diagonal )
              .style( 'stroke-opacity', 0 );

        link.transition()
          .duration( duration )
          // .attr( 'd', diagonal )
          .style( 'stroke-opacity', 1 );

        link.exit()
          .transition()
          .duration( duration )
          // .attr( 'd', diagonal )
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

        nodeEnter.append( 'circle' )
          .attr( 'r', 0 );

        nodeEnter.append( 'text' )
          .text( data )
          .style( 'fill-opacity', 0 )
          // Center text.
          .style( 'text-anchor', 'middle' )
          .style( 'dominant-baseline', 'middle' );

        // Update.
        var nodeUpdate = node.transition()
          .duration( duration )
          .attr( 'transform', translate );

        nodeUpdate.select( 'circle' )
          .attr( 'r', radius );

        nodeUpdate.select( 'text' )
          .text( data )
          .style( 'fill-opacity', 1 );

      }
    });

    return GraphView;
  }
);
