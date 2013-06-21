define(
  [ 'd3' ],
  function( d3 ) {
    'use strict';

    function children( d ) {
      var childrenArray = [];

      if ( d && d.id ) {
        // If there is only one node, add an empty node for positioning.
        if ( d.left  ) { childrenArray.push( d.left  ); } else { childrenArray.push( {} ); }
        if ( d.right ) { childrenArray.push( d.right ); } else { childrenArray.push( {} ); }
      }

      return childrenArray;
    }

    function x( d ) {
      return d.x * window.innerWidth;
    }

    function y( d ) {
      return 0.6 * d.y * window.innerHeight + 50;
    }

    function data( d ) {
      return d.data;
    }

    function id( d ) {
      return d.id;
    }

    function translate( d ) {
      return 'translate(' + x(d) + ', ' + y(d) + ')';
    }

    function translateToParent( d ) {
      d = d.parent ? d.parent : d;
      return translate( d );
    }

    // Cantor pairing function to encode two numbers as one.
    function pairing( i, j ) {
      return 0.5 * ( i + j ) * ( i + j + 1 ) + j;
    }

    // Creates a unique id for each link.
    function linkId( d ) {
      return pairing( d.source.id, d.target.id );
    }

    var diagonal = d3.svg.diagonal()
      .projection( function( d ) {
        return [ x(d), y(d) ];
      });

    return {
      children: children,
      x: x,
      y: y,
      data: data,
      id: id,
      translate: translate,
      translateToParent: translateToParent,
      pairing: pairing,
      linkId: linkId,
      diagonal: diagonal
    };
  }
);
