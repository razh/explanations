define(
  [ 'jquery',
    'linked-list/models/linked-list',
    'linked-list/views/linked-list-view',
    'shared/views/input-view' ],
  function( $, LinkedList, LinkedListView, InputView ) {
    'use strict';

    var list, listView, inputView, el;

    function initialize() {
      el = $( '#app' )
        .append( '<div class="list padded" id="list"></div>' )
        .append( '<div class="input" id="input"></div>' );

      list = new LinkedList();
      list.insert( 1 );
      list.insert( 2 );

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
  }
);
