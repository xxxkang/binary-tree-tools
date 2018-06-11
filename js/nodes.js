function removeHighlight() {
  d3.selectAll("circle").attr("fill", "blue")
  d3.selectAll("rect").attr("fill", "blue")
  d3.selectAll("text.circle").attr("fill", "white")
  d3.selectAll("text.value").attr("fill", "white")
}

function addHighlight(data, index) {
  removeHighlight();
  var selectedCircle = d3.selectAll("circle").select(function(d, i) {return i == index ? this : null})
  var selectedElement = d3.selectAll("rect").select(function(d, i) { return i == index ? this : null })
  var selectedCircleText = d3.selectAll("text.circle").select(function(d, i) { return i == index ? this : null })
  var selectedElementText = d3.selectAll("text.value").select(function(d, i) { return i == index ? this : null })

  selectedCircle.attr("fill", "lightblue");
  selectedElement.attr("fill", "lightblue");
  selectedCircleText.attr("fill", "black");
  selectedElementText.attr("fill", "black");
}

function createNodes(arr, cx, cy, radius) {
  let xSpacing = 300;
  let ySpacing = 100;
  let nodeData = [];
  svgContainer.append("h3")
              .text("Heap Binary Tree")
  nodeData.push({ "cx": cx, "cy": cy, "radius": radius, "color": "blue", "value": arr[0]})
  let i = 1;

  while (i < arr.length) {

    let row = Math.ceil(Math.log2(i + 2)) - 1;

    if (i == leftChild(parent(i))) {
        node = {
          "cx": nodeData[parent(i)].cx - xSpacing * ((.8/row) * .85 ),
          "cy": nodeData[parent(i)].cy + ySpacing,
          "radius": radius,
          "color": "blue",
          "value": arr[i]
        }

        svgContainer.append("line")
          .style("stroke", "black")
          .attr("x1", nodeData[parent(i)].cx)
          .attr("y1", nodeData[parent(i)].cy)
          .attr("x2", node.cx)
          .attr("y2", node.cy)
    }
    else if (i == rightChild(parent(i))) {
        node = {
          "cx": nodeData[parent(i)].cx + xSpacing * ((.8/row) * .85 ),
          "cy": nodeData[parent(i)].cy + ySpacing,
          "radius": radius,
          "color": "blue",
          "value": arr[i]
        }
        svgContainer.append("line")
        .style("stroke", "black")
        .attr("x1", nodeData[parent(i)].cx)
        .attr("y1", nodeData[parent(i)].cy)
        .attr("x2", node.cx)
        .attr("y2", node.cy)
    }
    nodeData.push(node);

    ++i;
  }

  var nodes = svgContainer.selectAll("circle")
                            .data(nodeData)
                            .enter()
                            .append("circle")
                            .on("click", addHighlight);

  var nodeAttributes = nodes
                        .attr("cy", function(c) { return c.cy })
                        .attr("cx", function(c) { return c.cx })
                        .attr("r", function(c) { return c.radius })
                        .attr("fill", function(c) { return c.color });

  var texts = svgContainer.selectAll("text.circle")
                            .data(nodeData)
                            .enter()
                            .append("text")
                            .attr("class", "circle");

  var values = texts
                .attr("x", function(d) { return d.cx} )
                .attr("y", function(d) { return d.cy })
                .text(function (d) { return d.value })
                .attr("fill", "white")
                .attr("font-family", "sans-serif")
                .attr("font-size", "15px");

  d3.selectAll("circle").transition()
                          .attr("cx", function(d) { return d.cx })
                          .attr("cy", function(d) { return d.cy })

  d3.selectAll("text").transition()
                        .attr("x", function(d) { return d.cx - 10 })
                        .attr("y", function(d) { return d.cy + 5 })


  document.getElementById('sort').addEventListener("click", function() {
    nodeHeapSort(nodeData);
  })



  return nodeData;
}

function createArray(arr, x, y, width, height) {

  var arrayData = arr.map(value => {
    return { x: x += 50, y: y, width: width, height: height, color: 'blue', value: value}
  })

  var elementsArr = arrayContainer.selectAll("rect")
                                  .data(arrayData)
                                  .enter()
                                  .append("rect");

  var elementAttributes = elementsArr
                          .attr("x", function(r) { return r.x })
                          .attr("y", function(r) { return r.y })
                          .attr("width", function(r) { return r.width })
                          .attr("height", function(r) { return r.height })
                          .attr("fill", function(r) { return r.color })
                          .attr("stroke", "white")

  var arrTextValues = arrayContainer.selectAll("text.value")
                          .data(arrayData)
                          .enter()
                          .append("text")
                          .attr("class", "value")
                          .attr("x", function(d) { return d.x + 15} )
                          .attr("y", function(d) { return d.y + 30 })
                          .text(function (d) { return d.value })
                          .attr("fill", "white")
                          .attr("font-family", "sans-serif")
                          .attr("font-size", "15px");

  var arrTextIndices = arrayContainer.selectAll("text.index")
                              .data(arrayData)
                              .enter()
                              .append("text")
                              .attr("class", "index")
                              .text(function(d, i) { return i})
                              .attr("x", function(d) { return d.x + 15 })
                              .attr("y", function(d) { return d.y - 15 })
                              .attr("fill", "black")
                              .attr("font-family", "sans-serif")
                              .attr("font-size", "15px")

  return arrayData;
}

