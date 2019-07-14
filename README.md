# Binary Tree Visualization

An interactive tool to view an array as a binary tree, arrange it into a heap, or create a binary search tree.

## Fun Story

I was having a discussion with my friends after a weekly contest on LeetCode and had an argument on the validity of a test case for [this problem](https://leetcode.com/problems/insufficient-nodes-in-root-to-leaf-paths/ "1080. Insufficient Nodes in Root to Leaf Paths"). It turned out that there were [some issues](https://leetcode.com/problems/insufficient-nodes-in-root-to-leaf-paths/discuss/308787/ANNOUNCEMENT-Weekly-Contest-140-has-been-declared-as-*unrated*) with the judge's algorithm and they later fixed it after the contest was over. But we were frustrated during our discussion that there were no handy tools to quickly help us visualize a binary tree serialized in the way that LeetCode did to help us to spot the problem or debug our program. Then I found this nice little app made by @anacsanchez. However, her implementation did not support the way that LeetCode serializes binary trees, so I made some modifications and created this. Hope this could be useful to someone out there.

## Link

https://xxxkang.github.io/binary-tree-tools/

## Acknowledgement
- This app was based on: https://anacsanchez.github.io/Binary-Tree-Visualization/
- This app was built with [D3.js](https://github.com/d3/d3)
