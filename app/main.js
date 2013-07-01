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
    'backbone': 'components/backbone/backbone',
    'd3': 'components/d3/d3',
    'jquery': 'components/jquery/jquery',
    'text': 'components/requirejs-text/text',
    'underscore': 'components/underscore/underscore'
  }
});


define(
  [ 'backbone',
    'router' ],
  function( Backbone, Router ) {
    'use strict';

    var router = new Router();

    router.paths = {
      'linked-list': 'linked-list/main',
      'binary-tree': 'binary-tree/main',
      'red-black-tree': 'red-black-tree/main',
      'binary-heap': 'binary-heap/main',
      'graph': 'graph/main'
    };

    Backbone.history.start();
  }
);
