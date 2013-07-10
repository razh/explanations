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
        .append( '<div class="binary-heap padded" id="binary-heap"></div>' )
        .append( '<div class="input heap" id="heap-input"></div>' );

      binaryHeap = new BinaryHeap();
      binaryHeap.insert( 25 );

      var duration = 1000;
      function insertAt( value, time ) {
        return setTimeout(function() {
          binaryHeap.insert( value );
        }, time );
      }

      insertAt(  10,     duration );
      insertAt(   2, 2 * duration );
      insertAt(  55, 3 * duration );
      insertAt( 100, 4 * duration );
      insertAt(   1, 5 * duration );

      console.log( binaryHeap );
      console.log( binaryHeap.toJSON() );

      binaryHeapView = new BinaryHeapView({
        el: $( '#binary-heap' ),
        model: binaryHeap
      });

      binaryHeapView.render();

      inputView = new HeapInputView({
        el: $( '#heap-input' ),
        model: binaryHeap
      });

      inputView.render();
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
