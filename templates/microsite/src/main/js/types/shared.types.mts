export interface GenericStringKeyValueObject {
  [index: string]: string;
}

declare global {
  // This global variable is declared in @rei/vite-base-config
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
  const __PROJECT_NAME__: string;
}
