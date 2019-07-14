var regFill = "lightblue";
var highlightFill = "blue";

var regFillText = "black"
var highlightFillText = "white"

let treeContainer;
let arrayContainer;
let start;

const xSpacing = 200;
const ySpacing = 100;
const radius = 20;

class Node {
  constructor(value, index, depth, cx, cy) {
    this.value = value;
    this.index = index;
    this.depth = depth;
    this.radius = radius;
    this.cx = cx;
    this.cy = cy;
    this.left = null;
    this.right = null;
    this.fill = regFill;
    this.highlighted = false;
  }
}

class Tree {
  constructor() {
    this.nodes = [];
    this.data = [];
    this.text = [];
    this.addNode = function (node) {
      this.data.push(node);
      this.text = treeContainer.selectAll("text.circle")
        .data(this.data)
        .enter()
        .append("text")
        .attr("class", "circle")
        .attr("x", d => d.cx - (d.value.toString().length * 4))
        .attr("y", 0)
        .text(d => d.value)
        .transition()
        .duration(100)
        .attr("y", d => d.cy + 5)
        .call(textAttr, regFillText, "sans-serif", "1em");
      this.nodes = treeContainer.selectAll("circle")
        .data(this.data)
        .enter()
        .append("circle");
    };
    this.updateNodes = function () {
      this.nodes = treeContainer.selectAll("circle")
        .data(this.data)
        .enter()
        .append("circle");
    };
    this.swapNodeData = function (a, b) {
      let temp = this.data[a];
      this.data[a] = this.data[b];
      this.data[b] = temp;
    };
    this.findNode = function (index) {
      return this.nodes.filter((d) => d.index === index);
    };
    this.findText = function (index) {
      return this.text.filter((d) => d.index === index);
    };
    this.removeNode = function (index) {
      this.findNode(index).remove();
      this.findText(index).remove();
      this.data = this.data.filter((e, i) => { return i !== index; });
      this.text = this.text.filter((e, i) => { return i !== index; });
      this.nodes = treeContainer.selectAll("circle")
        .data(this.data)
        .exit().remove();
    };
    this.createBinaryTree = function (arr) {
      treeContainer = createContainer("binary-tree", arr);
      start = treeContainer.attr("width") / 2;
      let containerWidth = treeContainer.attr("width");
      let i = 1;
      let queue = [];
      let node = null;
      // Create the first node, the root node, if the arr is non-empty
      if (arr.length > 0) {
        node = new Node(arr[0], 0, 0);
        node.cx = start;
        node.cy = radius;
        this.addNode(node);
        queue.push([node, 0]); // node value, depth
      }
      while (i < arr.length) {
        // let depth = Math.ceil(Math.log2(i + 2)) - 1;
        let next = queue.shift();
        let curNode = next[0];
        let curDepth = next[1];
        let leftValue = arr[i];
        let rightValue = arr[i + 1];
        // Left
        if (isNaN(leftValue)) {
          curNode.left = null;
        }
        else {
          node = new Node(leftValue, i, curDepth + 1);
          curNode.left = node;
          // node coordinates
          node.cx = curNode.cx - containerWidth / Math.pow(2, curDepth+2);
          node.cy = curNode.cy + ySpacing;
          // add a line from its parent to the node
          treeContainer.append("line").call(createLineAttr, "black", curNode.cx, curNode.cy, node.cx, node.cy);
          this.addNode(node);
          // append to the queue of nodes
          queue.push([node, curDepth + 1]);
        }
        // Right
        if (isNaN(rightValue)) {
          curNode.right = null;
        }
        else {
          node = new Node(rightValue, i + 1, curDepth + 1);
          curNode.right = node;
          // node coordinates
          node.cx = curNode.cx + containerWidth / Math.pow(2, curDepth+2);
          node.cy = curNode.cy + ySpacing;
          // add a line from its parent to the node
          treeContainer.append("line").call(createLineAttr, "black", curNode.cx, curNode.cy, node.cx, node.cy);
          this.addNode(node);
          // append to the queue of nodes
          queue.push([node, curDepth + 1]);
        }
        // Get two nodes at each loop
        i += 2;
      }
      this.nodes = treeContainer
        .selectAll("circle")
        .raise()
        .on("click", addHighlight);
      this.text = treeContainer
        .selectAll("text.circle")
        .raise()
        .on("click", addHighlight);
      this.nodes.call(circleAttr);
    };
    this.createBinarySearchTree = function (inputArr) {
      treeContainer = createContainer("binary-tree", inputArr);
      start = treeContainer.attr("width") / 2;
      let midPoint = Math.floor(inputArr.length / 2);
      let root = new Node(inputArr[midPoint], null, 1, start, radius);
      const insertNode = (arr, depth, cx) => {
        if (!arr.length) {
          return;
        }
        let mid = Math.floor(arr.length / 2);
        let node = new Node(arr[mid], null, depth, cx, radius + (depth * ySpacing));
        let nextDepth = depth + 1;
        node.left = insertNode(arr.slice(0, mid), nextDepth, cx - xSpacing / nextDepth);
        node.right = insertNode(arr.slice(mid + 1), nextDepth, cx + xSpacing / nextDepth);
        if (arr.slice(0, mid).length) {
          treeContainer.append("line").call(createLineAttr, "black", cx, radius + (depth * ySpacing), cx - xSpacing / nextDepth, radius + nextDepth * ySpacing);
        }
        if (arr.slice(mid + 1).length) {
          treeContainer.append("line").call(createLineAttr, "black", cx, radius + (depth * ySpacing), cx + xSpacing / nextDepth, radius + nextDepth * ySpacing);
        }
        this.addNode(node);
      };
      root.left = insertNode(inputArr.slice(0, midPoint), 1, start - xSpacing);
      root.right = insertNode(inputArr.slice(midPoint + 1), 1, start + xSpacing);
      if (inputArr.slice(0, midPoint).length) {
        treeContainer.append("line").call(createLineAttr, "black", start, radius, start - xSpacing, radius + ySpacing);
      }
      if (inputArr.slice(midPoint + 1).length) {
        treeContainer.append("line").call(createLineAttr, "black", start, radius, start + xSpacing, radius + ySpacing);
      }
      this.addNode(root);
      this.nodes = treeContainer
        .selectAll("circle")
        .raise();
      this.text = treeContainer
        .selectAll("text.circle")
        .raise();
      this.nodes.call(circleAttr);
    };
    this.size = function () {
      return d3.selectAll("circle").nodes().length;
    };
  }
}

