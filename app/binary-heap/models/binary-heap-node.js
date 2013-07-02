define(
  [ 'shared/models/node' ],
  function( Node ) {
    'use strict';

    var BinaryHeapNode = Node.extend({
      /**
       * Converts the heap node to subtree (in JSON format).
       * @param  {Array} nodes Flat array of nodes as stored in heap.
       * @param  {Number} index Index of current node.
       * @return {Object}       subtree rooted at this node.
       */
      toTree: function( nodes, index ) {
        var jsonObject = this.toJSON();

        var leftIndex  = 2 * index,
            rightIndex = 2 * index + 1;

        var left  = nodes[ leftIndex  ],
            right = nodes[ rightIndex ];

        jsonObject.left  = left  ? left.toTree( nodes, leftIndex )   : null;
        jsonObject.right = right ? right.toTree( nodes, rightIndex ) : null;

        return jsonObject;
      }
    });

    return BinaryHeapNode;
  }
);
