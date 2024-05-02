import { getAppBuildConfig } from '@rei/vite-base-config';
import AlpineUploader from '@rei/vite-plugin-alpine-uploader';
<%#packageUsesDataDog%>
import datadog from '@rei/vite-plugin-datadog-rum';
<%/packageUsesDataDog%>

export default getAppBuildConfig({
  plugins: [
    AlpineUploader(),
    <%#packageUsesDataDog%>
    datadog(),
    <%/packageUsesDataDog%>
  ],
  input: {
    quickstart: 'src/main/js/components/QuickStartPageComponent/entry-client.mts',
  },
});
