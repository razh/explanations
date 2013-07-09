define(
  [ 'd3' ],
  function( d3 ) {
    'use strict';

    function scaleFn( options ) {
      var attr = options.attr || '',
          min  = options.min  || 0,
          max  = options.max  || 0,
          type = options.type || 'linear';

      var scale = d3.scale[ type ]()
        .domain( [ 0, 1 ] )
        .range( [ min, max ] );

      return function( d ) {
        return scale( d[ attr ] );
      };
    }

    function id( d ) {
      return d.id;
    }

    function data( d ) {
      return d.data;
    }

    function children( d ) {
      var childrenArray = [];

      if ( d && d.id && d.next ) {
        childrenArray.push( d.next );
      }

      return childrenArray;
    }

    function translateFn( xFn, yFn ) {
      return function( d ) {
        return 'translate(' + xFn(d) + ', ' + yFn(d) + ')';
      };
    }

    /**
     * Returns a function which executes fn on a node attribute.
     * e.g., if we wanted to translate to d's parent with the translateXY function,
     * we would use: translateTo( 'parent', translateXY );
     */
    function attrFn( attr, fn ) {
      return function( d ) {
        var value = d[ attr ];
        d = value ? value : d;
        return fn( d );
      };
    }

    // Cantor pairing function to encode two numbers as one.
    function pairing( i, j ) {
      return 0.5 * ( i + j ) * ( i + j + 1 ) + j;
    }

    // Creates a unique id for each link.
    function linkId( d ) {
      return pairing( d.source.id, d.target.id );
    }

    function diagonalFn( xFn, yFn ) {
      return d3.svg.diagonal()
        .projection( function( d ) {
          return [ xFn(d), yFn(d) ];
        });
    }

    return {
      id:           id,
      data:         data,
      children:     children,

      attrFn:       attrFn,
      scaleFn:      scaleFn,
      diagonalFn:   diagonalFn,
      translateFn:  translateFn,

      pairing:      pairing,
      linkId:       linkId,

      duration:     500,
      borderRadius: 4,
      width:        36,
      height:       30
    };
  }
);
