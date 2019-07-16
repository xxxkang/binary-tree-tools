// Define colors
var regFill = "#b7d7e8";
var highlightFill = "#8d9db6";

var regFillText = "#3b3a30";
var highlightFillText = "#f0f0f0";

var lineColor = "#3b3a30";

// Define dimensions
const xSpacing = 15; // minimum space between two horizontally adjacent nodes
const minWidth = 400;
const ySpacing = 100;
const radius = 30;

const xArr = 5;
const yArr = 30;
const arrRectSize = 50;

/*
Element of an array.
*/
class ArrayElement {
  constructor(value, index, x, y) {
    this.value = value;
    this.index = index;
    this.x = x;
    this.y = y;
    this.width = arrRectSize;
    this.height = arrRectSize;
    this.color = regFill;
  }
}

/*
Node of a tree.
*/
class Node {
  constructor(value, index, depth, cx, cy) {
    this.value = value;
    this.index = index;
    this.depth = depth;
    this.radius = radius;
    this.cx = cx;
    this.cy = cy;
    this.left = {};
    this.right = {};
    this.fill = regFill;
    this.highlighted = false;
  }
}

/*
Binary tree.
*/
class Tree {
  constructor(arr) {
    this.root = {};
    this.height = 0;
    this.width = 0;
    this.serialization = arr;
    this.deserialize();
  }

  deserialize() {
    let queue = [];
    let node = {};
    // Create the root node if exist
    if (this.serialization.length > 0) {
      if (isNaN(this.serialization[0])) {
        return;
      }
      node = new Node(this.serialization[0], 0, 0);
      this.root = node;
      queue.push([node, 0]); // [node, depth]
    }
    let i = 1;
    while (i < this.serialization.length) {
      // Obtain the next node for processing and update tree height
      let next = queue.shift();
      let [curNode, curDepth] = next;
      this.height = Math.max(this.height, curDepth);
      // Construct left child of current node
      if (isNaN(this.serialization[i])) {
        curNode.left = {};
      } else {
        node = new Node(this.serialization[i], i, curDepth + 1);
        curNode.left = node;
        queue.push([node, curDepth + 1]);
      }
      // Construct right child of current node
      if (isNaN(this.serialization[i + 1])) {
        curNode.right = {};
      } else {
        node = new Node(this.serialization[i + 1], i + 1, curDepth + 1);
        curNode.right = node;
        queue.push([node, curDepth + 1]);
      }
      // Process two nodes in each loop
      i += 2;
    }
    // Calculate the maximum width of the tree
    this.width = Math.pow(2, this.height + 1);
  }

  /*
  Create a visual representation of the array serialization of the tree.
  */
  drawSerialization() {
    let serializationArrayData = [];
    let x = xArr;
    for (let i = 0; i < this.serialization.length; i++) {
      serializationArrayData.push(
        new ArrayElement(this.serialization[i], i, x, yArr)
      );
      x = x + arrRectSize;
    }
    drawArray(serializationArrayData);
  }

  /*
  Create a visual representation of preorder traversal for th tree.
  */
  drawPreorder() {
    let preorderArrayData = [];
    let preorder = [];
    let stack = [];

    if (!jQuery.isEmptyObject(this.root)) {
      stack.push(this.root);
    }

    while (stack.length > 0) {
      let curNode = stack.pop();
      let rightChild = curNode.right;
      let leftChild = curNode.left;
      if (!jQuery.isEmptyObject(rightChild)) {
        stack.push(rightChild);
      }
      if (!jQuery.isEmptyObject(leftChild)) {
        stack.push(leftChild);
      }
      preorder.push(curNode);
    }

    let x = xArr;
    for (let i = 0; i < preorder.length; i++) {
      preorderArrayData.push(
        new ArrayElement(preorder[i].value, preorder[i].index, x, yArr)
      );
      x = x + arrRectSize;
    }
    drawArray(preorderArrayData);
  }

  /*
  Create a visualization of inorder tree traversal.
  */
  drawInorder() {
    let inorderArrayData = [];
    let inorder = [];
    let stack = [];
    let curNode = this.root;
    while (!jQuery.isEmptyObject(curNode) || stack.length > 0) {
      while (!jQuery.isEmptyObject(curNode)) {
        stack.push(curNode);
        curNode = curNode.left;
      }
      curNode = stack.pop();
      inorder.push(curNode);
      curNode = curNode.right;
    }

    let x = xArr;
    for (let i = 0; i < inorder.length; i++) {
      inorderArrayData.push(
        new ArrayElement(inorder[i].value, inorder[i].index, x, yArr)
      );
      x = x + arrRectSize;
    }
    drawArray(inorderArrayData);
  }

  /*
  Create a visualization of postorder tree traversal

  Implement iterative postorder traversal usng two stacks.
  */
  drawPostorder() {
    let postorderArrayData = [];
    let postorder = [];
    let stack1 = [];
    let stack2 = [];
    let curNode = this.root;
    stack1.push(curNode);
    while (stack1.length > 0) {
      curNode = stack1.pop();
      stack2.push(curNode);

      if (!jQuery.isEmptyObject(curNode.left)) stack1.push(curNode.left);
      if (!jQuery.isEmptyObject(curNode.right)) stack1.push(curNode.right);
    }

    while (stack2.length > 0) {
      curNode = stack2.pop();
      postorder.push(curNode);
    }

    let x = xArr;
    for (let i = 0; i < postorder.length; i++) {
      postorderArrayData.push(
        new ArrayElement(postorder[i].value, postorder[i].index, x, yArr)
      );
      x = x + arrRectSize;
    }
    drawArray(postorderArrayData);
  }
}

