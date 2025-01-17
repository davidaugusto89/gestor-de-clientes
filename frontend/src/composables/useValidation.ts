import { ref, computed } from 'vue';
import { validateCPF, validateCNPJ, validateEmail } from '@/helpers/validations';

export function useValidation() {
  const errors = ref<Record<string, string>>({});

  // Mapeia os tipos para os respectivos helpers
  const validationHelpers: Record<string, (value: string) => boolean> = {
    cpf: validateCPF,
    cnpj: validateCNPJ,
    email: validateEmail,
  };

  const validate = (
    field: string,
    value: string | number,
    rules: { required?: boolean; minLength?: number; type?: string }
  ) => {
    const newErrors = { ...errors.value };

    if (rules.required && !value) {
      newErrors[field] = 'Campo é obrigatório.';
    } else if (typeof value === 'string' && rules.minLength && value.length < rules.minLength) {
      newErrors[field] = `O campo deve ter no mínimo ${rules.minLength} caracteres.`;
    } else if (rules.type && validationHelpers[rules.type]) {
      // Executa a validação dinâmica com o helper correspondente
      const isValid = validationHelpers[rules.type](String(value));
      if (!isValid) {
        newErrors[field] = `O campo deve ser um ${rules.type} válido.`;
      } else {
        newErrors[field] = '';
      }
    } else {
      newErrors[field] = '';
    }

    errors.value = newErrors;
  };

  const hasErrors = computed(() => Object.values(errors.value).some((error) => error !== ''));

  return {
    errors,
    validate,
    hasErrors,
  };
}
