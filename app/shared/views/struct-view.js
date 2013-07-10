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
      options: function() {
        return {
          // Default margins.
          margin: {
            top:    40,
            right:  40,
            bottom: 40,
            left:   40
          }
        };
      },

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

        this.links = [];
        this.nodes = [];

        // Default view dimensions.
        this.width  = this.outerWidth  = 0;
        this.height = this.outerHeight = 0;

        // Scaling functions.
        this.x = this.y = null;
      },

      /**
       * Resizes the view to fit the viewport.
       */
      resize: function() {
        var margin  = this.options.margin;

        this.outerWidth  = this.el ? this.el.clientWidth  : 0;
        this.outerHeight = this.el ? this.el.clientHeight : 0;

        this.width  = this.outerWidth  - margin.left - margin.right;
        this.height = this.outerHeight - margin.top  - margin.bottom;

        this.vis
          .attr( 'width', this.outerWidth )
          .attr( 'height', this.outerHeight );

        // Add margins.
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


    return StructView;
  }
);
