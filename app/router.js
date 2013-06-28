define(
  [ 'backbone' ],
  function( Backbone ) {
    'use strict';

    var Router = Backbone.Router.extend({
      routes: {
        ':name': 'load'
      },

      initialize: function() {
        this.paths = {};
        this.module = null;
      },

      load: function( name ) {
        if ( this.module ) {
          this.module.destroy();
        }

        var path = this.paths[ name ],
            that = this;

        if ( path ) {
          require( [ path ], function( module ) {
            that.module = module;
            that.module.initialize();
          });
        }
      }
    });

    return Router;
  }
);
