function calculateHeight(arr) {
  let ySpacing = 100;
  let nodeData = [];
  let cy = 100;

  nodeData.push({"cy": cy})
  let i = 1;

  while (i < arr.length) {

    let row = Math.ceil(Math.log2(i + 2)) - 1;

    if (i == leftChild(parent(i))) {
        node = { "cy": nodeData[parent(i)].cy + ySpacing }
    }
    else if (i == rightChild(parent(i))) {
        node = { "cy": nodeData[parent(i)].cy + ySpacing }
    }
    nodeData.push(node);
    ++i;
  }
  console.log(nodeData[arr.length - 1].cy)
  return nodeData[arr.length - 1].cy;
}


let testArr = [3,4,2,9,8,7,12];
makeHeap(testArr, testArr.length);
let height = calculateHeight(testArr);

var svgContainer;
var arrayContainer;

svgContainer = d3.select("div#binary-tree")
                      .append("svg")
                        .attr("width", 1000)
                        .attr("height", height);

arrayContainer = d3.select("div#array-visual")
                      .append("svg")
                      .attr("width", 800)
                      .attr("height", 500);

let start = svgContainer.attr("width") / 2;

// console.log(svgContainer.attr("width"));

document.getElementById('array').onsubmit = function(evt) {
  evt.preventDefault();
  d3.select("div#binary-tree").select("svg").remove()
  d3.select("div#array-visual").select("svg").remove()

  if (evt.target.array.value !== '') {
    let arr = evt.target.array.value.trim().split(/\s+|\,+/g).map(function(n) { return parseInt(n)})
    let height = calculateHeight(arr);
    svgContainer = d3.select("div#binary-tree")
                      .append("svg")
                        .attr("width", 1000)
                        .attr("height", height);
    let width = (arr.length * 55);
    console.log("width", width)
    arrayContainer = d3.select("div#array-visual")
                        .append("svg")
                        .attr("width", width)
                        .attr("height", 500);

    makeHeap(arr, arr.length);
    createNodes(arr, start, 50, 35);
    createArray(arr, 0, 30, 50, 50);
  }
}



//For Testing
// let testArr = [3,4,2,9,8,7,12, 6, 13, 25, 86, 56, 64, 10];
// let testArr = [3,4,2,9,8,7,12];
// makeHeap(testArr, testArr.length);
var nodes = createNodes(testArr, start, 50, 35);
var elements = createArray(testArr, 200, 30, 50, 50);

console.log('nodeData in main after creation', nodes)


