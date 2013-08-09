define([
  'jquery',
  'linked-list/models/linked-list',
  'linked-list/views/linked-list-view',
  'shared/views/input-view',
  'linked-list/views/list-view-utils'
], function( $, LinkedList, LinkedListView, InputView, Utils ) {
  'use strict';

  var list, listView, inputView, el;

  function initialize() {
    el = $( '#app' )
      .append( '<div class="list padded" id="list"></div>' )
      .append( '<div class="input" id="input"></div>' );

    list = new LinkedList();
    list.insert( 1 );
    list.insert( 2 );

    var insertAt = Utils.insertAtFn( list ),
        duration = 1000;

    insertAt( 4, duration );
    insertAt( 7, 2 * duration );
    insertAt( 8, 3 * duration );

    listView = new LinkedListView({
      el: '#list',
      model: list
    });

    listView.render();

    inputView = new InputView({
      el: '#input',
      model: list
    });

    inputView.render();

    console.log( list.toJSON() );
  }

  function destroy() {
    list.destroy();

    listView.remove();
    inputView.remove();

    el.empty();
  }

  return {
    initialize: initialize,
    destroy: destroy
  };
});
