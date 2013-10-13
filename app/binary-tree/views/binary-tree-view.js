/*globals define*/
define([
  'd3',
  'tree/views/tree-view',
  'tree/views/tree-view-utils'
], function( d3, TreeView, Utils ) {
  'use strict';

  // Load utility functions/variables.
  var data           = Utils.data,
      binaryChildren = Utils.binaryChildren;

  var BinaryTreeView = TreeView.extend({
    initialize: function( options ) {
      TreeView.prototype.initialize.call( this, options );
      this.tree = this.tree.children( binaryChildren );
    },

    nodeEnter: function() {
      var nodeEnter = TreeView.prototype.nodeEnter.call( this );
      this.nodeInput( nodeEnter );
      return nodeEnter;
    },

    // Attach input handlers on to nodes.
    nodeInput: function( nodeEnter ) {
      var that = this;
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

      nodeEnter.on( 'click', function( d ) {
        var node = that.model.searchBy( 'id', d.id );
        if ( node ) {
          that.model.delete( node );
          that.render();
        }
      });
    }
  });

  return BinaryTreeView;
});
