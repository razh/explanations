define(
  [ 'binary-tree/views/binary-tree-view' ],
  function( BinaryTreeView ) {
    'use strict';

    var BinaryHeapView = BinaryTreeView.extend({
      // We can only interact with a binary heap with the heap-input-view controls.
      nodeInput: function() {}
    });

    return BinaryHeapView;
  }
);
