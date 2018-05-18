function createNodes(arr, cx, cy, radius) {
  let xSpacing = 300;
  let ySpacing = 100;
  let nodeData = [];
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
    }
    else if (i == rightChild(parent(i))) {
        node = {
          "cx": nodeData[parent(i)].cx + xSpacing * ((.8/row) * .85 ),
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
    .attr("cy", function(c) { return c.cy })
    .attr("cx", function(c) { return c.cx })
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
    .attr("cx", function(d) { return d.cx })
    .attr("cy", function(d) { return d.cy })

  d3.selectAll("text")
    .transition()
    .attr("x", function(d) { return d.cx - 10 })
    .attr("y", function(d) { return d.cy + 5 })

    console.log('after adding nodes', nodeData);

    document.getElementById('sort').addEventListener("click", function() {
      nodeHeapSort(nodeData);
    })

    return nodeData;
}

function nodeHeapSort(arr) {
  let counter = 0;
  let unsortedArrLength = arr.length;

  while (unsortedArrLength > 5) {
    --unsortedArrLength;

    counter = nodeTransition(true, arr, unsortedArrLength, 0, counter);

    console.log('counter in nodeHeapSort', counter);

    console.log('text', svgContainer.selectAll("text").data())

    console.log('reheapified', svgContainer.selectAll("circle").data());
  }
};

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
      console.log('counter in reheapify', counter)
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
  console.log('circA', a, circA.data()[0], 'circB', b, circB.data()[0])
  // console.log()

  console.log('delay of transition', it);
  let tempA = Object.assign({"cx": circA.data()[0].cx, "cy": circA.data()[0].cy, "value": circA.data()[0].value});
  let tempB = Object.assign({"cx": circB.data()[0].cx, "cy": circB.data()[0].cy, "value": circB.data()[0].value});

  circA.transition()
    .attr("fill", "lightblue")
    .transition()
    .duration(1000)
    .delay(it * 1000)
    .attr("value", function(d) { return tempB.value})
    .attr("cx", function(d) { return tempB.cx })
    .attr("cy", function(d) {return tempB.cy })
    .transition()
    .duration(10)
    .attr("fill", "blue")


  // textA.transition()
  //   .attr("fill", "black")
  //   .transition()
  //   .duration(1000)
  //   .delay(it * 1000)
  //   .attr("x", tempB.cx - 10)
  //   .attr("y", tempB.cy + 5)
  //   .transition()
  //   .duration(10)
  //   .attr("fill", "white")

  // if (isLastNode) {
  //   console.log('is last node')
  //   circB.transition()
  //     .attr("fill", "lightblue")
  //     .transition()
  //     .duration(1000)
  //     .delay(function(d, i) { return it * 1000})
  //     .attr("value", function(d) { return tempA.value})
  //     .attr("cx", function(d) { return tempA.cx })
  //     .attr("cy", function(d) {return tempA.cy })
  //     .transition()
  //     .duration(10)
  //     .attr("fill", "blue")

      // circB.transition()
      //   .attr("fill", "lightblue")
      //   .transition()
      //   .duration(1500)
      //   .delay(function(d, i) { return it * 1000})
      //   .attr("value", function(d) { return tempA.value})
      //   .attr("cx", function(d) { return tempA.cx })
      //   .attr("cy", function(d) {return tempA.cy })
      //   .transition()
      //   .attr("fill", "blue")

    // textB.transition()
    //   .attr("fill", "black")
    //   .transition()
    //   .duration(1000)
    //   .delay(function(d,i) { return it * 1000})
    //   .text(function(d) { return tempA.value })
    //   .attr("x", tempA.cx - 10)
    //   .attr("y", tempA.cy + 5)
    //   .transition()
    //   .duration(10)
    //   .attr("fill", "white")
      // .transition()
      // .remove();

    // let arrData = svgContainer.selectAll("circle").data();

    // arrData = arrData.slice(0, arrData.length - 1);
    // svgContainer.selectAll("circle").data(arrData).exit().remove();
  // }

  // else {
    console.log('isnt last node');
    circB.transition()
      .attr("fill", "lightblue")
      .transition()
      .duration(1000)
      .delay(it * 1000)
      .attr("value", function(d) { return tempA.value})
      .attr("cx", function(d) { return tempA.cx })
      .attr("cy", function(d) {return tempA.cy })
      .transition()
      .attr("fill", "blue")

    // textB.transition()
    // .attr("fill", "black")
    // .transition()
    // .duration(1000)
    // .delay(it * 1000)
    // .text(function(d) { return tempA.value })
    // .attr("x", tempA.cx - 10)
    // .attr("y", tempA.cy + 5)
    // .transition()
    // .attr("fill", "white")
  // }
  it +=2;
  return it;
  // svgContainer.selectAll("circle").data(arr);
  // console.log(svgContainer.selectAll("circle").data())
}
