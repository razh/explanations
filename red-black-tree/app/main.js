define(
  [ 'models/rb-tree',
    '../../../binary-tree/app/views/input-view' ],
  function( RBTree, InputView ) {
    var rbTree = new RBTree();
    rbTree.insert();

    var inputView = new InputView({
      el: '#input-view',
      model: rbTree
    });

    inputView.render();
  }
);
