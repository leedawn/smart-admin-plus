import { ensureArray, flatter, listToTree, treeToList } from "../src/array";

test("ensureArray", function () {
  expect(ensureArray(null)).toEqual([]);
  expect(ensureArray("2")).toEqual(["2"]);
});

test("flatter", function () {
  expect(flatter([1, 2, [1, [2, 3, [4, 5, [6]]]]])).toEqual([1, 2, 1, 2, 3, 4, 5, 6]);
});

test("listToTree", () => {
  const list = [
    {
      id: 1,
      text: "节点1",
      parentId: 0,
    },
    {
      id: 2,
      text: "节点1_1",
      parentId: 1,
    },
  ];

  const tree = [
    {
      id: 1,
      text: "节点1",
      parentId: 0,
      children: [
        {
          id: 2,
          text: "节点1_1",
          parentId: 1,
        },
      ],
    },
  ];
  expect(listToTree(list)).toEqual(tree);
});

test("treeToList", () => {
  const list = [
    {
      id: 1,
      text: "节点1",
      parentId: 0,
    },
    {
      id: 2,
      text: "节点1_1",
      parentId: 1,
    },
  ];

  const tree = [
    {
      id: 1,
      text: "节点1",
      parentId: 0,
      children: [
        {
          id: 2,
          text: "节点1_1",
          parentId: 1,
        },
      ],
    },
  ];
  expect(treeToList(tree)).toEqual(list);
});
