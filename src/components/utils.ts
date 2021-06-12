export function buildClassName(classes: (string | undefined)[]) {
  return classes.filter((value) => !!value).join(" ");
}
