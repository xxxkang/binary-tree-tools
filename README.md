# Binary Tree Visualization

An interactive tool to visually display a binary tree represented by a serialized array.

## Link

https://xxxkang.github.io/binary-tree-tools/

## Usage

The tool converts a input string representing a binary tree in to a visual representation of the tree. The serialization `[1,2,3,4,null,6,7]` would look like the following:

```python
     1
    / \
   2   3
  /   / \
 4   6   7
```

Note that the non-numeric element will be interpreted as a missing child node.

## Fun Story

I was having a discussion with my friends after a weekly contest on LeetCode and had an argument on the validity of a test case for [this problem](https://leetcode.com/problems/insufficient-nodes-in-root-to-leaf-paths/ "1080. Insufficient Nodes in Root to Leaf Paths"). It turned out that there were [some issues](https://leetcode.com/problems/insufficient-nodes-in-root-to-leaf-paths/discuss/308787/ANNOUNCEMENT-Weekly-Contest-140-has-been-declared-as-*unrated*) with the judge's algorithm and they later fixed it after the contest was over. But we were frustrated during our discussion that there were no handy tools to quickly help us visualize a binary tree serialized in the way that LeetCode did to help us to spot the problem or debug our program. Then I found this nice little app made by @anacsanchez. However, her implementation did not support the way that LeetCode serializes binary trees, so I made some modifications and created this. Hope this could be useful to someone out there.

## Technologies

[Bootstrap](https://getbootstrap.com/), [D3.js](https://d3js.org/), [jQuery](https://jquery.com/)

## Acknowledgement

This app was based on: https://anacsanchez.github.io/Binary-Tree-Visualization/
