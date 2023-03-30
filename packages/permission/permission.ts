import { ensureArray } from "utils/array";

export type PermissionMap = Record<string, string[] | undefined>;

export interface IPermissionStore {
  get(path: string): string[] | undefined;
  set(data: PermissionMap): void;
}

interface IOption {
  fetch: () => PermissionMap | PromiseLike<PermissionMap>;
}

class PermissionStore implements IPermissionStore {
  data: PermissionMap = {};
  get(path: string) {
    return this.data[path];
  }
  set(data: PermissionMap) {
    this.data = data;
  }
}

export class Permission {
  store = new PermissionStore();
  constructor(public options: IOption) {
    this.init();
  }
  async init() {
    try {
      this.store.set(await this.options.fetch());
    } catch (e) {
      this.store.set({});
    }
  }
  path(path: string) {
    this.init();
    return !!this.store.get(path);
  }
  action(action: string, path: string | string[]) {
    return ensureArray(path).some(
      (part) =>
        this.path(part) &&
        ensureArray(this.store.get(part)).some(
          (permission) => permission === "*" || permission === action
        )
    );
  }
}

const test = new Permission({
  fetch: () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 100, { company: ["create", "update"] });
    });
  },
});
setTimeout(() => {
  console.log(test.path("company"));
  console.log(test.action("update", "company"));
  console.log(test.action("wow", "company"));
}, 200);
