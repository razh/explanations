define(
  [ 'jquery',
    'tree/models/tree',
    'tree/models/tree-node',
    'tree/views/tree-view' ],
  function( $, Tree, TreeNode, TreeView ) {
    'use strict';

    var tree, treeView, el;

    function initialize() {
      el = $( '#app' );

      tree = new Tree();

      treeView = new TreeView({
        el: '#tree-view',
        model: tree
      });
    }

    function destroy() {
      el.empty();
    }

    return {
      initialize: initialize,
      destroy: destroy
    };
  }
);
