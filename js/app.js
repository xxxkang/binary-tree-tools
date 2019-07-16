var input; // The input array
var tree = {};

/*
Trigger input when hitting Enter.
*/
document
  .getElementById("array-input")
  .addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("create-tree").click();
    }
  });

/* 
Dropdown botton behavior.
*/
$(".dropdown-item").click(function(event) {
  var choice = event.currentTarget;
  $("#choose-traversal").text(choice.text + " Traversal");
});

/*
Reset SVG created by D3.
*/
function reset() {
  d3.selectAll("svg").remove();
}

/* 
Non-numeric input elements will be converted to NaN
Remove trailing NaNs
For non-empty input arrays, its length should be odd to make the tree serialization code work
 */
function getInput() {
  let inputText = document.getElementById("array-input");
  input = inputText.value
    .replace(/'|"|\[|\]/g, "")
    .trim()
    .split(",")
    .map(num => parseInt(num));
  while (input.length > 0 && isNaN(input[input.length - 1])) {
    input.pop();
  }
  if (input.length > 0 && input.length % 2 == 0) input.push(NaN);
}

function createBinaryTreeAndArr() {
  reset();
  getInput();
  tree = new Tree(input);
  if (!jQuery.isEmptyObject(tree)) {
    highlightIndex = 0;
    tree.drawSerialization();
    drawBinaryTree(tree);
  }
}

function createPreorder() {
  if (!jQuery.isEmptyObject(tree)) {
    tree.drawPreorder();
  }
}

function createInorder() {
  if (!jQuery.isEmptyObject(tree)) {
    tree.drawInorder();
  }
}

function createPostorder() {
  if (!jQuery.isEmptyObject(tree)) {
    tree.drawPostorder();
  }
}

// Default values
input = [1, 1, 2, 5, 14, 42, ,132, ,429, ,1430, 4862, 16796, 58786];
let testInput = document.getElementById("array-input");
testInput.value = input;
createBinaryTreeAndArr();
