define(
  [ 'backbone',
    'models/tree-node' ],
  function( Backbone, TreeNode ) {

    var Tree = Backbone.Model.extend({
      defaults: function() {
        return {
          root: null
        };
      },

      insert: function( data ) {
        if ( this.get( 'root' ) === null ) {
          this.set( 'root', new TreeNode({ data: data }));
        }
      },

      destroy: function( data ) {

      }
    });

    return Tree;
  }
);
