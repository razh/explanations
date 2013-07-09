define(
  [ 'jquery',
    'underscore' ],
  function( $, _ ) {
    'use strict';

    var el, loadFn;

    /**
     * Loads HTML template in the given directory.
     */
    function initialize( dir, name ) {
      require( [ 'text!' + dir + '/' + name + '/index.html' ], function( template ) {
        el = $( '#app' ).append( _.template( template ) );

        if ( loadFn ) {
          loadFn();
        }
      });
    }

    function destroy() {
      el.empty();
    }

    return {
      initialize: initialize,
      destroy: destroy,

      onLoad: function( fn ) {
        loadFn = fn;
      }
    };
  }
);
