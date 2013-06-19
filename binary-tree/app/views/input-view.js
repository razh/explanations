define(
  [ 'underscore',
    'backbone',
    'text!templates/input-view.html' ],
  function( _, Backbone, inputTemplate ) {

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
        this.model.insert( parseInt( this.$( '.input-value' ).val(), 10 ) );
        this.model.trigger( 'change' );
      },

      delete: function() {
        var node = this.model.search( parseInt( this.$( '.input-value' ).val(), 10 ) );
        this.model.delete( node );
        this.model.trigger( 'change' );
      }
    });

    return InputView;
  }
);
