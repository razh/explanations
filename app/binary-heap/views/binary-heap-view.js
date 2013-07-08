define(
  [ 'binary-tree/views/tree-view' ],
  function( TreeView ) {
    'use strict';

    var BinaryHeapView = TreeView.extend({
      // We can only interact with a binary heap with the heap-input-view controls.
      nodeInput: function() {}
    });

    return BinaryHeapView;
  }
);
