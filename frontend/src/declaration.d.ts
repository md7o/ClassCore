// src/declaration.d.ts or src/images.d.ts
declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.png" {
  const value: string;
  export default value;
}

// Add other image extensions if needed
