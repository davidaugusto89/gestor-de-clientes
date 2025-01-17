<template>
  <div :class="containerClasses">
    <label :for="id" class="block text-sm font-medium text-gray-700 mb-2">
      <span>{{ label }}</span>
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="relative">
      <!-- Campo de entrada -->
      <input :id="id" v-model="inputValue" :type="type" :placeholder="placeholder" :class="inputClasses"
        :maxlength="maxLength" :aria-invalid="errorMessage ? 'true' : 'false'" />

      <!-- Mensagem de erro -->
      <p v-if="errorMessage" class="text-red-500 text-sm mt-2">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, watch } from 'vue'

// Props
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: 'full', // full, sm, md, lg
  },
  height: {
    type: String,
    default: '10', // Padrão: 10 (altura padrão)
  },
  maxLength: {
    type: Number,
    default: 250,
  }
})

const emits = defineEmits(['update:modelValue'])

const inputValue = ref('')
const error = ref(false)

const containerClasses = computed(() => {
  return `w-${props.width} mb-4`
})

const inputClasses = computed(() => {
  return `w-full ${props.height} py-2 px-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none ${error.value ? 'border-red-500' : 'border-gray-300'}`
})

watch(inputValue, () => {
  emits('update:modelValue', inputValue.value)
})
</script>

<style scoped></style>
