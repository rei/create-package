import { getAppBuildConfig } from '@rei/vite-base-config';

export default getAppBuildConfig({
  buildSsr: true,
  input: {
    quickstart: 'src/main/js/components/QuickStartPageComponent/main.mts',
  },
});
