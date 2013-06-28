define(
  [ 'd3' ],
  function( d3 ) {
    'use strict';

    function x( d ) {
      return 50 * d.y + 50;
    }

    function y( d ) {
      return 0.8 * d.x * window.innerHeight;
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

    var translate = translateFn( x, y );

    /**
     * Returns a translation function which takes a node attribute.
     * e.g., if we wanted to translate to d's parent with the translateXY function,
     * we would use: translateTo( 'parent', translateXY );
     */
    function translateTo( attr, fn ) {
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

    var diagonal = diagonalFn( x, y );

    return {
      x:               x,
      y:               y,
      id:              id,
      data:            data,
      children:        children,

      translateFn:     translateFn,
      translateTo:     translateTo,
      translate:       translate,

      pairing:         pairing,
      linkId:          linkId,

      diagonalFn:      diagonalFn,
      diagonal:        diagonal,

      duration:        500,
      borderRadius:    4,
      width:           36,
      height:          30
    };
  }
);
