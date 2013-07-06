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

    // Taken from NYTimes' Paths to the White House infographic.
    function parentFn( nodesById ) {
      return function( d ) {
        var parent = d.parent;
        while ( parent ) {
          d = nodesById[ parent.id ];
          if ( d ) {
            return d;
          }

          parent = parent.parent;
        }
      };
    }

    var diagonal          = Utils.diagonalFn( x, y ),
        translate         = Utils.translateFn( x, y ),
        translateToParent = Utils.translateTo( 'parent', translate );

    return {
      x:                 x,
      y:                 y,
      children:          children,

      parentFn:          parentFn,
      translate:         translate,
      translateToParent: translateToParent,

      diagonal:          diagonal,
      radius:            20,

      data:              Utils.data,
      id:                Utils.id,
      pairing:           Utils.pairing,
      linkId:            Utils.linkId,
      duration:          Utils.duration
    };
  }
);
