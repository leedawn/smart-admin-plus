import { fetch } from "./fetch";
import { stringify } from "qs";

export function request(url, options?: unknown) {
  if (options?.method && options?.method.toLowerCase() === "get" && options.body) {
    url += url.includes("?") ? "&" : "?" + stringify(options.body);
    delete options.body;
  }

  return fetch(url, options).then((res) => {
    const response = JSON.parse(res);
    if (response.code === 0) {
      return response.data;
    } else {
      return Promise.reject(response);
    }
  });
}
