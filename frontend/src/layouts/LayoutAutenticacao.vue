<!-- src/layouts/LayoutAutenticacao.vue -->
<template>
  <div class="auth-container">
    <main class="auth-content">
      <slot></slot> <!-- Aqui vai o conteúdo das páginas de autenticação -->
    </main>
  </div>
</template>

<script setup lang="ts">
// Lógica para o layout de autenticação, se necessário
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.auth-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}
</style>
