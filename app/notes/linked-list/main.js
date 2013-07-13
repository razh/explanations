define(
  [ 'shared/template',
    'linked-list/models/linked-list',
    'linked-list/views/linked-list-view' ],
  function( Template ) {

    var list, listView, el;

    function initialize( args ) {
      Template.onLoad(function() {
        list = new LinkedList();
        list.insert( 10 );
      });

      Template.initialize.apply( null, args );
    }

    function destroy() {
      Template.destroy();
    }

    return {
      initialize: initialize,
      destroy: destroy
    };
  }
);
