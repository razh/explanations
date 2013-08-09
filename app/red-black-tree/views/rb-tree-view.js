define([
  'd3',
  'binary-tree/views/binary-tree-view'
], function( d3, BinaryTreeView ) {
  'use strict';

  var lightBlack = '#222',
      darkRed    = '#b00';

  function color( d ) {
    return d.color ? lightBlack : darkRed;
  }

  var RBTreeView = BinaryTreeView.extend({
    nodeEnter: function() {
      var nodeEnter = BinaryTreeView.prototype.nodeEnter.call( this );

      nodeEnter.select( 'circle' )
        .style( 'fill', color );

      return nodeEnter;
    },

    nodeUpdate: function() {
      var nodeUpdate = BinaryTreeView.prototype.nodeUpdate.call( this );

      nodeUpdate.select( 'circle' )
        .style( 'fill', color );

      return nodeUpdate;
    }
  });

  return RBTreeView;
});
