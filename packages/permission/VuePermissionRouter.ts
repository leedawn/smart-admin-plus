import { IPermissionStore, Permission, PermissionMap } from "./permission";
import Vue from "vue";
import VueRouter, { NavigationGuardNext } from "vue-router";

// type VuePermissionRouterOptions=

/** TODO： 不知道怎么解决 */
class VuePermission extends Permission {
  store = new VuePermissionStore();
}

class VuePermissionStore implements IPermissionStore {
  data: { inner: PermissionMap } = Vue.observable({ inner: {} });
  get(path: string): string[] | undefined {
    return this.data.inner[path];
  }
  set(data: PermissionMap) {
    Vue.set(this.data, "inner", data);
  }
}

class VuePermissionRouter extends VueRouter {
  permission: VuePermission;
  forbiddenRoute: Parameters<NavigationGuardNext>[0];

  static install(Vue) {
    ["$permission", "$p"].forEach((name) => {
      Object.defineProperty(Vue, name, {
        get() {
          const helper = (path) => {
            return this.$router.permission.path(path);
          };
          helper.action = (action, path) => {
            return this.$router.action(action, path);
          };
        },
      });
    });
  }

  constructor(options) {
    super(options);
    this.permission = new VuePermission({
      fetch: () =>
        Promise.resolve(options.fetch()).then((map) => Vue.observable(map)),
    });
    this.forbiddenRoute = options.forbiddenRoute;
    this.beforeEach(this.permissionEach);
  }

  action(action, path) {
    this.permission.action(action, path || this.getInjectRoutePath());
  }

  push(location, onResolve, onReject) {
    if (onResolve || onReject) super.push(location, onResolve, onReject);
    else
      super.push(location).catch((err) => {
        if (VueRouter.isNavigationFailure(err)) {
          console.warn(err);
          return this.currentRoute;
        }
        Promise.reject(err);
      });
  }

  resolvePermission(to) {
    const { route } = this.resolve(to);
    return new Promise((resolve) => {
      this.permissionEach(route, route, resolve);
    }).then((res) => res || to);
  }

  private getInjectRoutePath() {
    if (!this.currentRoute) return [];
    return this.currentRoute.matched.map((route) => route.path).reverse();
  }

  private async permissionEach(to, _, next) {
    let permission = true;
    for (const route of to.matched.slice().reverse()) {
      if (route.meta.auth === false) continue;
      if (route.meta.auth === true) {
        await this.permission.init();
        permission = this.permission.path(route.path);
        break;
      }
      // this.permission.init();  // 不理解，但是可以说需要按钮控制也需要初始化获取权限
    }
    if (permission) {
      next();
    } else {
      next(this.forbiddenRoute);
    }
  }
}

const router = new VuePermissionRouter({
  fetch: () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 100, { company: ["create", "update"] });
    });
  },
  mode: "history",
  routes: [
    { path: "/home", component: () => ({ template: "this is home page" }) },
    { path: "/test", component: () => ({ template: "this is test page" }) },
  ],
});
new Vue({ router: router as unknown as VueRouter }).$mount("#app");
