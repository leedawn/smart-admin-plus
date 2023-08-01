import { BinaryTree } from "../src/data-structure/binary-tree";

test("base", () => {
  let root = [3, 9, 20, null, null, 15, 7];
  const tree = new BinaryTree();
  root.map((r) => tree.insert(r));
  console.log(tree);
  expect(tree).not.toEqual(null);
});

test("allPath", () => {
  let root = [1, 2, 3, null, 5];
  const tree = new BinaryTree();
  root.map((r) => tree.insert(r));

  function binaryTreePaths(root: any): string[] {
    let paths: string[] = [];
    function getPath(node: any, path: string[]) {
      if (!node) return;
      path.push(node.val);
      if (!node.left && !node.right) {
        paths.push(path.join("->"));
      }
      if (node.left) {
        getPath(node.left, path);
        path.pop();
      }
      if (node.right) {
        getPath(node.right, path);
        path.pop();
      }
    }
    getPath(root, []);
    return paths;
  }
  expect(binaryTreePaths(tree.root)).toEqual(["1->2"]);
});
