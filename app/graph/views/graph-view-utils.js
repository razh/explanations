define(
  [ 'linked-list/views/list-view-utils' ],
  function( Utils ) {
    'use strict';

    function coordFn( attr, fn ) {
      return function( d ) {
        return fn( d[ attr ] );
      };
    }

    return {
      data:      Utils.data,
      pairing:   Utils.pairing,
      linkId:    Utils.linkId,

      coordFn:   coordFn,

      duration:  500,
      radius:    14
    };
  }
);
