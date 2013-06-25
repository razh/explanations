define(
  [ 'jquery',
    'underscore',
    'backbone',
    'text!binary-tree/templates/input-view.html' ],
  function( $, _, Backbone, inputTemplate ) {
    'use strict';

    var InputView = Backbone.View.extend({
      template: _.template( inputTemplate ),

      events: {
        'click .input-button.insert': 'insert',
        'click .input-button.delete': 'delete'
      },

      initialize: function() {
        _.bindAll( this, 'render', 'onKeyDown' );
        $( document ).bind( 'keydown', this.onKeyDown );
        this.listenTo( this.model, 'change', this.render );
      },

      render: function() {
        this.$el.html( this.template({ tree: this.model }) );
        return this;
      },

      insert: function() {
        var numbers = this.getInput();
        numbers.forEach( function( number ) {
          if ( !isNaN( number ) ) {
            this.model.insert( number );
          }
        }, this ); // Set context to this.

        // We trigger changes here because we want the model to be free of event references.
        this.model.trigger( 'change' );
      },

      delete: function() {
        var numbers = this.getInput();
        numbers.forEach( function( number ) {
          if ( !isNaN( number ) ) {
            var node = this.model.search( number );
            if ( node ) {
              this.model.delete( node );
            }
          }
        }, this );

        // And trigger changes here as well.
        this.model.trigger( 'change' );
      },

      getInput: function() {
        var valuesArray = this.$( '.input-value' ).val().split( ',' );
        return valuesArray.map( function( value ) {
          return parseInt( value, 10 );
        });
      },

      onKeyDown: function( event ) {
        // Enter.
        if ( event.which === 13 ) {
          this.insert();
        }
      }
    });

    return InputView;
  }
);
