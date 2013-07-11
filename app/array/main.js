define(
  [ 'jquery',
    'binary-heap/models/binary-heap',
    'binary-tree/models/tree',
    'linked-list/models/linked-list',
    'array/views/array-view',
    'linked-list/views/list-view-utils' ],
  function( $, BinaryHeap, Tree, LinkedList, ArrayView, Utils ) {
    'use strict';

    var el,
        binaryHeap, tree, list,
        arrayView, treeArrayView, listArrayView,
        inputView;

    function initialize() {
      el = $( '#app' )
        .append( '<div class="array padded" id="array">Binary heap: </div>' )
        .append( '<div class="array padded" style="top: 150px;" id="tree-array">Binary tree:</div>' )
        .append( '<div class="array padded" style="top: 250px;" id="list-array">Linked list:</div>' )
        .append( '<div class="input" id="input"></div>' );

      // Heap.
      binaryHeap = new BinaryHeap();

      arrayView = new ArrayView({
        el: '#array',
        model: binaryHeap
      });

      var insertHeap = Utils.insertAtFn( binaryHeap ),
          duration = 500;

      insertHeap(  5, 0 );
      insertHeap( 10, duration );
      insertHeap( 13, 2 * duration );
      insertHeap( 16, 3 * duration );

      setTimeout(function() {
        binaryHeap.pop();
      }, 4 * duration );

      // Tree.
      tree = new Tree();

      treeArrayView = new ArrayView({
        el: '#tree-array',
        model: tree
      });

      var insertTree = Utils.insertAtFn( tree );

      insertTree( 1, 0 );
      insertTree( 2, duration );
      insertTree( 3, 2 * duration );
      insertTree( 4, 3 * duration );
      insertTree( 3.5, 4 * duration );

      // List.
      list = new LinkedList();

      listArrayView = new ArrayView({
        el: '#list-array',
        model: list
      });

      var insertList = Utils.insertAtFn( list );

      insertList(  2, 0 );
      insertList( 10, duration );
      insertList(  8, 2 * duration );
      insertList(  3, 3 * duration );
      insertList( 21, 4 * duration );
    }

    function destroy() {
      binaryHeap.destroy();
      arrayView.remove();
      el.empty();
    }

    return {
      initialize: initialize,
      destroy: destroy
    };
  }
);
