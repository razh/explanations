define([
  'underscore',
  'd3',
  'shared/views/d3-view',
  'linked-list/views/list-view-utils'
], function( _, d3, D3View, Utils ) {
  'use strict';

  var id     = Utils.id,
      linkId = Utils.linkId;

  /*
    View interface for data structures comprised of nodes and links,
    which is technically a graph.
    Note that this uses d3's tree layout (change if necessary).
   */
  var SVGView = D3View.extend({
    initialize: function( options ) {
      D3View.prototype.initialize.call( this, options );

      if ( this.model ) {
        this.listenTo( this.model, 'change', this.render );
      }

      this.vis = this.vis.append( 'svg' );
      this.vis.append( 'g' ).attr( 'id', 'links' );
      this.vis.append( 'g' ).attr( 'id', 'nodes' );

      this.link = null;
      this.node = null;

      this.links = [];
      this.nodes = [];
    },

    resize: function() {
      D3View.prototype.resize.call( this );

      // Add margins.
      var margin = this.margin;
      this.vis.selectAll( 'g' )
        .attr( 'transform', 'translate(' + margin.left + ', ' + margin.top + ')' );
    },

    /**
     * Returns nodes array to be used by d3.
     */
    getNodes: function() {
      return this.tree ? this.tree.nodes( this.model.toJSON() ) : [];
    },

    /**
     * Returns links array to be used by d3.
     * Call this after this.nodes(); it needs the newest version of this.nodes.
     */
    getLinks: function() {
      return this.tree ? this.tree.links( this.nodes ) : [];
    },

    /**
     * Prepares view for rendering.
     */
    setup: function() {
      this.nodes = this.getNodes();
      this.links = this.getLinks();
    },

    render: function() {
      this.setup();

      this.renderLinks();
      this.renderNodes();

      return this;
    },

    renderLinks: function() {
      this.link = this.vis.select( '#links' )
        .selectAll( '.link' )
        .data( this.links, linkId );

      this.linkEnter();
      this.linkUpdate();
      this.linkExit();
    },

    renderNodes: function() {
      this.node = this.vis.select( '#nodes' )
        .selectAll( '.node' )
        .data( this.nodes, id );

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


  return SVGView;
});
