define(
  [ 'underscore',
    'd3',
    'shared/views/struct-view',
    'binary-tree/views/tree-view-utils' ],
  function( _, d3, StructView, Utils ) {
    'use strict';

    // Load utility functions/variables.
    var x             = Utils.x,
        y             = Utils.y,
        id            = Utils.id,
        data          = Utils.data,
        children      = Utils.children,
        translate     = Utils.translate,
        diagonal      = Utils.diagonal,
        duration      = Utils.duration,
        radius        = Utils.radius;

    var TreeView = StructView.extend({
      initialize: function() {
        StructView.prototype.initialize.call( this );

        // d3 configuration.
        this.tree = d3.layout.tree()
          .children( children );

        // Last state of nodes (indexed by id).
        // This idea of preserving state to have more coherent link transitions
        // is taken from the NYTimes' Path to the White House infographic.
        this.oldNodesById = {};
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

        StructView.prototype.render.call( this );

        return this;
      },

      // Link states.
      linkEnter: function() {
        var that = this;
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
          .attr( 'd', diagonal )
          .style( 'stroke-opacity', 1 );
      },

      linkExit: function() {
        return this.link.exit()
          .transition()
          // Links need to disappear faster for visual coherency.
          .duration( 0.5 * duration )
          .attr( 'd', diagonal )
          .style( 'stroke-opacity', 0 )
          .remove();
      },

      // Node states.
      nodeEnter: function() {
        var that = this;

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

        this.nodeInput( nodeEnter );
        return nodeEnter;
      },

      // Attach input handlers on to nodes.
      nodeInput: function( nodeEnter ) {
        var that = this;
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
          .attr( 'transform', translate )
          .remove();

        nodeExit.select( 'circle' )
          .attr( 'r', 0 );

        nodeExit.select( 'text' )
          .style( 'fill-opacity', 0 );

        return nodeExit;
      },
    });

    return TreeView;
  }
);
