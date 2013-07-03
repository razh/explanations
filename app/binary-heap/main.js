define(
  [ 'jquery',
    'binary-heap/models/binary-heap',
    'binary-heap/views/binary-heap-view',
    'binary-heap/views/heap-input-view' ],
  function( $, BinaryHeap, BinaryHeapView, HeapInputView ) {
    'use strict';

    var binaryHeap, binaryHeapView, inputView, el;

    function initialize() {
      el = $( '#app' )
        .append( '<div id="binary-heap-view"></div>' )
        .append( '<div id="heap-input-view"></div>' );

      binaryHeap = new BinaryHeap();
      binaryHeap.insert( 25 );
      binaryHeap.insert( 10 );
      binaryHeap.insert( 2 );
      binaryHeap.insert( 55 );

      console.log( binaryHeap );
      console.log( binaryHeap.toJSON() );

      binaryHeapView = new BinaryHeapView({
        el: $( '#binary-heap-view' ),
        model: binaryHeap
      });

      binaryHeapView.render();

      inputView = new HeapInputView({
        el: $( '#heap-input-view' ),
        model: binaryHeap
      });

      inputView.render();

      setTimeout(function() {
        binaryHeap.insert( 100 );
        binaryHeapView.render();
      }, 500 );
    }

    function destroy() {
      binaryHeap.destroy();

      binaryHeapView.remove();
      inputView.remove();

      el.empty();
    }

    return {
      initialize: initialize,
      destroy: destroy
    };
  }
);
