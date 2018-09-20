let depth;
let treeContainer;
let arrayContainer;
let start;
let input;

function calculateDimensions(arr) {
  let ySpacing = 100;

  depth = Math.ceil(Math.log2((arr.length - 1) + 2)) - 1;
  return {
    width: Math.pow(2, depth),
    height: ySpacing += ySpacing * depth
  }
}

function createContainer(id, width, height) {
  let container = d3.select(`div#${id}`)
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  return container;
}

function createVisual(id, width, height) {
  let container = d3.select(`div#${id}`)
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  return container;
}

function addContainer(id, arr, width, height) {
  let box = calcDimensions(arr);

  // depth = Math.ceil(Math.log2((arr.length - 1) + 2)) - 1 || 1;

  let container = d3.select(`div#${id}`)
    .append('svg')
    .attr('width', width || box.width * 600 * (.8 / depth) * .75)
    .attr('height', height || box.height)

  return container;
}


function reset() {
  d3.select('div#binary-tree').select('svg').remove()
  d3.select('div#array-visual').select('svg').remove()
}

function createVisuals(id, arr) {
  container = createContainer("binary-tree", arr);
  arrayContainer = createContainer("array-visual", arr, arr.length * 55, 300);
  start = treeContainer.attr("width") / 2;
  createNodes(arr, start, 50, 35);
  createArray(arr, 0, 30, 50, 50);
}


function createVisuals(arr) {
  treeContainer = createContainer("binary-tree", arr);
  arrayContainer = createContainer("array-visual", arr, arr.length * 55, 300);
  start = treeContainer.attr("width") / 2;
  createNodes(arr, start, 50, 35);
  createArray(arr, 0, 30, 50, 50);
}

document.getElementById('array').onsubmit = function (evt) {
  evt.preventDefault();
  reset();
  document.getElementById('array-descrip').innerHTML = "Array";
  document.querySelector('#visual-title').innerHTML = "Binary Tree Visualization";
  document.querySelector('#instructions').innerHTML = "Click a value in the binary tree or array to highlight its location in both visualizations.";
  if (evt.target.array.value !== '') {
    input = evt.target.array.value.trim().split(/\s+|\,+/g).map((num) => parseInt(num));
    treeContainer = createVisuals("binary-tree", input, height, width);
    arrayContainer = createVisuals("array-visual");
  }
}

function heapify() {
  makeHeap(input, input.length);
  reset();
  createVisuals(input);
  document.getElementById('array-descrip').innerHTML = "Array In Max-Heap <p class='subtext'> Rule: The parent's value is always greater than or equal to the values of its children.</p>";
  document.getElementById('visual-title').innerHTML = "Max-Heap Binary Tree Visualization";
}

function createBST() {
  reset();
  input.sort((a, b) => a - b);
  document.querySelector('#visual-title').innerHTML = "Binary Search Tree Visualization";
  document.querySelector('#instructions').innerHTML = "The input array sorted and arranged into a Binary Search Tree.";
  document.querySelector('#array-descrip').innerHTML = "";
  createBSTNodes(input);
}

//default values
input = [3, 4, 2, 9, 8, 7, 12];
createVisuals(input);
