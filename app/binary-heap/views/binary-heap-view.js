define(
  [ 'binary-tree/views/tree-view',
    'binary-tree/views/tree-view-utils' ],
  function( TreeView, Utils ) {
    'use strict';

    var id                = Utils.id,
        data              = Utils.data,
        translateToParent = Utils.translateToParent;

    var BinaryHeapView = TreeView.extend({
      nodeEnter: function() {
        var nodeEnter = this.node.enter()
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
      }
    });

    return BinaryHeapView;
  }
);
