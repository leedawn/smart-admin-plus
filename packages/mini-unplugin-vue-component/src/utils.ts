import { parse } from "pathe";

function stringifyImport({ from, as = undefined, name = undefined }: ComponentImportOptions) {
  if (!from) return;
  if (as) {
    if (name) {
      return `import {${name} as ${as}} from '${from}'`;
    } else {
      return `import ${as} from '${from}'`;
    }
  } else {
    return `import '${from}'`;
  }
}

type SideEffect = string | (string | BaseOptions)[];

interface BaseOptions {
  from: string;
  name?: string;
  as?: string;
}
export interface ComponentImportOptions extends BaseOptions {
  sideEffect?: SideEffect;
}

export function stringifyComponentImport({ name, as, from, sideEffect }: ComponentImportOptions) {
  const main = [stringifyImport({ from, as, name })];
  let effects: any[] = [];
  if (typeof sideEffect === "string") {
    effects = [stringifyImport({ from: sideEffect })];
  } else if (Array.isArray(sideEffect)) {
    sideEffect.forEach((s) => {
      if (typeof s === "string") {
        effects.push(stringifyImport({ from: s }));
      } else {
        effects.push(stringifyImport(s));
      }
    });
  }
  return `${[...main, ...effects].join(";")}`;
}

function ignoreFirstSlash(str: string) {
  if (str[0] === "/") return str.substring(1);
  return str;
}

export function getNameFromFilePath(path: string, options: { directoryAsNamespace: boolean; resolvedDirs: string[] }) {
  const { directoryAsNamespace, resolvedDirs } = options;

  //  去除包含的路径
  if (resolvedDirs.length) {
    for (const r of resolvedDirs.map((r) => ignoreFirstSlash(r))) {
      if (path.includes(r)) {
        const index = path.indexOf(r);
        path = path.slice(index + r.length);
      }
    }
  }

  const { name: fileName, dir } = parse(path); // parse 方法可以解析出路径里面的目录和文件名
  let name = "";

  //    是否使用路径作为文件名
  if (directoryAsNamespace) {
    name = `${dir}/${fileName}`.split("/").filter(Boolean).join("-");
  } else {
    if (fileName === "index") {
      name = dir.split("/").slice(-1)[0];
    } else {
      name = fileName;
    }
  }
  return name.replace(/[^a-zA-Z0-9\-]/g, "");
}

function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1, str.length);
}
function cammelCase(str: string) {
  return str.replace(/-(\w)/g, (_, c) => c.toUpperCase());
}

export function pascalCase(str: string) {
  return capitalize(cammelCase(str));
}
