define(
  [ 'd3',
    'binary-tree/views/tree-view' ],
   function( d3, TreeView ) {
    'use strict';

    var lightBlack = '#222',
        darkRed    = '#bb0000';

    function color( d ) {
      return d.color ? lightBlack : darkRed;
    }

    var RBTreeView = TreeView.extend({
      nodeEnter: function() {
        var nodeEnter = TreeView.prototype.nodeEnter.call( this );

        nodeEnter.select( 'circle' )
          .style( 'fill', color );

        return nodeEnter;
      },

      nodeUpdate: function() {
        var nodeUpdate = TreeView.prototype.nodeUpdate.call( this );

        nodeUpdate.select( 'circle' )
          .style( 'fill', color );

        return nodeUpdate;
      }
    });

    return RBTreeView;
  }
);
