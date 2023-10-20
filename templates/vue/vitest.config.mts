import { vitestConfig } from '@rei/vite-base-config';

vitestConfig.test.coverage.exclude.push('src/**/DemoComponent.vue');

export default vitestConfig;
