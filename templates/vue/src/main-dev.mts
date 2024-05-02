/**
 * Local development App container for component development
 */
import { createApp } from 'vue';

/* Bring in component here */
import '@rei/cedar/dist/cdr-reset.css';
import '@rei/cedar/dist/cdr-fonts.css';
import './style/vendor.scss';
import DemoComponent from './DemoComponent.vue';

createApp(DemoComponent).mount('#app');
