define(
  [ 'underscore',
    'backbone',
    'text!templates/input-view.html' ],
  function( _, Backbone, inputTemplate ) {
    'use strict';

    var InputView = Backbone.View.extend({
      template: _.template( inputTemplate ),

      events: {
        'click .input-button.insert': 'insert',
        'click .input-button.delete': 'delete'
      },

      initialize: function() {
        _.bindAll( this, 'render' );
        this.listenTo( this.model, 'change', this.render );
      },

      render: function() {
        this.$el.html( this.template({ tree: this.model }) );
        return this;
      },

      insert: function() {
        var number = this.getInput();
        if ( !isNaN( number ) ) {
          this.model.insert( number );
          // We trigger changes here because we want the model to be free of event references.
          this.model.trigger( 'change' );
        }
      },

      delete: function() {
        var number = this.getInput();
        if ( !isNaN( number ) ) {
          var node = this.model.search( number );
          if ( node ) {
            this.model.delete( node );
            // And trigger changes here as well.
            this.model.trigger( 'change' );
          }
        }
      },

      getInput: function() {
        return parseInt( this.$( '.input-value' ).val(), 10 );
      }
    });

    return InputView;
  }
);
