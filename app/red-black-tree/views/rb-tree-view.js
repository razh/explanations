define(
  [ 'd3',
    'binary-tree/views/tree-view',
    'binary-tree/views/tree-view-utils',
    'red-black-tree/models/rb-tree-node' ],
   function( d3, TreeView, Utils, RBTreeNode ) {
    'use strict';

    // Load utility functions/variables.
    var data              = Utils.data,
        id                = Utils.id,
        translate         = Utils.translate,
        translateToParent = Utils.translateToParent,
        duration          = Utils.duration,
        radius            = Utils.radius;

    var lightBlack = '#222',
        darkRed    = '#bb0000';

    function color( d ) {
      return d.color ? lightBlack : darkRed;
    }

    function colorFn( color ) {
      return function( d ) {
        return d.color === color;
      };
    }

    var red   = colorFn( RBTreeNode.RED ),
        black = colorFn( RBTreeNode.BLACK );

    var RBTreeView = TreeView.extend({
      nodeEnter: function() {
        var nodeEnter = this.node.enter()
          .append( 'g' )
            .filter( id ) // Draw non-empty nodes.
              .attr( 'class', 'node' )
              .attr( 'transform', translateToParent );

        nodeEnter.append( 'circle' )
          .attr( 'r', 0 )
          .style( 'fill', color );

        nodeEnter.append( 'text' )
          .text( data )
          .style( 'fill-opacity', 0 )
          // Center text.
          .style( 'text-anchor', 'middle' )
          .style( 'dominant-baseline', 'middle' );

        // Interactions.
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

        nodeUpdate.select( 'circle' )
          .attr( 'r', radius )
          .style( 'fill', color );

        nodeUpdate.select( 'text' )
          .text( data )
          .style( 'fill-opacity', 1 );
      }
    });

    return RBTreeView;
  }
);