function createArray(arr, x, y, width, height) {
  var arrayData = arr.map((value, i) => {
    if (i > 0) {
      x += 50
    }
    return {
      x: x,
      y: y,
      width: width,
      height: height,
      color: regFill,
      value: value
    }
  })

  var elementsArr = arrayContainer.selectAll("rect")
    .data(arrayData)
    .enter()
    .append("rect")
    .on("click", addHighlight);

  d3.select("#array-visual").attr("align","center")

  elementsArr.attr("x", d => d.x)
              .attr("y", d => d.y)
              .attr("width", d => d.width)
              .attr("height", d => d.height)
              .attr("fill", d => d.color)
              .attr("stroke", "black")

  arrayContainer.selectAll("text.rect")
    .data(arrayData)
    .enter()
    .append("text")
    .attr("class", "rect")
    .on("click", addHighlight)
    .attr("x", d => d.x + (d.width / 2) - (d.value.toString().length*4))
    .attr("y", d => d.y + 30)
    .text(d => d.value)
    .call(textAttr, regFillText, "sans-serif", "1em")

  arrayContainer.selectAll("text.index")
    .data(arrayData)
    .enter()
    .append("text")
    .attr("class", "index")
    .text((d, i) => `[ ${i} ]`)
    .attr("x", d => d.x + 15)
    .attr("y", d => d.y - 15)
    .call(textAttr, regFillText, "sans-serif", "15px")

  return arrayData;
}

function circleAttr(selection) {
  selection
    .attr("cx", function(c) { return c.cx })
    .attr("cy", 0)
    .attr("r", function(c) { return c.radius })
    .attr("fill", function(c) { return c.fill })
    .transition()
    .duration(100)
    .attr("cy", function(c) { return c.cy })
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
  .attr("y1", 0)
  .attr("x2", x2)
  .attr("y2", 0)
  .transition()
  .duration(100)
  .attr("y1", y1)
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

function calcDimensions(arr) {
  let maxDepth = arr.length / 2;
  return { width: arr.length,
    height: ySpacing + ySpacing * maxDepth,
    depth: maxDepth,
  };
}

function createContainer(id, arr, width, height) {
  let box = calcDimensions(arr);

  let depth = box.depth || 1;

  let container = d3.select(`div#${id}`)
    .append('svg')
    .attr('width', width || box.width * 80)
    .attr('height', height || box.height)

  return container;
}
