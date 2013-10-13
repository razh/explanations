/*globals define*/
define([
  'linked-list/views/list-view-utils'
], function( Utils ) {
  'use strict';

  function binaryChildren( d ) {
    var childrenArray = [];

    if ( d && d.id ) {
      // If there is only one node, add an empty node for positioning.
      if ( d.left  ) { childrenArray.push( d.left  ); } else { childrenArray.push( {} ); }
      if ( d.right ) { childrenArray.push( d.right ); } else { childrenArray.push( {} ); }
    }

    return childrenArray;
  }

  return {
    binaryChildren: binaryChildren,
    radius:         20,

    data:           Utils.data,
    id:             Utils.id,
    pairing:        Utils.pairing,
    linkId:         Utils.linkId,
    duration:       Utils.duration,

    scaleFn:        Utils.scaleFn,
    diagonalFn:     Utils.diagonalFn,
    translateFn:    Utils.translateFn,
  };
});
