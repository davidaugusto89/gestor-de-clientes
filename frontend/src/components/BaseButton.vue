<template>
  <button :class="['btn', type]" :disabled="isLoading" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  type: {
    type: String,
    default: 'primary'  // Pode ser 'primary', 'secondary', 'danger', etc.
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const handleClick = () => {
  // Lógica do clique
}
</script>

<style scoped>
.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
}

.primary {
  background-color: #007bff;
  color: white;
}

.secondary {
  background-color: #6c757d;
  color: white;
}

.danger {
  background-color: #dc3545;
  color: white;
}
</style>
