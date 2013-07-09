define(
  [ 'shared/template',
     'binary-tree/models/tree',
     'binary-tree/views/tree-view' ],
  function( Template, Tree, TreeView ) {
    'use strict';

    var tree, treeView;

    function initialize( args ) {
      Template.onLoad(function() {
        tree = new Tree();
        tree.insert( 5 );

        treeView = new TreeView({
          el: '#tree-view-00',
          model: tree
        });

        treeView.render();
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