function reheapifyNodesDown(arr, length, counter) {
  let index = 0;
  let bigChildIndex;
  let isHeap = false;
  //the loop keeps going while the array is not a heap, and while the current element
  //has at least a left child. The test to see whether the current element has a left
  //child is leftChild(index) < length
  while (!isHeap && leftChild(index) < length) {
    if (rightChild(index) >= length) {   //no right child
      bigChildIndex = leftChild(index);
    }
    else if (arr[leftChild(index)].value > arr[rightChild(index)].value) { //if left child is the bigger of the two children
      bigChildIndex = leftChild(index);
    }
    else {  //then right child is bigger
      bigChildIndex = rightChild(index)
    }
    //Check if the larger child is bigger than the current node. If so,
    //then swap the current node with its bigger child and continue; otherwise it's a heap
    if (arr[index].value < arr[bigChildIndex].value) {
      let temp = arr[index].value;
      arr[index].value = arr[bigChildIndex].value;
      arr[bigChildIndex].value = temp;
      // console.log('counter in reheapify', counter)
      nodeTransition(false, arr, index, bigChildIndex, counter);
      counter +=2
      index = bigChildIndex;
    }
    else {
      isHeap = true;
    }
  }
  console.log('in reheapified', arr);
  return counter;
}

function nodeTransition(isLastNode, arr, a, b, it) {
  let circA = svgContainer.selectAll("circle").filter(function(d, i) { return i == a });
  let circB = svgContainer.selectAll("circle").filter(function(d, i) { return i == b });

  let textA = svgContainer.selectAll("text").filter(function(d, i) { return i == a });
  let textB = svgContainer.selectAll("text").filter(function(d, i) { return i == b });

  let tempA = Object.assign({"cx": circA.data()[0].cx, "cy": circA.data()[0].cy, "value": circA.data()[0].value});
  let tempB = Object.assign({"cx": circB.data()[0].cx, "cy": circB.data()[0].cy, "value": circB.data()[0].value});

  // circA.on(stat)

  circA.transition()
    .duration(1000)
    .delay(it * 1000)
    .attr("fill", "lightblue")
    .transition()
    // .attr("value", function(d) { return tempB.value})
    .attr("cx", function(d) { return tempB.cx })
    .attr("cy", function(d) {return tempB.cy })
    .transition()
    // .duration(10)
    .attr("fill", "blue")
    // .transition()
    // .remove();
    // .on("end", function(d) { this.remove() })
    // .remove()

  textA.transition()
    .duration(1000)
    .delay(it * 1000)
    .attr("fill", "black")
    .transition()
    .attr("x", tempB.cx - 10)
    .attr("y", tempB.cy + 5)
    .transition()
    // .duration(10)
    .attr("fill", "white")
    // .transition()
    // .remove();
    // .on("end", function(d) {this.remove()})

    circB.transition()
      .duration(1000)
      .delay(it * 1000)
      .attr("fill", "lightblue")
      .transition()
      // .attr("value", function(d) { return tempA.value})
      .attr("cx", function(d) { return tempA.cx })
      .attr("cy", function(d) {return tempA.cy })
      .transition()
      .attr("fill", "blue")
      .transition()
      .remove();

    textB.transition()
    .duration(1000)
    .delay(it * 1000)
    .attr("fill", "black")
    .transition()
    .text(function(d) { return tempA.value })
    .attr("x", tempA.cx - 10)
    .attr("y", tempA.cy + 5)
    .transition()
    .attr("fill", "white")
    .transition()
    .remove();
  // }
  it +=2;
  return it;
}

function nodeHeapSort(arr) {
  let counter = 0;
  let unsortedArrLength = arr.length;

  while (unsortedArrLength > arr.length - 2) {
    --unsortedArrLength;
    let temp = arr[0].value;
    arr[0].value = arr[unsortedArrLength].value;
    arr[unsortedArrLength].value = temp;

    nodeTransition(true, arr, 0, unsortedArrLength, counter);
    counter +=2;
    console.log('all circles', svgContainer.selectAll("circle").data());
  }
};
