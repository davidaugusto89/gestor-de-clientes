<template>
  <div>
    <div class="p-6 space-y-6">
      <!-- Título da Dashboard -->
      <Header title="Dashboard (exemplo)" />

      <!-- Indicadores -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Card 1: Total de Clientes -->
        <div
          class="bg-white shadow rounded-lg p-4 flex items-center justify-between"
        >
          <div>
            <span class="text-gray-600">Total de Clientes</span>
            <h2 class="text-3xl font-bold text-gray-800 mt-2">120</h2>
          </div>
          <span class="material-icons text-blue-500 text-4xl">people</span>
        </div>

        <!-- Card 2: Novos Clientes na Semana -->
        <div
          class="bg-white shadow rounded-lg p-4 flex items-center justify-between"
        >
          <div>
            <span class="text-gray-600">Novos Clientes na Semana</span>
            <h2 class="text-3xl font-bold text-gray-800 mt-2">8</h2>
          </div>
          <span class="material-icons text-green-500 text-4xl">person_add</span>
        </div>

        <!-- Card 3: Créditos Vencidos -->
        <div
          class="bg-white shadow rounded-lg p-4 flex items-center justify-between"
        >
          <div>
            <span class="text-gray-600">Créditos Vencidos</span>
            <h2 class="text-3xl font-bold text-gray-800 mt-2">5</h2>
          </div>
          <span class="material-icons text-red-500 text-4xl">warning</span>
        </div>
      </div>

      <!-- Tabela de Clientes Recentes -->
      <div class="bg-white shadow rounded-lg p-4">
        <h2 class="text-lg font-bold text-gray-800 mb-4">Clientes Recentes</h2>
        <table class="w-full table-auto border-collapse border border-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="border border-gray-200 px-4 py-2 text-left text-sm text-gray-600"
              >
                Nome
              </th>
              <th
                class="border border-gray-200 px-4 py-2 text-left text-sm text-gray-600"
              >
                CPF/CNPJ
              </th>
              <th
                class="border border-gray-200 px-4 py-2 text-left text-sm text-gray-600"
              >
                Data de Cadastro
              </th>
              <th
                class="border border-gray-200 px-4 py-2 text-left text-sm text-gray-600"
              >
                Limite de Crédito
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- Linha Exemplo 1 -->
            <tr>
              <td class="border border-gray-200 px-4 py-2 text-gray-700">
                João Silva
              </td>
              <td class="border border-gray-200 px-4 py-2 text-gray-700">
                123.456.789-00
              </td>
              <td class="border border-gray-200 px-4 py-2 text-gray-700">
                2025-01-15
              </td>
              <td class="border border-gray-200 px-4 py-2 text-gray-700">
                R$ 5.000,00
              </td>
            </tr>
            <!-- Linha Exemplo 2 -->
            <tr class="bg-gray-50">
              <td class="border border-gray-200 px-4 py-2 text-gray-700">
                Maria Souza
              </td>
              <td class="border border-gray-200 px-4 py-2 text-gray-700">
                987.654.321-00
              </td>
              <td class="border border-gray-200 px-4 py-2 text-gray-700">
                2025-01-18
              </td>
              <td class="border border-gray-200 px-4 py-2 text-gray-700">
                R$ 3.000,00
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  /*--- Script do componente de login ---*/
</script>

<style scoped></style>
