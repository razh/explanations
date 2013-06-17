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

    var TreeView = Backbone.View.extend({
      initialize: function() {
        _.bindAll( this, 'render' );
        this.listenTo( this.model, 'change', this.render );

        // Select d3 element.
        this.vis = d3.select( this.el )
          .append( 'svg:svg' )
          .data( this.model.toJSON() )
            .attr( 'width', window.innerWidth )
            .attr( 'height', 0.5 * window.innerHeight )
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
          .attr( 'r', 10 )
          .style( 'top', function( node ) { return node.y * 10; } )
          .style( 'left', function( node ) { return node.x * 10; } )
          .style( 'fill', 'black' );

        nodeEnter.append( 'svg:text' )
          .text( function( node ) {
            return node.data;
          });
      }
    });

    return TreeView;
  }
);
