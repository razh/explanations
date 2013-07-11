define(
  [ 'jquery',
    'binary-heap/models/binary-heap',
    'array/views/array-view',
    'linked-list/views/list-view-utils' ],
  function( $, BinaryHeap, ArrayView, Utils ) {
    'use strict';

    var binaryHeap, arrayView, inputView, el;

    function initialize() {
      el = $( '#app' )
        .append( '<div class="array padded" id="array"></div>' )
        .append( '<div class="input" id="input"></div>' );

      binaryHeap = new BinaryHeap();

      arrayView = new ArrayView({
        el: '#array',
        model: binaryHeap
      });

      var insertAt = Utils.insertAtFn( binaryHeap ),
          duration = 500;

      insertAt(  5, 0 );
      insertAt( 10, duration );
      insertAt( 13, 2 * duration );
      insertAt( 16, 3 * duration );

      setTimeout(function() {
        binaryHeap.pop();
      }, 4 * duration );
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
