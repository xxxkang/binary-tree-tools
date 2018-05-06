var svgContainer = d3.select("body")
                      .append("svg")
                        .attr("width", 1600)
                        .attr("height", 1600);

let start = svgContainer.attr("width") / 2;

document.getElementById('array').onsubmit = function(evt) {
  evt.preventDefault();
  let arr = evt.target.array.value.trim().split(/\s+/g);
  newArr = arr.map(function(n) { return parseInt(n)})
  makeHeap(newArr, newArr.length);
  console.log('after heapify', newArr);
  createNodes(newArr, start, 50, 40);
}

function createNodes(arr, cx, cy, radius) {
  let xSpacing = 300;
  let ySpacing = 100;
  var nodeData = [];
  nodeData.push({ "cx": cx, "cy": cy, "radius": radius, "color": "blue", "value": arr[0]})
  let i = 1;

  while (i < arr.length) {

    let row = Math.ceil(Math.log2(i + 2)) - 1;
    console.log('i', i, 'row', row, 'parent', parent(i), 'value', arr[i], nodeData);

    if (i == leftChild(parent(i))) {
        node = {
          "cx": nodeData[parent(i)].cx - xSpacing * (1/row),
          "cy": nodeData[parent(i)].cy + ySpacing,
          "radius": radius,
          "color": "blue",
          "value": arr[i]
        }
    }
    else if (i == rightChild(parent(i))) {
        node = {
          "cx": nodeData[parent(i)].cx + xSpacing * (1/row),
          "cy": nodeData[parent(i)].cy + ySpacing,
          "radius": radius,
          "color": "blue",
          "value": arr[i]
        }
    }
    nodeData.push(node);
    ++i;
  }

  var nodes = svgContainer.selectAll("circle")
                            .data(nodeData)
                            .enter()
                            .append("circle");

  var nodeAttributes = nodes
                        .attr("cy", function(c) { return c.cy - 5 })
                        .attr("cx", function(c) { return c.cx + 8 })
                        .attr("r", function(c) { return c.radius })
                        .attr("fill", function(c) { return c.color });

  var text = svgContainer.selectAll("text")
                          .data(nodeData)
                          .enter()
                          .append("text");

  var values = text
                .attr("x", function(d) { return d.cx} )
                .attr("y", function(d) { return d.cy })
                .text(function (d) { return d.value })
                .attr("fill", "white")
                .attr("font-family", "sans-serif")
                .attr("font-size", "15px");

  d3.selectAll("circle")
    .transition()
      .attr("cx", function(d) { return d.cx + 20 })
      .attr("cy", function(d) { return d.cy + 20 })

  d3.selectAll("text")
    .transition()
      .attr("x", function(d) { return d.cx + 10 })
      .attr("y", function(d) { return d.cy + 25 })
}

console.log(svgContainer.selectAll("circle").data())

//For Testing
let testArr = [3,4,2,9,8,7,12, 6, 13, 25, 86, 56, 64, 10, 11, 13, 45, 67, 34, 23, 16, 99];
makeHeap(testArr, testArr.length);
createNodes(testArr, start, 50, 30);
