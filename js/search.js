function Node(val, depth, cx, cy, radius, color) {
  return {
    value: val,
    left: null,
    right: null,
    depth: depth,
    cx: cx,
    cy: cy,
    radius: radius,
    color: color
  }
}

function createBSTNodes(inputValues) {
  let midPoint = Math.floor(inputValues.length / 2);
  let xSpacing = 300;
  let ySpacing = 100;
  let root = new Node(inputValues[midPoint], 1, xSpacing, ySpacing, 50, regFill);
  let nodes = [];

  function insertNode(arr, depth, cx) {
    if (!arr.length) { return; }
    let mid = Math.floor(arr.length / 2);
    let node = new Node(arr[mid], depth, cx, depth * ySpacing, 50, regFill);

    node.left = insertNode(arr.slice(0, mid), depth + 1, cx - 100);
    node.right = insertNode(arr.slice(mid + 1), depth + 1, cx + 100);

    nodes.push(node)
    return node;
  }

  root.left = insertNode(inputValues.slice(0, midPoint), 2, xSpacing - 100);
  root.right = insertNode(inputValues.slice(midPoint + 1), 2, xSpacing + 100);
  nodes.push(root);

  svgContainer = d3.select(`div#binary-tree`)
      .append("svg")
      .attr("width", 600)
      .attr("height", 500)


  let bstNodes = svgContainer.selectAll("circle")
              .data(nodes)
              .enter()
              .append("circle")



  bstNodes.call(circleAttr);


  let texts = svgContainer.selectAll("text.circle")
  .data(nodes)
  .enter()
  .append("text")
  .attr("class", "circle")
  .on("click", addHighlight);

  texts.attr("x", function(d) { return d.cx} )
  .attr("y", function(d) { return d.cy })
  .text(function (d) { return d.value })
  .call(textAttr, regFillText, "sans-serif", "15px")
}

