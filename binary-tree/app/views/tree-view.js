define(
  [ 'underscore',
    'backbone',
    'd3' ],
  function( _, Backbone, d3 ) {
    'use strict';

    function children( node ) {
      if ( !node ) {
        return null;
      }

      var childrenArray = [];
      if ( node.left  ) { childrenArray.push( node.left ); }
      if ( node.right ) { childrenArray.push( node.right ); }

      return childrenArray;
    }

    function x( node ) {
      return 0.8 * node.x * window.innerWidth;
    }

    function y( node ) {
      return 0.4 * node.y * window.innerHeight;
    }

    var TreeView = Backbone.View.extend({
      initialize: function() {
        _.bindAll( this, 'render' );
        this.listenTo( this.model, 'change', this.render );

        // Select d3 element.
        this.vis = d3.select( this.el )
          .append( 'svg:svg' )
            .attr( 'width', window.innerWidth )
            .attr( 'height', 0.5 * window.innerHeight )
            .style( 'background-color', 'gray' )
          .append( 'svg:g' );

        // d3 configuration.
        this.tree = d3.layout.tree()
          .children( children );
      },

      render: function() {
        var nodes = this.tree.nodes( this.model.toJSON() );

        var node = this.vis.selectAll( 'g.node' )
          .data( nodes );

        var nodeEnter = node.enter()
          .append( 'svg:g' )
          .attr( 'class', 'node' );

        nodeEnter.append( 'svg:circle' )
          .attr( 'r', 40 )
          .attr( 'cx', x )
          .attr( 'cy', y )
          .style( 'fill', 'white' );

        nodeEnter.append( 'svg:text' )
          .text( function( node ) {
            return node.data;
          })
          .attr( 'x', x )
          .attr( 'y', y )
          .style( 'fill', 'black' )
          // Center text.
          .style( 'text-anchor', 'middle' )
          .style( 'dominant-baseline', 'middle' );
      }
    });

    return TreeView;
  }
);
