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
import ResetPasswordPage from '@/views/ResetPasswordPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import ForgotPasswordPage from '@/views/ForgotPasswordPage.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'

const routes = [
  {
    path: '/login',
    component: LayoutAutenticacao,
    name: 'Login',
    children: [
      {
        path: '',
        component: LoginPage,
        name: 'LoginPage',
      },
    ],
    redirect: { name: 'LoginPage' },
  },
  {
    path: '/register',
    component: LayoutAutenticacao,
    name: 'Register',
    children: [
      {
        path: '',
        component: RegisterPage,
        name: 'RegisterPage',
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
        component: ForgotPasswordPage,
        name: 'ForgotPasswordPage',
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
        name: 'ResetPasswordPage',
      },
    ],
  },

  {
    path: '/logout',
    name: 'Logout',
    beforeEnter(to, from, next) {
      const authStore = useAuthStore()
      authStore.logout()
      next({ name: 'Login' })
    },
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
        path: 'clientes',
        component: ClientesList,
        name: 'ClientesList',
        meta: { requiresAuth: true },
      },
      {
        path: 'clientes/novo',
        component: ClienteForm,
        name: 'ClientesNovo',
        meta: { requiresAuth: true },
      },
      {
        path: 'clientes/editar/:id',
        component: ClienteForm,
        name: 'EditClient',
        meta: { requiresAuth: true },
      },
      {
        path: 'usuarios',
        component: UsuariosList,
        name: 'UsuariosList',
        meta: { requiresAuth: true },
      },
      {
        path: 'usuarios/novo',
        component: UsuarioForm,
        name: 'NovoUsuario',
        meta: { requiresAuth: true },
      },
      {
        path: 'usuarios/editar/:id',
        component: UsuarioForm,
        name: 'EditUsuario',
        meta: { requiresAuth: true },
      },
    ],
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Guard para verificar autenticação antes de acessar rotas privadas
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = !!authStore.usuario // Verifica se o usuário está autenticado

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
