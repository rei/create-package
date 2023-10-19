import { getAppBuildConfig } from '@rei/vite-base-config';
import AlpineUploader from '@rei/vite-plugin-alpine-uploader';

export default getAppBuildConfig({
  plugins: [
    AlpineUploader(),
  ],
  input: {
    quickstart: 'src/main/js/components/QuickStartPageComponent/entry-client.mts',
  },
});
