<template>
  <div class="c-login-page">
    <h2 class="text-2xl font-bold text-center text-gray-900 mb-6">Login</h2>
    <!-- Formulário de login -->
    <form @submit.prevent="handleLogin">
      <Row>
        <Input type="text" id="email" v-model="email" required placeholder="Digite seu email" label="Email"
          :error-message="errors?.email" />
      </Row>

      <Row>
        <Input type="password" id="password" v-model="senha" required placeholder="Digite sua senha" label="Senha"
          :error-message="errors?.senha" />
      </Row>

      <Row>
        <Button type="primary" @click="handleLogin" :is-loading="isLoading">Entrar</Button>
      </Row>

      <div>
        <Link to="/register">Registrar-se</Link><br />
        <Link to="/forgot-password">Esqueceu a senha</Link>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useValidation } from '@/composables/useValidation';
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore';
import request from '@/services/request';

const { errors, validate, hasErrors } = useValidation();
const email = ref('')
const senha = ref('')
const router = useRouter()
const isLoading = ref(false)

// Função de login
const handleLogin = async () => {
  isLoading.value = true
  // Validações finais antes do envio
  validate('email', email.value, { required: true, minLength: 6, type: 'email' });
  validate('senha', senha.value, { required: true, minLength: 6 });

  // Se não houver erros, processa os dados
  if (hasErrors.value) {
    isLoading.value = false
    return;
  }

  const data = {
    email: email.value,
    senha: senha.value
  };

  try {
    const response = await request.post('/auth/login', data);

    if (response.status === 200) {
      const authStore = useAuthStore();
      const user = {
        id: response.data?.id || 0,
        nome: response.data?.nome || '',
        email: response.data?.email || '',
        role: response.data?.role || ''
      }

      authStore.login(user, response.data.access_token);
      router.push('/dashboard');
    }
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.auth-container {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
