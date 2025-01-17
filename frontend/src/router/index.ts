import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import LayoutAutenticacao from '@/layouts/LayoutAutenticacao.vue'
import LayoutInterno from '@/layouts/LayoutInterno.vue'
import LoginPage from '@/views/LoginPage.vue'
import DashboardPage from '@/views/DashboardPage.vue'
import ClientesList from '@/views/ClientesList.vue'
import ClienteForm from '@/views/ClienteForm.vue'
import UsuariosList from '@/views/UsuariosList.vue'
import UsuarioForm from '@/views/UsuarioForm.vue'
import RecoveryPasswordPage from '@/views/RecoveryPasswordPage.vue'
import ResetPasswordPage from '@/views/ResetPasswordPage.vue'

const routes = [
  {
    path: '/login',
    component: LayoutAutenticacao,
    name: 'Login',
    children: [
      {
        path: '',
        component: LoginPage,
      },
    ],
  },
  {
    path: '/register',
    component: LayoutAutenticacao,
    name: 'Register',
    children: [
      {
        path: '',
        component: RecoveryPasswordPage,
      },
    ],
  },
  {
    path: '/forgot-password',
    component: LayoutAutenticacao,
    name: 'ForgotPassword',
    children: [
      {
        path: '',
        component: RecoveryPasswordPage,
      },
    ],
  },
  {
    path: '/reset-password',
    component: LayoutAutenticacao,
    name: 'ResetPassword',
    children: [
      {
        path: '',
        component: ResetPasswordPage,
      },
    ],
  },

  {
    path: '/',
    component: LayoutInterno,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/dashboard',
        component: DashboardPage,
        name: 'Dashboard',
        meta: { requiresAuth: true },
      },
      {
        path: '/clientes',
        component: ClientesList,
        name: 'ClientesList',
        meta: { requiresAuth: true },
      },
      {
        path: '/clientes/:id',
        component: ClienteForm,
        name: 'EditClient',
        meta: { requiresAuth: true },
      },
      {
        path: '/usuarios',
        component: UsuariosList,
        name: 'UsuariosList',
        meta: { requiresAuth: true },
      },
      {
        path: '/usuarios/:id',
        component: UsuarioForm,
        name: 'EditUsuario',
        meta: { requiresAuth: true },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Guard para verificar autenticação antes de acessar rotas privadas
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = !!authStore.user // Verifica se o usuário está autenticado

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
