define(
  [ 'd3',
    'shared/views/svg-view',
    'tree/views/tree-view-utils' ],
  function( d3, SVGView, Utils ) {
    'use strict';

    // Load utility functions/variables.
    var id          = Utils.id,
        data        = Utils.data,

        scaleFn     = Utils.scaleFn,
        diagonalFn  = Utils.diagonalFn,
        translateFn = Utils.translateFn,

        duration    = Utils.duration,
        radius      = Utils.radius;


    var TreeView = SVGView.extend({
      initialize: function() {
        SVGView.prototype.initialize.call( this );

        // d3 configuration.
        this.tree = d3.layout.tree();

        // Last state of nodes (indexed by id).
        // This idea of preserving state to have more coherent link transitions
        // is taken from the NYTimes' Path to the White House infographic.
        this.oldNodesById = {};

        this.resize();
      },

      resize: function() {
        SVGView.prototype.resize.call( this );

        // Set scaling functions.
        this.x = scaleFn({
          attr: 'x',
          min: radius,
          max: this.width
        });

        this.y = scaleFn({
          attr: 'y',
          min: radius,
          max: this.height
        });

        this.diagonal  = diagonalFn(  this.x, this.y );
        this.translate = translateFn( this.x, this.y );
      },

      render: function() {
        var that = this;

        // Stash old state of nodes.
        this.oldNodesById = {};
        this.nodes.forEach(function( d ) {
          if ( d.id ) {
            that.oldNodesById[ d.id ] = d;
          }
        });

        SVGView.prototype.render.call( this );

        return this;
      },


      // Link states.
      linkEnter: function() {
        var that     = this,
            diagonal = this.diagonal;

        return this.link.enter()
          .append( 'path' )
            .style( 'fill-opacity', 0 ) // Stop hidden paths from being rendered.
            .filter( function( d ) { return d.target.id; } ) // Draw only paths that have an existing target.
              .attr( 'class', 'link' )
              .attr( 'd', function( d ) {
                var source = that.oldNodesById[ d.source.id ];
                source = source ? source : d.source;

                // Draw from the old source.
                return diagonal({
                  source: source,
                  target: source
                });
              })
              .style( 'stroke-opacity', 0 );
      },

      linkUpdate: function() {
        return this.link.transition()
          .duration( duration )
          .attr( 'd', this.diagonal )
          .style( 'stroke-opacity', 1 );
      },

      linkExit: function() {
        return this.link.exit()
          .transition()
          // Links need to disappear faster for visual coherency.
          .duration( 0.5 * duration )
          .attr( 'd', this.diagonal )
          .style( 'stroke-opacity', 0 )
          .remove();
      },


      // Node states.
      nodeEnter: function() {
        var that = this,
            x = this.x,
            y = this.y;

        var nodeEnter = this.node.enter()
          .append( 'g' )
            .filter( id ) // Draw non-empty nodes.
              .attr( 'class', 'node' )
              .attr( 'transform', function( d ) {
                // Enter at the last position of the parent.
                var parent = that.oldNodesById[ d.parent ? d.parent.id : d.id ];
                parent = parent ? parent : d;
                return 'translate(' + x( parent ) + ', ' + y( parent ) + ')';
              });

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
          .duration( duration )
          .attr( 'transform', this.translate );

        nodeUpdate.select( 'circle' )
          .attr( 'r', radius );

        nodeUpdate.select( 'text' )
          .style( 'fill-opacity', 1 );

        return nodeUpdate;
      },

      nodeExit: function() {
        var nodeExit = this.node.exit()
          .transition()
          .duration( duration )
          .attr( 'transform', this.translate )
          .remove();

        nodeExit.select( 'circle' )
          .attr( 'r', 0 );

        nodeExit.select( 'text' )
          .style( 'fill-opacity', 0 );

        return nodeExit;
      }
    });

    return TreeView;
  }
);
