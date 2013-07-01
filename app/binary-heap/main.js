define(
  [ 'jquery',
    'binary-heap/models/binary-heap',
    'binary-heap/views/binary-heap-view' ],
  function( $, BinaryHeap, BinaryHeapView ) {
    'use strict';

    var binaryHeap, binaryHeapView, el;

    function initialize() {
      el = $( '.app' )
        .append( '<div id="binary-heap-view></div>' );

      binaryHeap = new BinaryHeap();

      binaryHeapView = new BinaryHeapView({
        el: $( '#binary-heap-view' ),
        model: binaryHeap
      });

      binaryHeapView.render();
    }

    function destroy() {
      binaryHeap.destroy();
      binaryHeapView.remove();
      el.empty();
    }

    return {
      initialize: initialize,
      destroy: destroy
    };
  }
);
