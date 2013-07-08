define(
  [ 'jquery',
    'underscore',
    'text!notes/binary-tree.html' ],
  function( $, _, treeTemplate ) {
    'use strict';

    var el, iframe;

    function initialize() {
      el = $( '#app' ).append( _.template( treeTemplate ) );
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
