define(
  [ 'backbone' ],
  function( Backbone ) {
    'use strict';

    var Router = Backbone.Router.extend({
      routes: {
        ':name': 'navigate'
      },

      initialize: function() {
        this.paths = {};
        this.module = null;
      },

      navigate: function( name ) {
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
      },

      // When we navigate to the name, open up the corresponding module.
      register: function( name, path ) {
        this.paths[ name ] = path;
      }
    });

    var initialize = function( options ) {
      var router = new Router( options );

      router.register( 'binary-tree', 'binary-tree/main' );
      router.register( 'red-black-tree', 'red-black-tree/main' );

      Backbone.history.start();
    };

    return {
      initialize: initialize
    };
  }
);
