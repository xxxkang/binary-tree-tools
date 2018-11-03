let input;

function reset() {
  d3.selectAll('svg').remove();
}

document.getElementById('array').onsubmit = function (evt) {
  evt.preventDefault();
  reset();
  document.getElementById('array-descrip').innerHTML = "Array";
  document.querySelector('#visual-title').innerHTML = "Binary Tree Visualization";
  document.querySelector('#instructions').innerHTML = "Click a value in the binary tree or array to highlight its location in both visualizations.";
  if (evt.target.array.value !== '') {
    input = evt.target.array.value.trim().split(/\s+|\,+/g).map((num) => parseInt(num));
    createBinaryTreeAndArr(input)
  }
}

function heapify() {
  reset();
  makeHeap(input, input.length);
  createBinaryTreeAndArr(input);
  document.getElementById('array-descrip').innerHTML = "Array In Max-Heap <p class='subtext'> Rule: The parent's value is always greater than or equal to the values of its children.</p>";
  document.getElementById('visual-title').innerHTML = "Max-Heap Binary Tree Visualization";
}

function createBinaryTreeAndArr(arr) {
  arrayContainer = createContainer("array-visual", arr, arr.length * 55, 300);
  let tree = new Tree()
  tree.createBinaryTree(input)
  createArray(arr, 0, 30, 50, 50);
}

function createBinarySearchTree() {
  reset();
  input.sort((a, b) => a - b);
  document.querySelector('#visual-title').innerHTML = "Binary Search Tree Visualization";
  document.querySelector('#instructions').innerHTML = "The input array sorted and arranged into a Binary Search Tree.";
  document.querySelector('#array-descrip').innerHTML = "";
  let tree = new Tree();
  tree.createBinarySearchTree(input)
}

//default values
input = [3, 4, 2, 9, 8, 7, 12];
createBinaryTreeAndArr(input);
