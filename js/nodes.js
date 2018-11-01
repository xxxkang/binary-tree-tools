var regFill = "lightblue";
var highlightFill = "blue";

var regFillText = "black"
var highlightFillText = "white"

let heapTree = {};

function Tree() {
  this.nodes = [];
  this.data = [];
  this.text = [];

  this.addNode = function(node) {
    this.data.push(node);
    this.text = treeContainer.selectAll("text.circle")
    .data(this.data)
    .enter()
    .append("text")
    .attr("class", "circle")
    .attr("x", function(d) { return d.cx - (d.radius * .1)} )
    .attr("y", function(d) { return d.cy + 5 })
    .text(function (d) { return d.value })
    .call(textAttr, regFillText, "sans-serif", "15px")
    .on("click", addHighlight)

    this.nodes = treeContainer.selectAll("circle")
                .data(this.data)
                .enter()
                .append("circle")
  }

  this.updateNodes = function() {
    this.nodes = treeContainer.selectAll("circle")
    .data(this.data)
    .enter()
    .append("circle")
  }

  this.swapNodeData = function(a, b) {
    let temp = this.data[a];
    this.data[a] = this.data[b];
    this.data[b] = temp;
  }

  this.findNode = function(index) {
    return this.nodes.filter((d) => d.index === index)
  }

  this.findText = function(index) {
    return this.text.filter((d) => d.index === index)
  }

  this.removeNode = function(index) {
    this.findNode(index).remove();
    this.findText(index).remove();

    this.data = this.data.filter((e, i) => { return i !== index})
    this.text = this.text.filter((e, i) => { return i !== index})

    this.nodes = treeContainer.selectAll("circle")
            .data(this.data)
            .exit().remove()
  }


  this.createBinaryTree = function(arr, start, radius, xSpacing, ySpacing) {
    let i = 0;
    let node = {};

    while (i < arr.length) {
      let depth = Math.ceil(Math.log2(i + 2)) - 1;
      node = new Node(arr[i], i, depth, radius);
      if (i === 0) {
        node.cx = start;
        node.cy = 50;
      }
      else {
        if (i == leftChild(parent(i))) {
          node.cx = this.data[parent(i)].cx - xSpacing/depth;
        }
        else {
          node.cx = this.data[parent(i)].cx + xSpacing/depth;
        }
        node.cy = this.data[parent(i)].cy + ySpacing;
        treeContainer.append("line").call(createLineAttr, "black", this.data[parent(i)].cx, this.data[parent(i)].cy, node.cx, node.cy);
      }
      this.addNode(node);
      ++i;
    }
    this.nodes = treeContainer
                  .selectAll("circle")
                  .raise()
                  .on("click", addHighlight)
    this.text = treeContainer
                .selectAll("text.circle")
                .raise()
  }

  this.size = function() {
    return d3.selectAll("circle").nodes().length;
  }

}

function createNodes(arr, start) {
  let tree = new Tree();
  tree.createBinaryTree(arr, start, 35, 200, 100, 35)
  tree.nodes.call(circleAttr);
  heapTree = tree;
}

function Node(value, index, depth, radius = 50, cx, cy) {
  this.value = value;
  this.index = index;
  this.depth = depth;
  this.radius = radius;
  this.cx = cx;
  this.cy = cy;
  this.fill = regFill;
  this.highlighted = false;
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

  elementsArr.attr("x", function (r) {
      return r.x
    })
    .attr("y", function (r) {
      return r.y
    })
    .attr("width", function (r) {
      return r.width
    })
    .attr("height", function (r) {
      return r.height
    })
    .attr("fill", function (r) {
      return r.color
    })
    .attr("stroke", "white")

  arrayContainer.selectAll("text.rect")
    .data(arrayData)
    .enter()
    .append("text")
    .attr("class", "rect")
    .on("click", addHighlight)
    .attr("x", function (d) {
      return d.x + d.width / 3
    })
    .attr("y", function (d) {
      return d.y + 30
    })
    .text(function (d) {
      return d.value
    })
    .call(textAttr, regFillText, "sans-serif", "15px")

  arrayContainer.selectAll("text.index")
    .data(arrayData)
    .enter()
    .append("text")
    .attr("class", "index")
    .text(function (d, i) {
      return `[ ${i} ]`
    })
    .attr("x", function (d) {
      return d.x + 15
    })
    .attr("y", function (d) {
      return d.y - 15
    })
    .call(textAttr, regFillText, "sans-serif", "15px")

  return arrayData;
}

function circleAttr(selection) {
  selection
    .attr("cy", function(c) { return c.cy })
    .attr("cx", function(c) { return c.cx })
    .attr("r", function(c) { return c.radius })
    .attr("fill", function(c) { return c.fill });
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

