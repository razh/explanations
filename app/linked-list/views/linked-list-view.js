define(
  [ 'd3',
    'shared/views/struct-view',
    'binary-tree/views/tree-view',
    'linked-list/views/list-view-utils' ],
  function( d3, StructView, TreeView, Utils ) {
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
        var linkEnter = StructView.prototype.linkEnter.call( this );

        linkEnter.append( 'path' )
          .attr( 'class', 'link' )
          .attr( 'd', diagonal )
          .style( 'stroke-opacity', 0 );

        return linkEnter;
      },

      linkUpdate: function() {
        var linkUpdate = StructView.prototype.linkUpdate.call( this );

        linkUpdate.transition()
          .duration( duration )
          .attr( 'd', diagonal )
          .style( 'stroke-opacity', 1 );

        return linkUpdate;
      },

      linkExit: function() {
        var linkExit = StructView.prototype.linkExit.call( this );

        linkExit.transition()
          .duration( duration )
          .attr( 'd', diagonal )
          .style( 'stroke-opacity', 0 )
          .remove();

        return linkExit;
      },

      // Node states.
      nodeEnter: function() {
        var nodeEnter = StructView.prototype.nodeEnter.call( this );

        nodeEnter = nodeEnter.append( 'g' )
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

        this.nodeInput( nodeEnter );
        return nodeEnter;
      },

      nodeInput: function( nodeEnter ) {
        TreeView.prototype.nodeInput.call( this, nodeEnter );
      },

      nodeUpdate: function() {
        var nodeUpdate = StructView.prototype.nodeUpdate.call( this );

        nodeUpdate.duration( duration )
          .attr( 'transform', translate );

        nodeUpdate.select( 'rect' )
          .attr( 'x', -0.5 * width )
          .attr( 'y', -0.5 * height )
          .attr( 'width', width )
          .attr( 'height', height );

        nodeUpdate.select( 'text' )
          .text( data )
          .style( 'fill-opacity', 1 );

        return nodeUpdate;
      },

      nodeExit: function() {
        var nodeExit = StructView.prototype.nodeExit.call( this );

        nodeExit.transition()
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

        return nodeExit;
      }
    });

    return LinkedListView;
  }
);
