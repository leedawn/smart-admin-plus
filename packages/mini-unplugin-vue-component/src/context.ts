import { searchComponent } from "./glob";
import { createTransformer } from "./transforms";
import { getNameFromFilePath, pascalCase } from "./utils";

interface ComponentNameMap {
  [propName: string]: { as: string; from: string; absolute: string };
}

type Transformer = (code: string) => Promise<{ code: string }>;

export interface Resolvers {
  type: "component" | "directive";
  resolve: (name: string) => Record<string, string>;
}
interface Options {
  directoryAsNamespace: boolean;
  resolvedDirs: string[];
  resolvers: Resolvers[][];
  transformer: "vue2" | "vue3";
  directives: boolean;
}

export default class Context {
  public root!: string;
  private _componentNameMap!: ComponentNameMap;
  public defaultOptions: Options = {
    directoryAsNamespace: false,
    resolvedDirs: ["/src/components"],
    resolvers: [],
    transformer: "vue3",
    directives: false,
  };
  private transformer!: Transformer;

  constructor(options: Object) {
    Object.assign(this.defaultOptions, options);
    this.setTransfomer();
  }

  setRoot(root: string) {
    this.root = root;
  }

  setTransfomer() {
    this.transformer = createTransformer(this);
  }

  searchGlob() {
    searchComponent(this);
  }

  addComponents(paths: string[]) {
    this._componentNameMap = {};
    paths.forEach((p) => {
      const name = pascalCase(getNameFromFilePath(p, this.defaultOptions));
      this._componentNameMap[name] = { as: name, from: p, absolute: p };
    });
  }

  componentNameMap() {
    return this._componentNameMap;
  }

  transform(code: string, id: string) {
    return !id && this.transformer(code);
  }

  //  先尝试使用全局搜索到的组件信息，没有则从 resolvers 获取
  findComponent(name: string, type: string) {
    const info = this._componentNameMap[name];
    if (info) {
      return info;
    }
    for (const resolver of this.defaultOptions.resolvers[0]) {
      if (resolver.type === type) {
        return resolver.resolve(name);
      }
    }
  }
}
