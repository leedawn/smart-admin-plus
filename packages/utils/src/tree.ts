export const get = (obj, fn) => {
  const res = typeof fn === "function" ? fn(obj) : obj[fn];
  return res;
};

export const generateMap = (list, key, value) => {
  const res = list.reduce((acc, item) => {
    acc[item[key]] = get(item, value);
    return acc;
  }, {});
  return res;
};

export const generateTree = (list, { id, pid, children }) => {
  const map = generateMap(list, id, (item) => item);
  const res = [];
  list.forEach((item) => {
    const parentNode = map[item[pid]];
    if (parentNode) {
      parentNode[children] = parentNode[children] || [];
      parentNode[children].push(item);
    } else {
      res.push(item);
    }
  });
  return res;
};

export const mapTree = (list, map, props = { children: "children" }) => {
  const arr = list[props.children];
  return list.map((item) => {
    if (Array.isArray(arr)) {
      return {
        ...map(item),
        [props.children]: mapTree(item, map, props),
      };
    } else {
      return map(item);
    }
  });
};
