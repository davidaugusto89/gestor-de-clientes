import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

// Registrar todos os componentes globalmente com tipagem correta
const globalComponents = import.meta.glob('./components/global/*.vue', { eager: true }) as Record<
  string,
  { default: object }
>;

Object.entries(globalComponents).forEach(([path, definition]) => {
  const componentName = path
    .split('/')
    .pop()
    ?.replace(/\.\w+$/, '') as string;
  app.component(componentName, definition.default);
});

app.use(createPinia());
app.use(router);

app.mount('#app');
