function reheapifyDown(arr, length) {
  let index = 0;
  let bigChildIndex;
  let isHeap = false;

  //the loop keeps going while the array is not a heap, and while the current element
  //has at least a left child. The test to see whether the current element has a left
  //child is leftChild(index) < length
  while (!isHeap && leftChild(index) < length) {
    // console.log(arr);
    if (rightChild(index) >= length) {   //no right child
      bigChildIndex = leftChild(index);
    }
    else if (arr[leftChild(index)] > arr[rightChild(index)]) { //if left child is the bigger of the two children
      bigChildIndex = leftChild(index);
    }
    else {  //then right child is bigger
      bigChildIndex = rightChild(index)
    }
    //Check if the larger child is bigger than the current node. If so,
    //then swap the current node with its bigger child and continue; otherwise it's a heap
    if (arr[index] < arr[bigChildIndex]) {
      swap(arr, index, bigChildIndex)
      index = bigChildIndex;
    }
    else {
      isHeap = true;
    }
  }
}

//Helper functions
function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function parent(index) {
  return Math.floor((index - 1) / 2);
}


function leftChild(index) {
  return 2 * index + 1;
}

function rightChild(index) {
  return 2 * index + 2;
}

function makeHeap(arr) {
  let i;  // Index of next element to be added to heap
  let k;  // Index of new element as it is being pushed

  for (i = 1; i < arr.length; ++i)
  {
      k = i;
      while (k > 0 && arr[k] > arr[parent(k)])
      {
          swap(arr, parent(k), k);
          k = parent(k);
      }
  }
  return arr;
}

function heapSort(arr) {
  let unsortedArrLength = arr.length;

  while (unsortedArrLength > 1) {
    --unsortedArrLength;
    swap(arr, 0, unsortedArrLength);
    reheapifyDown(arr, unsortedArrLength);
  }
  return arr;
}

