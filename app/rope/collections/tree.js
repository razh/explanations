define([
  'backbone',
  'models/tree-node'
], function( Backbone, TreeNode ) {
  'use strict';

  var Tree = Backbone.Collection.extend({
    model: TreeNode
  });

  return Tree;
});
