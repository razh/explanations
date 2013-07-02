define(
  [ 'jquery',
    'binary-heap/models/binary-heap',
    'binary-heap/views/binary-heap-view' ],
  function( $, BinaryHeap, BinaryHeapView ) {
    'use strict';

    var binaryHeap, binaryHeapView, el;

    function initialize() {
      el = $( '#app' )
        .append( '<div id="binary-heap-view"></div>' );

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
