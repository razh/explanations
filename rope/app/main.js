requirejs.config({
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: [ 'jquery', 'underscore' ],
      exports: 'Backbone'
    }
  },

  paths: {
    'backbone': 'lib/backbone/backbone',
    'jquery': 'lib/jquery/jquery-2.0.2',
    'underscore': 'lib/underscore/underscore'
  }
});


define(
  [ 'jquery',
    'underscore',
    'backbone' ],
  function( $, _, Backbone ) {
    'use strict';

    console.log( $ );
    console.log( _ );
    console.log( Backbone );
  }
);
