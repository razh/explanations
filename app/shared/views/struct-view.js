define(
  [ 'underscore',
    'backbone',
    'd3' ],
  function( _, Backbone, d3 ) {

    /*
      Generic view for data structures (nodes and links).
     */
    var StructView = Backbone.View.extend({
      initialize: function() {
        _.bindAll( this, 'render' );
        this.listenTo( this.model, 'change', this.render );

        // Select d3 element.
        this.vis = d3.select( this.el )
          .append( 'svg:svg' );

        this.vis.append( 'g' ).attr( 'id', 'links' );
        this.vis.append( 'g' ).attr( 'id', 'nodes' );
      },

      render: function() {
        var nodes = this.tree ? this.tree.nodes( this.model.toJSON() ) : [];

        this.renderLinks( nodes );
        this.renderNodes( nodes );

        return this;
      },

      renderLinks: function() {},
      renderNodes: function() {}
    });


    return StructView;
  }
);
