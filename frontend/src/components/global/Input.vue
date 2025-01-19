<template>
  <div :class="containerClasses">
    <label :for="id" class="block text-sm font-medium text-gray-700 mb-2">
      <span :class="error ? 'text-red-500' : ''">{{ label }}</span>
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative">
      <!-- Campo de entrada - com mask -->
      <input
        ref="inputRef"
        :id="id"
        v-model="internalValue"
        :type="type"
        :placeholder="placeholder"
        :class="inputClasses"
        :maxlength="maxLength"
        :aria-invalid="errorMessage ? 'true' : 'false'"
        v-if="!mask"
      />

      <MaskInput
        ref="inputRef"
        :id="id"
        v-model="internalValue"
        :type="type"
        :placeholder="placeholder"
        :class="inputClasses"
        :maxlength="maxLength"
        :aria-invalid="errorMessage ? 'true' : 'false'"
        :mask="mask"
        v-else
      />

      <p>Internal Value: {{ internalValue }}</p>
<p>Model Value: {{ props.modelValue }}</p>

      <!-- Mensagem de erro -->
      <p v-if="errorMessage" class="text-red-500 text-sm mt-2">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, defineProps, watch } from 'vue'

  // Props
  const props = defineProps({
    id: { type: String, required: true },
    label: { type: String, required: true },
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' },
    required: { type: Boolean, default: false },
    errorMessage: { type: String, default: '' },
    width: { type: String, default: 'full' },
    height: { type: String, default: '10' },
    maxLength: { type: Number, default: 250 },
    mask: { type: String, default: '' },
    modelValue: { type: String, required: true },
  })

  // Emitir eventos
  const emits = defineEmits(['update:modelValue'])

  // Estado interno
  const internalValue = ref(props.modelValue)
  const inputRef = ref<HTMLInputElement | null>(null)

  // Computed para classes dinâmicas
  const error = computed(() => props.errorMessage !== '')
  const containerClasses = computed(() => `w-${props.width} mb-4`)
  const inputClasses = computed(
    () =>
      `w-full ${props.height} py-2 px-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none ${props.errorMessage ? 'border-red-500' : 'border-gray-300'}`
  )

  // Sincronizar o valor interno com o modelValue
  watch(
    () => props.modelValue,
    (newValue) => {
      internalValue.value = newValue
    }
  )

  // Atualizar o valor externo ao alterar o campo
  watch(internalValue, (newValue) => {
    emits('update:modelValue', newValue)
  })
</script>

<style scoped></style>
