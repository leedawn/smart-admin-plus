// @ts-ignore
import _ from "lodash";
const obj = _.cloneDeep({ name: "leon" });

export function print(text) {
  console.log(text + " " + JSON.stringify(obj));
}
