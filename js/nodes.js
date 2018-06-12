var regFill = "lightblue";
var highlightFill = "blue";

var regFillText = "black"
var highlightFillText = "white"

function circleAttr(selection) {
  selection
    .attr("cy", function(c) { return c.cy })
    .attr("cx", function(c) { return c.cx })
    .attr("r", function(c) { return c.radius })
    .attr("fill", function(c) { return c.color });
}

function textAttr(selection, fill, fontFamily, fontSize) {
  selection
    .attr("fill", fill)
    .attr("font-family", fontFamily)
    .attr("font-size", fontSize);
}

function createLineAttr(selection, stroke, x1, y1, x2, y2) {
  selection
    .style("stroke", stroke)
    .attr("x1", x1)
    .attr("y1", y1)
    .attr("x2", x2)
    .attr("y2", y2)
}

function addHighlight(data, index) {
  removeHighlight();
  function indexMatch(d, i) {return i == index ? this : null};

  d3.selectAll("circle").select(indexMatch).attr("fill", highlightFill);
  d3.selectAll("rect").select(indexMatch).attr("fill", highlightFill);
  d3.selectAll("text.circle").select(indexMatch).attr("fill", highlightFillText);
  d3.selectAll("text.rect").select(indexMatch).attr("fill", highlightFillText);
}

function removeHighlight() {
  d3.selectAll("circle").attr("fill", regFill)
  d3.selectAll("rect").attr("fill", regFill)
  d3.selectAll("text.circle").attr("fill", regFillText)
  d3.selectAll("text.rect").attr("fill", regFillText);
}

function createNodes(arr, cx, cy, radius) {
  let xSpacing = 300;
  let ySpacing = 100;

  //initialize array of circle nodes with root node
  let nodeData = [{ "cx": cx, "cy": cy, "radius": radius, "color": regFill, "value": arr[0]}];

  let i = 1;
  while (i < arr.length) {

    let row = Math.ceil(Math.log2(i + 2)) - 1;

    if (i == leftChild(parent(i))) {
        node = {
          "cx": nodeData[parent(i)].cx - xSpacing * ((.8/row) * .85 ),
          "cy": nodeData[parent(i)].cy + ySpacing,
          "radius": radius,
          "color": regFill,
          "value": arr[i]
        }
        svgContainer.append("line").call(createLineAttr, "black", nodeData[parent(i)].cx, nodeData[parent(i)].cy, node.cx, node.cy);
    }
    else if (i == rightChild(parent(i))) {
        node = {
          "cx": nodeData[parent(i)].cx + xSpacing * ((.8/row) * .85 ),
          "cy": nodeData[parent(i)].cy + ySpacing,
          "radius": radius,
          "color": regFill,
          "value": arr[i]
        }
        svgContainer.append("line").call(createLineAttr, "black", nodeData[parent(i)].cx, nodeData[parent(i)].cy, node.cx, node.cy);
    }
    nodeData.push(node);
    ++i;
  }

  var nodes = svgContainer.selectAll("circle")
                            .data(nodeData)
                            .enter()
                            .append("circle")
                            .on("click", addHighlight);

  var nodeAttributes = nodes.call(circleAttr);

  var texts = svgContainer.selectAll("text.circle")
                            .data(nodeData)
                            .enter()
                            .append("text")
                            .attr("class", "circle")
                            .on("click", addHighlight);

  var values = texts
                .attr("x", function(d) { return d.cx} )
                .attr("y", function(d) { return d.cy })
                .text(function (d) { return d.value })
                .call(textAttr, regFillText, "sans-serif", "15px")

  d3.selectAll("circle").transition()
                          .attr("cx", function(d) { return d.cx })
                          .attr("cy", function(d) { return d.cy })

  d3.selectAll("text").transition()
                        .attr("x", function(d) { return d.cx - 10 })
                        .attr("y", function(d) { return d.cy + 5 })

  return nodeData;
}

function createArray(arr, x, y, width, height) {

  var arrayData = arr.map((value, i) => {
    if (i > 0) { x += 50 }
    return { x: x, y: y, width: width, height: height, color: regFill, value: value}
  })

  var elementsArr = arrayContainer.selectAll("rect")
                                    .data(arrayData)
                                    .enter()
                                    .append("rect")
                                    .on("click", addHighlight);

  var elementAttributes = elementsArr
                            .attr("x", function(r) { return r.x })
                            .attr("y", function(r) { return r.y })
                            .attr("width", function(r) { return r.width })
                            .attr("height", function(r) { return r.height })
                            .attr("fill", function(r) { return r.color })
                            .attr("stroke", "white")

  var arrTextValues = arrayContainer.selectAll("text.rect")
                        .data(arrayData)
                        .enter()
                        .append("text")
                        .attr("class", "rect")
                        .attr("x", function(d) { return d.x + d.width/ 3} )
                        .attr("y", function(d) { return d.y + 30 })
                        .text(function (d) { return d.value })
                        .call(textAttr, regFillText, "sans-serif", "15px")

  var arrTextIndices = arrayContainer.selectAll("text.index")
                        .data(arrayData)
                        .enter()
                        .append("text")
                        .attr("class", "index")
                        .text(function(d, i) { return `[ ${i} ]` })
                        .attr("x", function(d) { return d.x + 15 })
                        .attr("y", function(d) { return d.y - 15 })
                        .call(textAttr, regFillText, "sans-serif", "15px")

  return arrayData;
}
