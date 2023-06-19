import { createSSRApp } from 'vue'; // (2)
import QuickStartPageComponent from './QuickStartPageComponent.vue'; // (1)

export default function createApp(props) {
  const app = createSSRApp(QuickStartPageComponent, {
    ...props,
  });
  return { app };
}

function getClientPageData(pageDataId) {
  const id = pageDataId || 'modelData';
  const model = window.document.getElementById(id);
  return model === null ? { pageData: {} } : JSON.parse(model.innerHTML);
}

export function init() {
  const { pageData: props } = getClientPageData(); // (3)
  const { app } = createApp(props); // (3)
  app.mount('#app'); // (4)
  return app; // (4)
}
