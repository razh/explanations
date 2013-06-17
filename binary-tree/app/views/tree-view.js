define(
  [ 'underscore',
    'backbone',
    'd3' ],
  function( _, Backbone, d3 ) {
    'use strict';

    function children( d ) {
      if ( !d ) {
        return null;
      }

      var childrenArray = [];
      if ( d.left  ) { childrenArray.push( d.left ); }
      if ( d.right ) { childrenArray.push( d.right ); }

      return childrenArray;
    }

    function x( d ) {
      return 0.8 * d.x * window.innerWidth;
    }

    function y( d ) {
      return 0.2 * d.y * window.innerHeight;
    }

    function text( d ) {
      return d.data;
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

        console.log( nodes );
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
          .text( text )
          .attr( 'x', x )
          .attr( 'y', y )
          .style( 'fill', 'black' )
          // Center text.
          .style( 'text-anchor', 'middle' )
          .style( 'dominant-baseline', 'middle' );

        var nodeUpdate = node.transition()
          .duration( 1000 );

        nodeUpdate.select( 'circle' )
          .attr( 'x', x )
          .attr( 'y', y );

        nodeUpdate.select( 'text' )
          .text( text );
      }
    });

    return TreeView;
  }
);
