requirejs.config({
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: [ 'jquery', 'underscore' ],
      exports: 'Backbone'
    },
    'd3': {
      exports: 'd3'
    }
  },

  paths: {
    'backbone': 'lib/backbone/backbone',
    'd3': 'lib/d3/d3.v3',
    'jquery': 'lib/jquery/jquery-2.0.2',
    'text': 'lib/text',
    'underscore': 'lib/underscore/underscore'
  }
});


define(
  [ 'backbone',
    'router' ],
  function( Backbone, Router ) {
    Router.initialize();
  }
);
