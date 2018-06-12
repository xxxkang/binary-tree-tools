function calculateDimensions(arr) {
  let ySpacing = 100;

  depth = Math.ceil(Math.log2((arr.length - 1) + 2)) - 1;
  return { width: Math.pow(2, depth), height: ySpacing += ySpacing * depth }
}

let depth;

function createContainer(id, arr, width, height) {
  let box = calculateDimensions(arr);

  depth = Math.ceil(Math.log2((arr.length - 1) + 2)) - 1 || 1;

  container = d3.select(`div#${id}`)
                .append("svg")
                .attr("width", width || box.width * 600 * (.8/depth) * .75)
                .attr("height", height || box.height)
  console.log(id, container.attr("width"))
  return container;
}

document.getElementById('array').onsubmit = function(evt) {
  evt.preventDefault();
  d3.select("div#binary-tree").select("svg").remove()
  d3.select("div#array-visual").select("svg").remove()

  if (evt.target.array.value !== '') {
    let arr = evt.target.array.value.trim().split(/\s+|\,+/g).map(function(n) { return parseInt(n)})
    makeHeap(arr, arr.length);
    svgContainer = createContainer("binary-tree", arr);
    arrayContainer = createContainer("array-visual", arr, arr.length * 55, 300);
    start = svgContainer.attr("width") / 2;
    createNodes(arr, start, 50, 35);
    createArray(arr, 0, 30, 50, 50);
  }
}

let testArr = [3,4,2,9,8,7,12];
makeHeap(testArr, testArr.length);

var svgContainer = createContainer("binary-tree", testArr)
var arrayContainer = createContainer("array-visual", testArr, testArr.length * 55, 300);
let start = svgContainer.attr("width") / 2;

var nodes = createNodes(testArr, start, 50, 35);
var elements = createArray(testArr, 0, 30, 50, 50);
