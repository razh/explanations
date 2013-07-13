define(
  [ 'shared/template',
    'linked-list/models/linked-list',
    'linked-list/views/linked-list-view' ],
  function( Template, LinkedList, LinkedListView ) {
    'use strict';

    var list, listView;

    function initialize( args ) {
      Template.onLoad(function() {
        list = new LinkedList();
        list.insert( 10 );
        list.insert(  8 );
        list.insert( 25 );
        list.insert( 37 );

        listView = new LinkedListView({
          el: '#list-00',
          model: list
        });

        listView.render();
      });

      Template.initialize.apply( null, args );
    }

    function destroy() {
      list.destroy();
      listView.remove();

      Template.destroy();
    }

    return {
      initialize: initialize,
      destroy: destroy
    };
  }
);
