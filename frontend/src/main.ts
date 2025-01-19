import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { MaskInput } from 'vue-3-mask'

import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'

const app = createApp(App)

// Registrar o componente MaskInput globalmente
app.component('MaskInput', MaskInput)

// Registrar o componente Toast globalmente
app.use(Vue3Toastify, {
  newestOnTop: true,
  position: 'top-right',
  transition: 'slide',
} as ToastContainerOptions)

// Habilitar warnings no console
app.config.errorHandler = (err) => {
  console.error('Vue Error:', err)
}

app.config.warnHandler = (msg, vm, trace) => {
  console.warn('Vue Warning:', msg, trace)
}

// Registrar todos os componentes globalmente com tipagem correta
const globalComponents = import.meta.glob('./components/global/*.vue', {
  eager: true,
}) as Record<string, { default: object }>

Object.entries(globalComponents).forEach(([path, definition]) => {
  const componentName = path
    .split('/')
    .pop()
    ?.replace(/\.\w+$/, '') as string
  app.component(componentName, definition.default)
})

app.use(createPinia())
app.use(router)

app.mount('#app')
