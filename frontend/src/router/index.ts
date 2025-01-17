import { createRouter, createWebHistory } from 'vue-router'
import LayoutInterno from '../layouts/LayoutInterno.vue'
import LayoutAutenticacao from '../layouts/LayoutAutenticacao.vue'
import LoginPage from '../views/LoginPage.vue'
import DashboardPage from '../views/DashboardPage.vue'
import ClientesList from '../views/ClientesList.vue'
import ClienteForm from '../views/ClienteForm.vue'
import UsuariosList from '../views/UsuariosList.vue'
import UsuarioForm from '../views/UsuarioForm.vue'

// Definindo as rotas
const routes = [
  {
    path: '/login',
    component: LayoutAutenticacao, // Layout para login
    children: [
      {
        path: '',
        component: LoginPage, // Página de login
      },
    ],
  },
  {
    path: '/',
    component: LayoutInterno, // Layout para páginas internas
    children: [
      {
        path: '',
        component: DashboardPage, // Página do dashboard
      },
      {
        path: '/clientes',
        component: ClientesList, // Listagem de clientes
      },
      {
        path: '/clientes/:id',
        component: ClienteForm, // Formulário de edição de cliente
      },
      {
        path: '/usuarios',
        component: UsuariosList, // Listagem de usuários
      },
      {
        path: '/usuarios/:id',
        component: UsuarioForm, // Formulário de edição de usuário
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
