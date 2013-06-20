define(
  [ 'underscore',
    'backbone',
    'd3' ],
  function( _, Backbone, d3 ) {
    'use strict';

    function children( d ) {
      var childrenArray = [];

      if ( d && d.id ) {
        // If there is only one node, add an empty node for positioning.
        if ( d.left  ) { childrenArray.push( d.left  ); } else { childrenArray.push( {} ); }
        if ( d.right ) { childrenArray.push( d.right ); } else { childrenArray.push( {} ); }
      }

      return childrenArray;
    }

    function x( d ) {
      return d.x * window.innerWidth;
    }

    function y( d ) {
      return 0.6 * d.y * window.innerHeight + 50;
    }

    function data( d ) {
      return d.data;
    }

    function id( d ) {
      return d.id;
    }

    function translate( d ) {
      return 'translate(' + x(d) + ', ' + y(d) + ')';
    }

    function translateToParent( d ) {
      d = d.parent ? d.parent : d;
      return translate( d );
    }

    // Cantor pairing function to encode two numbers as one.
    function pairing( i, j ) {
      return 0.5 * ( i + j ) * ( i + j + 1 ) + j;
    }

    // Creates a unique id for each link.
    function linkId( d ) {
      return pairing( d.source.id, d.target.id );
    }

    var diagonal = d3.svg.diagonal()
      .projection( function( d ) {
        return [ x(d), y(d) ];
      });

    var duration = 500;
    var radius = 20;

    var TreeView = Backbone.View.extend({
      initialize: function() {
        _.bindAll( this, 'render' );
        this.listenTo( this.model, 'change', this.render );

        // Select d3 element.
        this.vis = d3.select( this.el )
          .append( 'svg:svg' );

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
          .data( this.tree.links( nodes ), linkId );

        link.enter()
          .append( 'path' )
            .style( 'fill-opacity', 0 ) // Stop hidden paths from being rendered.
            .filter( function( d ) { return d.target.id; } ) // Draw only paths that have an existing target.
              .attr( 'class', 'link' )
              .attr( 'd', diagonal )
              .style( 'stroke-opacity', 0 );

        link.transition()
          .duration( duration )
          .attr( 'd', diagonal )
          .style( 'stroke-opacity', 1 );

        link.exit()
          .transition()
          .duration( duration )
          .attr( 'd', diagonal )
          .style( 'stroke-opacity', 0 )
          .remove();


        // Nodes.
        var node = this.vis.select( '#nodes' )
          .selectAll( '.node' )
          .data( nodes, id );

        // Enter.
        var nodeEnter = node.enter()
          .append( 'g' )
            .filter( id ) // Draw non-empty nodes.
              .attr( 'class', 'node' )
              .attr( 'transform', translateToParent );

        nodeEnter.append( 'circle' )
          .attr( 'r', 0 );

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

        // Update.
        var nodeUpdate = node.transition()
          .duration( duration )
          .attr( 'transform', translate );

        nodeUpdate.select( 'circle' )
          .attr( 'r', radius );

        nodeUpdate.select( 'text' )
          .text( data )
          .style( 'fill-opacity', 1 );

        // Exit.
        var nodeExit = node.exit()
          .transition()
          .duration( duration )
          .attr( 'transform', translate )
          .remove();

        nodeExit.select( 'circle' )
          .attr( 'r', 0 );

        nodeExit.select( 'text' )
          .style( 'fill-opacity', 0 );

        return this;
      },

      delete: function( node ) {

        this.model.delete( node );
      }
    });

    return TreeView;
  }
);
