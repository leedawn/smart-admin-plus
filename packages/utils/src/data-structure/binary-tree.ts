export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
export class BinaryTree {
  root: TreeNode | null;
  constructor() {
    this.root = null;
  }
  insert(val: number | null) {
    if (val) {
      const node = new TreeNode(val);
      if (!this.root) {
        this.root = node;
      } else {
        this.insertNode(this.root, node);
      }
    }
  }
  insertNode(root: TreeNode, newNode: TreeNode) {
    if (root.val > newNode.val) {
      root.left ? this.insertNode(root.left, newNode) : (root.left = newNode);
    } else {
      root.right ? this.insertNode(root.right, newNode) : (root.right = newNode);
    }
  }
}
