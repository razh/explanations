define(
  [ 'd3' ],
  function( d3 ) {
    'use strict';

    function x( d ) {
      return 50 * d.depth + 50;
    }

    function y( d ) {
      return d.x * window.innerHeight;
    }

    /*
      Returns a function which gets an attribute and applies a function.
     */
    function coordFn( attr, fn ) {
      return function( d ) {
        return fn( d[ attr ] );
      };
    }

    var sourceX = coordFn( 'source', x ),
        sourceY = coordFn( 'source', y ),
        targetX = coordFn( 'target', x ),
        targetY = coordFn( 'target', y );

    /*
      Returns a function that gets the midpoint between a source and target position.
     */
    function midpointFn( sourceFn, targetFn ) {
      return function( d ) {
        return 0.5 * ( sourceFn( d ) + targetFn( d ) );
      };
    }

    var midpointX = midpointFn( sourceX, targetX ),
        midpointY = midpointFn( sourceY, targetY );

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

    return {
      x:               x,
      y:               y,
      id:              id,
      data:            data,
      children:        children,

      sourceX:         sourceX,
      sourceY:         sourceY,
      targetX:         targetX,
      targetY:         targetY,
      midpointX:       midpointX,
      midpointY:       midpointY,

      translateFn:     translateFn,
      translateTo:     translateTo,
      translate:       translate,

      pairing:         pairing,
      linkId:          linkId,

      duration:        500,
      borderRadius:    4,
      width:           32,
      height:          28
    };
  }
);
