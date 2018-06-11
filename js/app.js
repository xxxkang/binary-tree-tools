var svgContainer = d3.select("body")
                      .append("svg")
                        .attr("width", 1200)
                        .attr("height", 400);

var arrayContainer = d3.select("body")
                      .append("svg")
                      .attr("width", 800)
                      .attr("height", 400);

let start = svgContainer.attr("width") / 2;

console.log(svgContainer.attr("width"));

document.getElementById('array').onsubmit = function(evt) {
  svgContainer.selectAll("circle").remove();
  svgContainer.selectAll("text").remove();
  evt.preventDefault();
  if (evt.target.array.value !== '') {
    let arr = evt.target.array.value.trim().split(/\s+|\,+/g).map(function(n) { return parseInt(n)})
    makeHeap(arr, arr.length);
    createNodes(arr, start, 50, 35);
    createArray(arr, 0, 0, 50, 50);
  }
}

//For Testing
// let testArr = [3,4,2,9,8,7,12, 6, 13, 25, 86, 56, 64, 10];
let testArr = [3,4,2,9,8,7,12];
// arr = [3,4,2,9,8,7,12, 6, 13, 25, 86, 56, 64, 10];
makeHeap(testArr, testArr.length);
var nodes = createNodes(testArr, start, 50, 35);
var elements = createArray(testArr, 0, 50, 50, 50);

console.log('nodeData in main after creation', nodes)


