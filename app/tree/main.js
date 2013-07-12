define(
  [ 'jquery',
    'tree/models/tree',
    'tree/models/tree-node',
    'tree/views/tree-view' ],
  function( $, Tree, TreeNode, TreeView ) {
    'use strict';

    var tree, treeView, el;

    function initialize() {
      el = $( '#app' )
        .append( '<div class="tree padded" id="tree"></div>' );

      tree = new Tree();

      var node0 = new TreeNode({ data:  4 }),
          node1 = new TreeNode({ data: 10 }),
          node2 = new TreeNode({ data: 40 }),
          node3 = new TreeNode({ data: 56 }),
          node4 = new TreeNode({ data: 23 }),
          node5 = new TreeNode({ data: 22 }),
          node6 = new TreeNode({ data: 18 }),
          node7 = new TreeNode({ data: 92 }),
          node8 = new TreeNode({ data:  8 }),
          node9 = new TreeNode({ data: 58 });

      node0.children( node1, node2, node3, node4 );
      node3.children( node5, node6 );
      node6.children( node7, node8 );
      node7.children( node9 );

      treeView = new TreeView({
        el: '#tree',
        model: tree
      });

      tree.set( 'root', node0 );
      treeView.render();
    }

    function destroy() {
      tree.destroy();
      treeView.remove();
      el.empty();
    }

    return {
      initialize: initialize,
      destroy: destroy
    };
  }
);
