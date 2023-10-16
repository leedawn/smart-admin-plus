export const delay = (time: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export function mySetInterval(fn: Function, time: number) {
  let timer: NodeJS.Timeout;
  function wrapper() {
    fn();
    timer = setTimeout(wrapper, time);
  }
  wrapper();
  return function () {
    clearTimeout(timer);
  };
}

export * from "./promise-lock";
export * from "./promise-concat";
