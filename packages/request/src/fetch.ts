export interface RequestOptions extends Omit<RequestInit, "body" | "method"> {
  headers?: Record<string, string>;
  body?: BodyInit | Record<string, any>;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  parseResponse?: (res: Response) => RequestResult<any>;
  useBeacon?: boolean;
}

interface RequestResult<T> {
  data?: T;
  list?: T;
  code?: number;
  message?: string;
  sucess?: boolean;
}

export function fetch(path: string, options?: RequestOptions): Promise<string> {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    let body = options?.body || null;

    xhr.open(options?.method || "GET", path, true); // true 表明是异步请求

    if (options && !(options.body instanceof FormData)) {
      options.headers = { ...options?.headers, "Content-type": "application/json" };
      body = JSON.stringify(body);
    }
    if (options?.headers) {
      Object.keys(options.headers).forEach((key) => {
        xhr.setRequestHeader(key, (options.headers as Record<string, string>)[key]);
      });
    }
    xhr.onload = function (e) {
      console.log("🚀 ~ file: fetch.ts:15 ~ returnnewPromise ~ xhr.readyState:", xhr.readyState, xhr.status, xhr.responseText);
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
          resolve(xhr.responseText);
        } else {
          console.error(xhr.statusText);
        }
      }
    };
    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };

    xhr.send(body as XMLHttpRequestBodyInit | Document | null | undefined);
  });
}
