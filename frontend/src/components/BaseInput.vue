<template>
  <div class="input-wrapper">
    <label :for="id">{{ label }}</label>
    <input :id="id" :type="type" v-model="modelValue" :placeholder="placeholder" :disabled="disabled" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  id: String,
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  modelValue: String,
  placeholder: String,
  disabled: Boolean
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.input-wrapper {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>
