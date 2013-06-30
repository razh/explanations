define(
  [ 'linked-list/views/list-view-utils' ],
  function( Utils ) {
    'use strict';

    function x( d ) {
      return d.x * window.innerWidth;
    }

    function y( d ) {
      return d.y * window.innerHeight;
    }

    var translate = Utils.translateFn( x, y );

    return {
      id:        Utils.id,
      data:      Utils.data,

      pairing:   Utils.pairing,
      linkId:    Utils.linkId,

      translate: translate,

      duration:  500,
      radius:    6
    };
  }
);
