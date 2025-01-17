<template>
  <div class="flex h-screen">
    <!-- Menu Lateral -->
    <aside class="w-64 bg-indigo-600 text-white flex flex-col">
      <div class="flex items-center justify-center h-20 border-b border-blue-400">
        <h1 class="text-xl font-bold">Logo</h1>
      </div>
      <nav class="flex-1 px-4 py-6">
        <ul class="space-y-4">
          <li>
            <router-link to="/dashboard"
              class="flex items-center py-2 px-4 rounded-lg hover:bg-gray-800 active:bg-blue-800 transition-colors"
              active-class="bg-blue-800">
              <i class="material-icons text-lg">home</i>
              <span class="ml-2">Página Inicial</span>
            </router-link>
          </li>

          <li>
            <router-link to="/clientes"
              class="flex items-center py-2 px-4 rounded-lg hover:bg-gray-800 active:bg-blue-800 transition-colors"
              active-class="bg-blue-800">
              <i class="material-icons text-lg">groups</i>
              <span class="ml-2">Clientes</span>
            </router-link>
          </li>

          <li>
            <router-link to="/usuarios"
              class="flex items-center py-2 px-4 rounded-lg hover:bg-gray-800 active:bg-blue-800 transition-colors"
              active-class="bg-blue-800">
              <i class="material-icons text-lg">person</i>
              <span class="ml-2">Usuários</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Conteúdo Principal -->
    <div class="flex-1 flex flex-col">
      <header class="h-16 bg-gray-100 border-b border-gray-300 flex items-center px-6">
        <h1 class="text-lg font-semibold text-gray-800">Bem-vindo(a)!</h1>
      </header>
      <main class="flex-1 overflow-y-auto bg-gray-50 p-6">
        <router-view></router-view>
      </main>
      <footer class="h-16 bg-gray-100 border-t border-gray-300 flex items-center justify-center">
        <p class="text-sm text-gray-600">&copy; 2025 - Todos os direitos reservados | Desenvolvido por: David Augusto</p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
/* Se precisar de algum ajuste adicional com Tailwind */
</style>
