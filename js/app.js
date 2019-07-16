var input; // want the input to be a global variable
var tree = {};

function reset() {
  d3.selectAll('svg').remove();
}

/* 
Non-numeric input elements will be converted to NaN
Remove trailing NaNs
For non-empty input arrays, its length should be odd to make the tree serialization code work
 */
function getInput() {
  let inputText = document.getElementById("array-input");
  input = inputText.value.replace(/'|"|\[|\]/g, '').trim().split(',').map((num) => parseInt(num));
  while (input.length > 0 && isNaN(input[input.length-1])) {
    input.pop();
  }
  if (input.length > 0 && (input.length % 2 == 0)) input.push(NaN);
}

function createBinaryTreeAndArr() {
  reset();
  getInput();
  tree = new Tree(input);
  if (!jQuery.isEmptyObject(tree)) {
    tree.drawSerialization();
    drawBinaryTree(tree);
  }
}

function createPreorder() {
  if (!jQuery.isEmptyObject(tree)) {
    tree.drawPreorder();
  }
}

// default values
input = [1, 2, 5, 14, , 132, 429];
let testInput = document.getElementById("array-input")
testInput.value = input;
createBinaryTreeAndArr();
