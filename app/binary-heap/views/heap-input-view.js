/*globals define*/
define([
  'underscore',
  'shared/views/input-view',
  'text!binary-heap/templates/heap-input-view.html'
], function( _, InputView, heapInputTemplate ) {
  'use strict';

  var HeapInputView = InputView.extend({
    top: '',

    template: _.template( heapInputTemplate ),

    events: {
      'click .input-button.insert': 'insert',
      'click .input-button.pop'   : 'pop'
    },

    render: function() {
      this.$el.html( this.template({ value: this.top }) );
      return this;
    },

    // Noop for delete.
    delete: function() {},

    pop: function() {
      var top = this.model.pop();
      if ( top ) {
        this.top = top.get( 'data' ).toString();
        this.model.trigger( 'change' );
      }
    }
  });

  return HeapInputView;
});
