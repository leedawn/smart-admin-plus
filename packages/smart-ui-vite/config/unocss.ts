import Unocss from "unocss/vite";
import { presetUno, presetAttributify, presetIcons } from "unocss";

const colors = ["red", "gray", "yellow"];
const safelist = [
  ...colors.map((v) => `bg-${v}-500`),
  ...colors.map((v) => `hover:bg-${v}-700`),
  ...["search", "edit", "check"].map((v) => `i-ic-baseline-${v}`),
];

export default () =>
  Unocss({
    safelist,
    presets: [presetUno(), presetAttributify(), presetIcons()],
  });
