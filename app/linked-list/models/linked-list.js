define(
  [ 'backbone',
    'linked-list/models/list-node' ],
  function( Backbone, ListNode ) {
    'use strict';

    var LinkedList = Backbone.Model.extend({
      defaults: function() {
        return {
          head: null
        };
      },

      search: function( data ) {
        return this.searchBy( 'data', data );
      },

      searchBy: function( key, value ) {
        var current = this.get( 'head' );

        while ( current && current.get( key ) !== value ) {
          current = current.get( 'next' );
        }

        return current;
      },

      insert: function( data ) {
        var newNode = new ListNode({ data: data }),
            head    = this.get( 'head' );

        newNode.set( 'next', head );
        if ( head ) {
          head.set( 'prev', newNode );
        }

        this.set( 'head', newNode );
        // As prev defaults to null, this is unnecessary.
        newNode.set( 'prev', null );

        this.trigger( 'change' );
      },

      delete: function( node ) {
        var prev = node.get( 'prev' ),
            next = node.get( 'next' );

        if ( prev ) {
          prev.set( 'next', next );
        } else {
          this.set( 'head', next );
        }

        if ( next ) {
          next.set( 'prev', prev );
        }

        this.trigger( 'change' );
      },

      toArray: function() {
        var array   = [],
            current = this.get( 'head' );

        while ( current ) {
          array.push({
            id: current.id,
            data: current.get( 'data' )
          });

          current = current.get( 'next' );
        }

        return array;
      },

      toJSON: function() {
        var head = this.get( 'head' );
        return head ? head.toJSON() : {};
      }
    });

    return LinkedList;
  }
);
