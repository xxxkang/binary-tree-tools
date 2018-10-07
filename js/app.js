let depth;
let svgContainer;
let arrayContainer;
let start;
let input;

function calculateDimensions(arr) {
  let ySpacing = 100;

  depth = Math.ceil(Math.log2((arr.length - 1) + 2)) - 1;
  return { width: Math.pow(2, depth), height: ySpacing += ySpacing * depth}
}

function createContainer(id, arr, width, height) {
  let box = calculateDimensions(arr);

  depth = Math.ceil(Math.log2((arr.length - 1) + 2)) - 1 || 1;

  container = d3.select(`div#${id}`)
                .append("svg")
                .attr("width", width || box.width * 600 * (.8/depth) * .75)
                .attr("height", height || box.height)

  return container;
}

function reset() {
  d3.select("div#binary-tree").select("svg").remove()
  d3.select("div#array-visual").select("svg").remove()
}

function createVisuals(arr) {
  svgContainer = createContainer("binary-tree", arr);
  arrayContainer = createContainer("array-visual", arr, arr.length * 55, 300);
  start = svgContainer.attr("width") / 2;
  createNodes(arr, start);
  createArray(arr, 0, 30, 50, 50);
}

document.getElementById('array').onsubmit = function(evt) {
  evt.preventDefault();
  reset();
  document.getElementById('array-descrip').innerHTML = "Array";

  if (evt.target.array.value !== '') {
    input = evt.target.array.value.trim().split(/\s+|\,+/g).map(function(n) { return parseInt(n)})
    createVisuals(input);
  }
}

function heapify() {
  makeHeap(input, input.length);
  reset();
  createVisuals(input);
  document.getElementById('array-descrip').innerHTML = "Array In Max-Heap <p class='subtext'> Rule: The parent's value is always greater than or equal to the values of its children.</p>";
}

//default values
input = [3,4,2,9,8,7,12];
createVisuals(input);
