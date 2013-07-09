define(
  [ 'd3',
    'shared/views/struct-view',
    'graph/views/graph-view-utils' ],
  function( d3, StructView, Utils ) {
    'use strict';

    var data     = Utils.data,
        duration = Utils.duration,
        radius   = Utils.radius;

    var GraphView = StructView.extend({
      initialize: function() {
        StructView.prototype.initialize.call( this );
        this.listenTo( this.collection, 'change add remove', this.render );

        this.force = d3.layout.force()
          .charge( -150 )
          .linkDistance( 50 )
          .size( [ window.innerWidth, window.innerHeight ] );

        this.tree = d3.layout.tree();

        this.x       = this.y       = null;
        this.sourceX = this.sourceY = null;
        this.targetX = this.targetY = null;
      },

      getNodes: function() {
        return this.collection.nodes();
      },

      getLinks: function() {
        return this.collection.links();
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

        StructView.prototype.setup.call( this );
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
        StructView.prototype.render.call( this );

        var that = this;
        this.force.on( 'tick', function() {
          that.link
            .attr( 'x1', this.sourceX )
            .attr( 'y1', this.sourceY )
            .attr( 'x2', this.targetX )
            .attr( 'y2', this.targetY );

          that.node.select( 'circle' )
            .attr( 'cx', this.x )
            .attr( 'cy', this.y );

          that.node.select( 'text' )
            .attr( 'x', this.x )
            .attr( 'y', this.y );
        });

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
