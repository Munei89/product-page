/**
 * Ambient declaration so TypeScript understands `*.module.css` imports.
 * Each import resolves to a map of original class name → generated class name.
 */
declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
