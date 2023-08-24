export function amountFormat(num: number): string {
  let str = String(num);
  let decimal = "";
  if (str.includes(".")) {
    const arr = str.split(".");
    str = arr[0];
    decimal = arr[1];
  }
  if (str.length < 3) return num + "";
  else {
    let mode = Number(str.length) % 3;
    let res: string = "";
    if (mode === 0) {
      res = str.match(/\d{3}/g)?.join(",") as string;
    } else {
      res = str.slice(0, mode) + "," + str.slice(mode, str.length).match(/\d{3}/g)?.join(",");
    }
    res += !!decimal ? "." + decimal : decimal;
    return res;
  }
}
