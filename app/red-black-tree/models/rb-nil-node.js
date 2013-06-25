define(
  [ 'binary-tree/models/tree-node' ],
  function( TreeNode ) {
    'use strict';

    var Nil = TreeNode.extend({
      // noop if setting properties.
      set: function() {}
    });

    return Nil;
  }
);
