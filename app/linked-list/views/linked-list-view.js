define(
  [ 'd3',
    'shared/views/struct-view',
    'linked-list/views/list-view-utils' ],
  function( d3, StructView, Utils ) {
    'use strict';

    var id           = Utils.id,
        data         = Utils.data,
        children     = Utils.children,
        translate    = Utils.translate,
        diagonal     = Utils.diagonal,
        duration     = Utils.duration,
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

      getNodes: function() {
        var nodes = StructView.prototype.getNodes.call( this );
        // Set y-height equal to depth of node in list (position).
        nodes.forEach(function( d ) {
          d.y = d.depth;
        });

        return nodes;
      },

      // Link states.
      linkEnter: function() {
        this.link.enter()
          .append( 'path' )
            .attr( 'class', 'link' )
            .attr( 'd', diagonal )
            .style( 'stroke-opacity', 0 );
      },

      linkUpdate: function() {
        this.link.transition()
          .duration( duration )
          .attr( 'd', diagonal )
          .style( 'stroke-opacity', 1 );
      },

      linkExit: function() {
        this.link.exit()
          .transition()
          .duration( duration )
          .attr( 'd', diagonal )
          .style( 'stroke-opacity', 0 )
          .remove();
      },

      // Node states.
      nodeEnter: function() {
        var nodeEnter = this.node.enter()
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
      },

      nodeUpdate: function() {
        var nodeUpdate = this.node.transition()
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
      },

      nodeExit: function() {
        var nodeExit = this.node.exit()
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
