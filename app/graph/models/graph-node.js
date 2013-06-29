define(
  [ 'backbone' ],
  function( Backbone ) {

    var GraphNode = Backbone.Model.extend({
      defaults: {
        children: []
      }
    });

    return GraphNode;
  }
);
