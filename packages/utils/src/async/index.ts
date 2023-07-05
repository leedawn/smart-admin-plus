export const delay = (time: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export * from "./promise-lock";
export * from "./promise-concat";
