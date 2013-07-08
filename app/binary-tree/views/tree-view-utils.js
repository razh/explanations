define(
  [ 'linked-list/views/list-view-utils' ],
  function( Utils ) {
    'use strict';

    function x( d ) {
      return d.x * window.innerWidth;
    }

    function y( d ) {
      return 0.6 * d.y * window.innerHeight + 50;
    }

    function children( d ) {
      var childrenArray = [];

      if ( d && d.id ) {
        // If there is only one node, add an empty node for positioning.
        if ( d.left  ) { childrenArray.push( d.left  ); } else { childrenArray.push( {} ); }
        if ( d.right ) { childrenArray.push( d.right ); } else { childrenArray.push( {} ); }
      }

      return childrenArray;
    }

    var diagonal  = Utils.diagonalFn( x, y ),
        translate = Utils.translateFn( x, y );

    return {
      x:           x,
      y:           y,
      children:    children,
      translate:   translate,

      diagonal:    diagonal,
      radius:      20,

      data:        Utils.data,
      id:          Utils.id,
      pairing:     Utils.pairing,
      linkId:      Utils.linkId,
      duration:    Utils.duration,
      translateFn: Utils.translateFn,
    };
  }
);
