define(
  [ 'underscore',
    'backbone',
    'd3',
    'linked-list/views/list-view-utils' ],
  function( _, Backbone, d3, Utils ) {
    'use strict';

    var id     = Utils.id,
        linkId = Utils.linkId;

    /*
      View interface for data structures (nodes and links).
      Note that this uses d3's tree layout (change if necessary).
     */
    var StructView = Backbone.View.extend({
      initialize: function() {
        _.bindAll( this, 'render' );
        if ( this.model ) {
          this.listenTo( this.model, 'change', this.render );
        }

        // Select d3 element.
        this.vis = d3.select( this.el )
          .append( 'svg:svg' );

        this.vis.append( 'g' ).attr( 'id', 'links' );
        this.vis.append( 'g' ).attr( 'id', 'nodes' );

        this.link = null;
        this.node = null;
      },

      // This render function assumes a tree.
      render: function() {
        var nodes = this.tree ? this.tree.nodes( this.model.toJSON() ) : [],
            links = this.tree.links( nodes );

        this.renderLinks( links );
        this.renderNodes( nodes );

        return this;
      },

      renderLinks: function( links ) {
        this.link = this.vis.select( '#links' )
          .selectAll( '.link' )
          .data( links, linkId );

        this.linkEnter();
        this.linkUpdate();
        this.linkExit();
      },

      renderNodes: function( nodes ) {
        this.node = this.vis.select( '#nodes' )
          .selectAll( '.node' )
          .data( nodes, id );

        this.nodeEnter();
        this.nodeUpdate();
        this.nodeExit();
      },

      linkEnter: function() {},
      linkUpdate: function() {},
      linkExit: function() {},

      nodeEnter: function() {},
      nodeUpdate: function() {},
      nodeExit: function() {}
    });


    return StructView;
  }
);
