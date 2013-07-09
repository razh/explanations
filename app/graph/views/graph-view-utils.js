define(
  [ 'linked-list/views/list-view-utils' ],
  function( Utils ) {
    'use strict';

    function x( d ) {
      return d.x;
    }

    function y( d ) {
      return d.y;
    }

    function coordFn( attr, fn ) {
      return function( d ) {
        return fn( d[ attr ] );
      };
    }

    var sourceX = coordFn( 'source', x ),
        sourceY = coordFn( 'source', y ),
        targetX = coordFn( 'target', x ),
        targetY = coordFn( 'target', y );

    return {
      x:        x,
      y:        y,

      sourceX:  sourceX,
      sourceY:  sourceY,
      targetX:  targetX,
      targetY:  targetY,

      data:     Utils.data,
      pairing:  Utils.pairing,
      linkId:   Utils.linkId,
      scaleFn:  Utils.scaleFn,

      duration: 500,
      radius:   14
    };
  }
);
