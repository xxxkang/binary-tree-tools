var svgContainer = d3.select("body")
                      .append("svg")
                        .attr("width", 1600)
                        .attr("height", 1600);

let start = svgContainer.attr("width") / 2;

document.getElementById('array').onsubmit = function(evt) {
  evt.preventDefault();
  let arr = evt.target.array.value.trim().split(/\s+/g);
  // console.log(arr);
  newArr = arr.map(function(n) { return parseInt(n)})
  makeHeap(newArr, newArr.length);
  console.log('after heapify', newArr);
  createNodes(newArr, start, 50, 40);


}

function createNodes(arr, cx, cy, radius) {
  let rows = 1;
  let inc = 1;

  var nodeData = [];
  nodeData.push({ "cx": cx, "cy": cy, "radius": radius, "color": "blue", "value": arr[0]})
  let i = 1;


  while (i < arr.length) {
    // if (Math.log2(i + 1) % 1 === 0 && i > 0) {
    //   rows++;
    //   inc /= 2;
    //   cy+= 50;
    // }
    console.log(nodeData);
    // let node = { "cx": cx, "cy": cy, "radius": radius, "color": "blue", "value": arr[i] }
    if (i == leftChild(parent(i))) {
      if (parent(i) == 0) {
        node = { "cx": nodeData[parent(i)].cx - 1 * 100, "cy": nodeData[parent(i)].cy + 1 * 100, "radius": radius, "color": "blue", "value": arr[i] }
      }
      else {
        node = { "cx": nodeData[parent(i)].cx - parent(i) * 100, "cy": nodeData[parent(i)].cy + parent(i) * 100, "radius": radius, "color": "blue", "value": arr[i] }
      }
    }
    else if (i == rightChild(parent(i))) {
      if (parent(i) == 0) {
        node = { "cx": nodeData[parent(i)].cx + 1 * 100, "cy": nodeData[parent(i)].cy + 1 * 100, "radius": radius, "color": "blue", "value": arr[i] }
      }
      else {
        node = { "cx": nodeData[parent(i)].cx + parent(i) * 100, "cy": nodeData[parent(i)].cy + parent(i) * 100, "radius": radius, "color": "blue", "value": arr[i] }
      }
    }
    nodeData.push(node);
    ++i;
  }

  // var nodeData = arr.map(function(value, i) {
  //   if (Math.log2(i + 1) % 1 === 0 && i > 0) {
  //     rows++;
  //     inc /= 2;
  //     cy+= 50;
  //   }

  //   if (i == left_child(parent[i])) {
  //     node = { "cx": , "cy": cy, "radius": radius, "color": "blue", "value": value }
  //   }

  //   let node;
  //   console.log(i % 2, rows);
  //   if (i % 2 === 0 && i > 0) {
  //     node = { "cx": (start * inc), "cy": cy, "radius": radius, "color": "blue", "value": value }
  //   }
  //   else {
  //     node = { "cx": (start + (i * 10)), "cy": cy, "radius": radius, "color": "blue", "value": value }
  //   }
  //   // cx += 100;
  //   // cy += 50;
  //   return node;
  // })

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

function heapSort(arr) {

  let unsortedArrLength = arr.length;

  while (unsortedArrLength > 1) {
    --unsortedArrLength;
    swap(arr, 0, unsortedArrLength);
    reheapifyDown(arr, unsortedArrLength);
  }

  return arr;
}


