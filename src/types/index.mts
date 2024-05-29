/* c8 ignore start */

export interface ComponentNames {
  kebabComponentName?: string;
  camelComponentName?: string;
}

export interface TemplateType {
  VUE: 'Vue 3 component';
  VANILLA: 'Vanilla TypeScript library';
  MICROSITE: 'Microsite front-end code (QuickStart)';
  COMMON: 'Common template';
}

export interface Answer {
  packageName: string;
  packageDescription: string;
  packageAuthor: string;
  packageTemplate: string;
  namespacedDir: boolean;
  packageOwnerTeamId: string;
  packageUsesDataDog: boolean;
}

/* c8 ignore end */
