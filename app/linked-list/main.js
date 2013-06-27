define(
  [ 'jquery',
    'linked-list/models/linked-list',
    'linked-list/views/linked-list-view',
    'linked-list/views/input-view' ],
  function( $, LinkedList, LinkedListView, InputView ) {
    'use strict';

    var list, listView, inputView, el;

    function initialize() {
      el = $( '#app' )
        .append( '<div id="list-view"></div>' )
        .append( '<div id="input-view"></div>' );

      list = new LinkedList();

      listView = new LinkedListView({
        el: '#list-view',
        model: list
      });

      listView.render();

      inputView = new InputView({
        el: '#input-view',
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
