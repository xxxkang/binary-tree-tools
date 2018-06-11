var svgContainer = d3.select("body")
                      .append("div")
                      .classed("svg-container", true)
                      .append("svg")
                        .attr("preserveAspectRatio", "xMinYMin meet")
                        .attr("viewBox", "0 0 600 400")
                        .classed("svg-content-responsive", true)

var arrayContainer = d3.select("body")
                      .append("svg")
                      .attr("width", 0)
                      .attr("height", 0);

// let start = svgContainer.attr("width") / 2;
let start = document.getElementsByClassName("svg-container")[0].offsetWidth / 2;

console.log('svgContainer width', document.getElementsByClassName("svg-container")[0].offsetWidth);
// console.log(svgContainer.attr('width'))

document.getElementById('array').onsubmit = function(evt) {
  svgContainer.selectAll("circle").remove();
  d3.selectAll("text.circle", "text.value").remove();
  svgContainer.selectAll("line").remove();
  arrayContainer.selectAll("rect").remove();
  arrayContainer.selectAll("text").remove();

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
var elements = createArray(testArr, 0, 100, 50, 50);

console.log('nodeData in main after creation', nodes)


