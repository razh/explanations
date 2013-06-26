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

    function colorFn( color ) {
      return function( d ) {
        return d.color === color;
      };
    }

    var red   = colorFn( RBTreeNode.RED ),
        black = colorFn( RBTreeNode.BLACK );

    var RBTreeView = TreeView.extend({
      renderNodes: function( nodes ) {
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
          .attr( 'r', 0 )
          .classed( 'red', red )
          .classed( 'black', black );

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
          .attr( 'r', radius )
          .each( 'start', function() {
            d3.select( this )
              .classed( 'red', red )
              .classed( 'black', black );
          });

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
      }
    });

    return RBTreeView;
  }
);
