/*globals define*/
define([
  'd3',
  'shared/views/svg-view',
  'binary-tree/views/binary-tree-view',
  'linked-list/views/list-view-utils'
], function( d3, SVGView, BinaryTreeView, Utils ) {
  'use strict';

  var id           = Utils.id,
      data         = Utils.data,
      children     = Utils.children,
      duration     = Utils.duration,

      scaleFn      = Utils.scaleFn,
      diagonalFn   = Utils.diagonalFn,
      translateFn  = Utils.translateFn,
      // Constants.
      borderRadius = Utils.borderRadius,
      width        = Utils.width,
      height       = Utils.height;

  var LinkedListView = SVGView.extend({
    initialize: function( options ) {
      SVGView.prototype.initialize.call( this, options );

      // d3 configuration.
      this.tree = d3.layout.tree()
        .children( children );

      this.diagonal  = null;
      this.translate = null;

      this.resize();
    },

    resize: function() {
      SVGView.prototype.resize.call( this );

      this.x = scaleFn({
        attr: 'y',
        min: 0,
        max: 50
      });

      this.y = scaleFn({
        attr: 'x',
        min: 0,
        max: this.height - height
      });

      this.diagonal  = diagonalFn(  this.x, this.y );
      this.translate = translateFn( this.x, this.y );
    },

    getNodes: function() {
      var nodes = SVGView.prototype.getNodes.call( this );
      // Set y-height equal to depth of node in list (position).
      nodes.forEach(function( d ) {
        d.y = d.depth;
      });

      return nodes;
    },

    // Link states.
    linkEnter: function() {
      return this.link.enter()
        .append( 'path' )
          .attr( 'class', 'link' )
          .attr( 'd', this.diagonal )
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
        // Link disappears twice as fast.
        .duration( 0.5 * duration )
        .attr( 'd', this.diagonal )
        .style( 'stroke-opacity', 0 )
        .remove();
    },

    // Node states.
    nodeEnter: function() {
      var nodeEnter = this.node.enter()
        .append( 'g' )
          .filter( id ) // Draw non-empty nodes.
            .attr( 'class', 'node' )
            .attr( 'transform', this.translate );

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
      BinaryTreeView.prototype.nodeInput.call( this, nodeEnter );
    },

    nodeUpdate: function() {
      var nodeUpdate = this.node.transition()
        .duration( duration )
        .attr( 'transform', this.translate );

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
      var nodeExit = this.node.exit()
        .transition()
        .duration( duration )
        .attr( 'transform', this.translate )
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
});
