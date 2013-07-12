define(
  [ 'jquery' ],
  function( $ ) {
    'use strict';

    var el;

    function initialize() {
      el = $( '#app' );
    }

    function destroy() {
      el.empty();
    }

    return {
      initialize: initialize,
      destroy: destroy
    };
  }
);
