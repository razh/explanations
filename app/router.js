/*globals define*/
define([
  'backbone'
], function( Backbone ) {
  'use strict';

  var Router = Backbone.Router.extend({
    routes: {
      ':dir/:name': 'dir',
      ':name': 'path'
    },

    initialize: function() {
      this.paths = {};
      this.module = null;
    },

    /**
     * Loads path in a directory.
     * @param  {String} dir
     * @param  {String} name
     */
    dir: function( dir, name ) {
      var directory = this.paths[ dir ];
      if ( directory ) {
        this.load( dir + '/' + directory[ name ], [ dir, name ] );
      }
    },

    /**
     * Loads top-level path.
     * @param {String} name  Name of the path.
     */
    path: function( name ) {
      this.load( this.paths[ name ] );
    },

    load: function( path, args ) {
      // Clean-up.
      if ( this.module ) {
        this.module.destroy();
      }

      if ( path ) {
        var that = this;
        require( [ path ], function( module ) {
          that.module = module;
          that.module.initialize.call( that, args );
        });
      }
    }
  });

  return Router;
});
