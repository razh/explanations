define(
  [ 'underscore',
    'backbone',
    'd3' ],
  function( _, Backbone, d3, treeTemplate ) {
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
      return d.x * window.innerWidth;
    }

    function y( d ) {
      return 0.25 * d.y * window.innerHeight + 50;
    }

    function data( d ) {
      return d.data;
    }

    function translate( d ) {
      return 'translate(' + x(d) + ', ' + y(d) + ')';
    }

    function translateToParent( d ) {
      d = d.parent ? d.parent : d;
      return translate( d );
    }

    var diagonal = d3.svg.diagonal()
      .projection( function( d ) {
        return [ x(d), y(d) ];
      });

    var TreeView = Backbone.View.extend({
      initialize: function() {
        _.bindAll( this, 'render' );
        this.listenTo( this.model, 'change', this.render );

        // Select d3 element.
        this.vis = d3.select( this.el )
          .append( 'svg:svg' )
            .attr( 'width', window.innerWidth )
            .attr( 'height', 0.5 * window.innerHeight )
            .style( 'background-color', 'gray' );

        this.vis.append( 'g' ).attr( 'id', 'links' );
        this.vis.append( 'g' ).attr( 'id', 'nodes' );

        // d3 configuration.
        this.tree = d3.layout.tree()
          .children( children );
      },

      render: function() {
        var nodes = this.tree.nodes( this.model.toJSON() );

        // Links.
        var link = this.vis.select( '#links' )
          .selectAll( '.link' )
          .data( this.tree.links( nodes ) );

        link.enter().append( 'path' )
          .attr( 'class', 'link' )
          .attr( 'd', diagonal )
          .style( 'stroke-opacity', 1e-6 );

        link.transition()
          .duration( 800 )
          .attr( 'd', diagonal )
          .style( 'stroke-opacity', 1 );

        link.exit()
          .transition()
          .duration( 800 )
          .attr( 'd', diagonal )
          .style( 'stroke-opacity', 1e-6 )
          .remove();


        // Nodes.
        var node = this.vis.select( '#nodes' )
          .selectAll( '.node' )
          .data( nodes, data );

        // Enter.
        var nodeEnter = node.enter()
          .append( 'g' )
          .attr( 'class', 'node' )
          .attr( 'transform', translateToParent );

        nodeEnter.append( 'circle' )
          .attr( 'r', 1e-6 );

        nodeEnter.append( 'text' )
          .text( data )
          .style( 'fill-opacity', 1e-6 )
          // Center text.
          .style( 'text-anchor', 'middle' )
          .style( 'dominant-baseline', 'middle' );

        // Update.
        var nodeUpdate = node.transition()
          .duration( 500 )
          .attr( 'transform', translate );

        nodeUpdate.select( 'circle' )
          .attr( 'r', 20 );

        nodeUpdate.select( 'text' )
          .text( data )
          .style( 'fill-opacity', 1 );

        // Exit.
        var nodeExit = node.exit()
          .transition()
          .duration( 1000 )
          .attr( 'transform', translate )
          .remove();

        nodeExit.select( 'circle' )
          .attr( 'r', 1e-6 );

        nodeExit.select( 'text' )
          .style( 'fill-opacity', 1e-6 );

        return this;
      }
    });

    return TreeView;
  }
);
