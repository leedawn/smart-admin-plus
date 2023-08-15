/**
 * @name 转数组
 */
type Nullable<T> = T | null | undefined;
type Arrayable<T> = T | T[];

export function ensureArray<T>(input?: Nullable<Arrayable<T>>): T[] {
  input = input ?? [];
  return Array.isArray(input) ? input : [input];
}

/**
 * @name  数组扁平化
 */
type NestedArray<T> = T[] | T;

export function flatter<T = number>(arr: NestedArray<NestedArray<T>>): T[] {
  return (arr as T[]).reduce((prev: T[], cur: NestedArray<T>) => (Array.isArray(cur) ? [...prev, ...flatter(cur)] : [...prev, cur]), []);
}

/**
 * @name 列表和树形结构相互转换
 */
interface Content {
  id: number;
  parentId: number;
  children?: Content[];
  [propName: string]: unknown;
}

export function listToTree(list: Content[]) {
  let map: Record<string, Content> = {};
  list.forEach((l) => (map[l.id] = l));
  let res: Content[] = [];
  list.forEach((l) => {
    const parent = map[l.parentId];
    if (!parent) {
      res.push(l);
    } else {
      parent.children = parent.children || [];
      parent.children.push(l);
    }
  });
  return res;
}

export function treeToList(list: Content[]) {
  const res: Content[] = [];
  function dfs(list: Content[]) {
    list.forEach((l) => {
      if (l.children) {
        dfs(l.children);
        delete l.children;
      }
      res.unshift(l);
    });
  }
  dfs(list);
  return res;
}
