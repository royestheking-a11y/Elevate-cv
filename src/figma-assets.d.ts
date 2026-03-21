declare module "figma:asset/*" {
  const content: string;
  export default content;
}

declare module "*.mjs?url" {
  const src: string;
  export default src;
}
