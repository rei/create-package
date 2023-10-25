import { createSSRApp } from 'vue'; // (2)
import QuickStartPageComponent from './QuickStartPageComponent.vue'; // (1)
import type { GenericStringKeyValueObject } from '../../types/shared.types.mjs';

export default function createApp(props: GenericStringKeyValueObject) {
  const app = createSSRApp(QuickStartPageComponent, {
    ...props,
  });
  return { app };
}

export function getClientPageData(pageDataId = 'modelData') {
  const model = window.document.getElementById(pageDataId);
  return model === null ? { pageData: {} } : JSON.parse(model.innerHTML);
}

export function init() {
  const { pageData: props } = getClientPageData(); // (3)
  const { app } = createApp(props); // (3)
  app.mount('#app'); // (4)
  return app; // (4)
}
