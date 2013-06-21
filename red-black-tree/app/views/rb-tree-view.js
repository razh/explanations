define(
  [ 'd3',
    '../../../binary-tree/app/views/tree-view',
    '../../../binary-tree/app/views/tree-view-utils' ],
   function( d3, TreeView, Utils ) {
    'use strict';

    // Load utility functions/variables.
    var children          = Utils.children,
        data              = Utils.data,
        id                = Utils.id,
        translate         = Utils.translate,
        translateToParent = Utils.translateToParent,
        linkId            = Utils.linkId,
        diagonal          = Utils.diagonal,
        duration          = Utils.duration,
        radius            = Utils.radius;

    var RBTreeView = TreeView.extend({
      render: function() {
        console.log( 'render' );
      }
    });

    return RBTreeView;
  }
);
