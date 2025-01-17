<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 px-4">
    <div class="auth-container bg-white p-8 rounded-lg shadow-lg w-full sm:max-w-md md:max-w-lg">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.auth-container {
  animation: fadeIn 0.5s ease-in-out;
}

/* Animação de fade-in */
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
