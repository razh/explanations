define(
  [ 'd3',
    'shared/views/svg-view',
    'graph/views/graph-view-utils' ],
  function( d3, SVGView, Utils ) {
    'use strict';

    var x        = Utils.x,
        y        = Utils.y,
        data     = Utils.data,

        sourceX  = Utils.sourceX,
        sourceY  = Utils.sourceY,
        targetX  = Utils.targetX,
        targetY  = Utils.targetY,

        duration = Utils.duration,
        radius   = Utils.radius;

    var GraphView = SVGView.extend({
      initialize: function() {
        SVGView.prototype.initialize.call( this );
        this.listenTo( this.collection, 'change add remove', this.render );

        this.force = d3.layout.force()
          .charge( -150 )
          .linkDistance( 75 )
          .size( [ this.width, this.height ] );

        this.tree = d3.layout.tree();

        // The graph view takes up the whole space.
        this.options.margin = {
          top:    0,
          right:  0,
          bottom: 0,
          left:   0
        };

        this.resize();
      },

      resize: function() {
        SVGView.prototype.resize.call( this );

        this.force.size( [ this.width, this.height ] );
      },

      getNodes: function() {
        return this.collection ? this.collection.toJSON() : [];
      },

      getLinks: function() {
        return this.collection ? this.collection.links() : [];
      },

      setup: function() {
        // Store last state of nodes.
        var prevNodes = this.nodes;

        // Empty link and remove SVG elements.
        if ( this.link ) {
          this.link
            .data( [] )
            .exit()
            .remove();
        }

        SVGView.prototype.setup.call( this );
        // Hacky way to ensure old coordinates are copied over.
        this.nodes.forEach(function( node ) {
          prevNodes.forEach(function( prev ) {
            if ( node.id === prev.id ) {
              node.x  = prev.x;
              node.y  = prev.y;
              node.px = prev.px;
              node.py = prev.py;
            }
          });
        });

        this.force
          .nodes( this.nodes )
          .links( this.links )
          .start();
      },

      render: function() {
        SVGView.prototype.render.call( this );

        this.force.on( 'tick', function() {
          this.link
            .attr( 'x1', sourceX )
            .attr( 'y1', sourceY )
            .attr( 'x2', targetX )
            .attr( 'y2', targetY );

          this.node.select( 'circle' )
            .attr( 'cx', x )
            .attr( 'cy', y );

          this.node.select( 'text' )
            .attr( 'x', x )
            .attr( 'y', y );
        }.bind( this ) );

        return this;
      },

      linkEnter: function() {
        return this.link.enter()
          .append( 'line' );
      },

      linkUpdate: function() {
        return this.link.transition()
          .duration( duration );
      },

      linkExit: function() {
        return this.link.exit()
          .transition()
          .duration( duration )
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

        return nodeEnter;
      },

      nodeUpdate: function() {
        var nodeUpdate = this.node.transition()
          .duration( duration );

        nodeUpdate.select( 'circle' )
          .attr( 'r', radius );

        nodeUpdate.select( 'text' )
          .text( data )
          .style( 'fill-opacity', 1 );

        return nodeUpdate;
      },

      nodeExit: function() {
        return this.node.exit()
          .remove();
      }
    });

    return GraphView;
  }
);