/*
Create a visual representation of the binary tree.
*/
function drawBinaryTree(tree) {
  let containerWidth = Math.max(minWidth, tree.width * (2 * radius + xSpacing));
  let containerHeight = (tree.height + 2) * ySpacing;
  let treeContainer = createContainer(
    "binary-tree-visual",
    containerWidth,
    containerHeight
  );
  let preorder = [];
  let stack = [];

  if (!jQuery.isEmptyObject(tree.root)) {
    tree.root.cx = containerWidth / 2;
    tree.root.cy = 2 * radius;
    stack.push([tree.root, 0]); // [node, depth]
  }

  while (stack.length > 0) {
    let [curNode, curDepth] = stack.pop();
    let rightChild = curNode.right;
    let leftChild = curNode.left;
    if (!jQuery.isEmptyObject(rightChild)) {
      rightChild.cx = curNode.cx + containerWidth / Math.pow(2, curDepth + 2);
      rightChild.cy = curNode.cy + ySpacing;
      treeContainer
        .append("line")
        .call(
          createLineAttr,
          lineColor,
          curNode.cx,
          curNode.cy,
          rightChild.cx,
          rightChild.cy
        );
      stack.push([rightChild, curDepth + 1]);
    }
    if (!jQuery.isEmptyObject(leftChild)) {
      leftChild.cx = curNode.cx - containerWidth / Math.pow(2, curDepth + 2);
      leftChild.cy = curNode.cy + ySpacing;
      treeContainer
        .append("line")
        .call(
          createLineAttr,
          lineColor,
          curNode.cx,
          curNode.cy,
          leftChild.cx,
          leftChild.cy
        );
      stack.push([leftChild, curDepth + 1]);
    }
    preorder.push(curNode);
  }

  treeContainer
    .selectAll("circle")
    .data(preorder)
    .enter()
    .append("circle")
    .style("stroke", lineColor)
    .call(circleAttr);

  treeContainer
    .selectAll("circle")
    .raise()
    .on("click", addHighlight);

  treeContainer
    .selectAll("text.circle")
    .data(preorder)
    .enter()
    .append("text")
    .attr("class", "circle")
    .text(d => d.value)
    .call(textAttr, regFillText, "sans-serif", "1em")
    .attr("x", function(d) {
      return d.cx - this.getBBox().width / 2;
    })
    .attr("y", 0)
    .transition()
    .duration(100)
    .attr("y", d => d.cy + 5);

  treeContainer
    .selectAll("text.circle")
    .raise()
    .on("click", addHighlight);

  d3.select("#binary-tree-visual").attr("align", "center");
}

/*
Create a visual representation of a list of ArrayElement objects.

Adaptively adjust the horizontal positions of the text elements.
*/
function drawArray(arrayData) {
  let arrayContainer = createContainer(
    "array-visual",
    arrayData.length * arrRectSize + 2*xArr,
    100
  );

  d3.select("#array-visual").attr("align", "center");

  arrayContainer
    .selectAll("rect")
    .data(arrayData)
    .enter()
    .append("rect")
    .on("click", addHighlight)
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .attr("width", d => d.width)
    .attr("height", d => d.height)
    .attr("fill", d => d.color)
    .attr("stroke", lineColor);

  arrayContainer
    .selectAll("text.rect")
    .data(arrayData)
    .enter()
    .append("text")
    .attr("class", "rect")
    .on("click", addHighlight)
    .text(d => d.value)
    .call(textAttr, regFillText, "sans-serif", "1em")
    .attr("x", function(d) {
      return d.x + (arrRectSize - this.getBBox().width) / 2;
    })
    .attr("y", d => d.y + 30);

  arrayContainer
    .selectAll("text.index")
    .data(arrayData)
    .enter()
    .append("text")
    .attr("class", "index")
    .text((d, i) => `[ ${i} ]`)
    .call(textAttr, regFillText, "sans-serif", "15px");

  arrayContainer
    .selectAll("text.index")
    .attr("x", function(d) {
      return d.x + (arrRectSize - this.getBBox().width) / 2;
    })
    .attr("y", d => d.y - 15);
}

function circleAttr(selection) {
  selection
    .attr("cx", function(c) {
      return c.cx;
    })
    .attr("cy", 0)
    .attr("r", function(c) {
      return c.radius;
    })
    .attr("fill", function(c) {
      return c.fill;
    })
    .transition()
    .duration(100)
    .attr("cy", function(c) {
      return c.cy;
    });
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
    .attr("y2", y2);
}

function addHighlight(data) {
  removeHighlight();
  function indexMatch(d) {
    return data.index == d.index ? this : null;
  }

  d3.selectAll("circle")
    .select(indexMatch)
    .attr("fill", highlightFill);
  d3.selectAll("rect")
    .select(indexMatch)
    .attr("fill", highlightFill);
  d3.selectAll("text.circle")
    .select(indexMatch)
    .attr("fill", highlightFillText);
  d3.selectAll("text.rect")
    .select(indexMatch)
    .attr("fill", highlightFillText);
}

function removeHighlight() {
  d3.selectAll("circle").attr("fill", regFill);
  d3.selectAll("rect").attr("fill", regFill);
  d3.selectAll("text.circle").attr("fill", regFillText);
  d3.selectAll("text.rect").attr("fill", regFillText);
}

function createContainer(id, width, height) {
  d3.select(`div#${id}`)
    .selectAll("svg")
    .remove();

  let container = d3
    .select(`div#${id}`)
    .append("svg")
    .attr("width", width)
    .attr("height", height);
  return container;
}
