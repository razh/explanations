define(
  [ 'd3',
    'shared/views/struct-view',
    'graph/views/graph-view-utils' ],
  function( d3, StructView, Utils ) {
    'use strict';

    var x         = Utils.x,
        y         = Utils.y,
        id        = Utils.id,
        data      = Utils.data,
        linkId    = Utils.linkId,
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

        this.node = null;
        this.link = null;
      },

      render: function() {
        var collectionJSON = this.collection.toJSON();
        console.log( collectionJSON );

        // var nodes = this.force ? this.force.nodes( this.collection.nodes() ) : [],
        //     links = this.tree  ? this.tree.links(  this.collection.links() ) : [];
        var nodes = this.collection.nodes(),
            links = this.collection.links();

        this.force
          .nodes( nodes )
          .links( links )
          .start();

        console.log( 'nodes' );
        console.log( nodes );
        console.log( 'links' );
        console.log( links );

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

      renderLinks: function( links ) {
        this.link = this.vis.select( '#links' )
          .selectAll( '.link' )
          .data( links, linkId );

        this.link.enter()
          .append( 'line' )
            .style( 'stroke-opacity', 0 );

        this.link.transition()
          .duration( duration )
          .style( 'stroke-opacity', 1 );

        this.link.exit()
          .transition()
          .duration( duration )
          .style( 'stroke-opacity', 0 )
          .remove();
      },

      renderNodes: function( nodes ) {
        this.node = this.vis.select( '#nodes' )
          .selectAll( '.node' )
          .data( nodes, id );

        // Enter.
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

        // Update.
        var nodeUpdate = this.node.transition()
          .duration( duration );

        nodeUpdate.select( 'circle' )
          .attr( 'r', radius );

        nodeUpdate.select( 'text' )
          .text( data )
          .style( 'fill-opacity', 1 );

        // Exit any old nodes.
        this.node.exit().remove();
      }
    });

    return GraphView;
  }
);
