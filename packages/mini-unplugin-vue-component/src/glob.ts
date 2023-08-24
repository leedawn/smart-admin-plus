import fg from "fast-glob";
import Context from "./context";

export function searchComponent(context: Context) {
  const file = fg.sync("src/components/**/*.vue", { cwd: context.root, absolute: true });

  context.addComponents(file);
}
