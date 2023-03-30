import { vitestConfig } from '@rei/vite-base-config';

vitestConfig.test.coverage.exclude = ['**/*.{spec,test}.{js,mjs}'];

export default vitestConfig;
