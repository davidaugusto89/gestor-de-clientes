<!-- src/layouts/LayoutInterno.vue -->
<template>
  <div>
    <header>
      <!-- Cabeçalho da aplicação (logo, navegação) -->
      <h1>Logo da Aplicação</h1>
      <nav>
        <ul>
          <li><router-link to="/clientes">Clientes</router-link></li>
          <li><router-link to="/users">Usuários</router-link></li>
        </ul>
      </nav>
    </header>

    <main>
      <slot></slot> <!-- Aqui vai o conteúdo das páginas internas -->
    </main>

    <footer>
      <p>&copy; 2025 - Todos os direitos reservados</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Lógica para o layout interno, se necessário
</script>

<style scoped>
/* Estilos específicos para o layout interno */
header {
  background-color: #333;
  color: white;
  padding: 10px;
}

nav ul {
  list-style-type: none;
  display: flex;
  gap: 10px;
}

footer {
  background-color: #f1f1f1;
  text-align: center;
  padding: 10px;
  position: fixed;
  width: 100%;
  bottom: 0;
}
</style>
