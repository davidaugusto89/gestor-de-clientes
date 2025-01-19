<template>
  <div class="relative overflow-x-auto sm:rounded-lg">
    <Header
      :title="title"
      :title-previous="'Clientes'"
      :route-back="'/clientes'"
    />

    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <form @submit.prevent="handleFormSubmit" class="space-y-6">
        <!-- Linha 1 -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Input
            type="text"
            id="codigo"
            v-model="codigo"
            required
            placeholder="Código"
            label="Código"
            :error-message="errors?.codigo"
          />
          <Input
            type="text"
            id="nome"
            v-model="nome"
            required
            placeholder="Nome"
            label="Nome"
            :error-message="errors?.nome"
          />
          <Input
            type="text"
            id="cpf_cnpj"
            v-model="cpfCnpj"
            required
            placeholder="CPF/CNPJ"
            label="CPF/CNPJ"
            :error-message="errors?.cpfCnpj"
            :max-length="18"
            format-type="cpfCnpj"
          />
        </div>

        <!-- Linha 2 -->
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <Input
            type="text"
            id="cep"
            v-model="cep"
            required
            placeholder="CEP"
            label="CEP"
            :error-message="errors?.cep"
            :max-length="9"
            format-type="cep"
            @change="onCepInput"
            @blur="onCepInput"
          />

          <Input
            type="text"
            id="logradouro"
            v-model="logradouro"
            required
            placeholder="Logradouro"
            label="Logradouro"
            :error-message="errors?.logradouro"
          />
          <Input
            type="text"
            id="endereco"
            v-model="endereco"
            required
            placeholder="Endereço"
            label="Endereço"
            :error-message="errors?.endereco"
          />
          <Input
            type="text"
            id="numero"
            v-model="numero"
            required
            placeholder="Número"
            label="Número"
            :error-message="errors?.numero"
            :max-length="20"
            format-type="number"
          />
        </div>

        <!-- Linha 4 -->
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <Input
            type="text"
            id="bairro"
            v-model="bairro"
            required
            placeholder="Bairro"
            label="Bairro"
            :error-message="errors?.bairro"
          />
          <Input
            type="text"
            id="cidade"
            v-model="cidade"
            required
            placeholder="Cidade"
            label="Cidade"
            :error-message="errors?.cidade"
          />
          <Input
            type="text"
            id="complemento"
            v-model="complemento"
            placeholder="Complemento"
            label="Complemento"
            :error-message="errors?.complemento"
          />
          <SelectUF v-model="uf" label="UF" />
        </div>

        <!-- Linha 6 -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Input
            type="text"
            id="fone"
            v-model="fone"
            required
            placeholder="Telefone"
            label="Telefone"
            :error-message="errors?.fone"
            :max-length="16"
            format-type="telefone"
          />

          <Input
            type="text"
            id="limiteCredito"
            v-model="limiteCredito"
            required
            placeholder="Limite de Crédito"
            label="Limite de Crédito"
            :error-message="errors?.limiteCredito"
            format-type="currency"
          />

          <Input
            type="date"
            id="validade"
            v-model="validade"
            required
            placeholder="Validade"
            label="Validade"
            :error-message="errors?.validade"
          />
        </div>

        <!-- Botão -->
        <div>
          <Button
            type="primary"
            @click="handleFormSubmit"
            :is-loading="isLoading"
            class="w-full"
          >
            Salvar
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useValidation } from '@/composables/useValidation'
  import { useAuthStore } from '@/stores/authStore'
  import request from '@/services/request'
  import { getCepInfo } from '@/services/cep'
  import SelectUF from '@/components/SelectUF.vue'
  import { useToastStore } from '@/stores/toastStore'

  const { errors, validate, hasErrors } = useValidation()

  const route = useRoute()
  const router = useRouter()
  const authStore = useAuthStore()
  const toastStore = useToastStore()

  const clienteId = computed(() => route.params.id as string | null)

  const title = computed(() => {
    return clienteId.value ? 'Editar Cliente' : 'Novo Cliente'
  })

  const isLoading = ref(false)
  const idUsuario = authStore.usuario?.id ?? ''
  const codigo = ref('')
  const nome = ref('')
  const cpfCnpj = ref('')
  const cep = ref('')
  const logradouro = ref('')
  const endereco = ref('')
  const numero = ref('')
  const bairro = ref('')
  const cidade = ref('')
  const uf = ref('')
  const complemento = ref('')
  const fone = ref('')
  const limiteCredito = ref(null)
  const validade = ref('')

  const handleFormSubmit = async () => {
    isLoading.value = true

    // Limpa os erros
    errors.value = {}

    // Validações finais
    validate('nome', nome.value, { required: true })
    validate('codigo', codigo.value, { required: true })
    validate('cpfCnpj', cpfCnpj.value, { required: true, type: 'CPF/CNPJ' })
    validate('cep', cep.value, { required: true, length: 9 })
    validate('logradouro', logradouro.value, { required: true })
    validate('endereco', endereco.value, { required: true })
    validate('numero', numero.value, { required: true })
    validate('bairro', bairro.value, { required: true })
    validate('cidade', cidade.value, { required: true })
    validate('uf', uf.value, { required: true, length: 2 })
    validate('fone', fone.value, {
      required: true,
      custom: (value) =>
        /^\(\d{2}\) \d{1}(?: \d{4}|\d{4})-\d{4}$/.test(String(value)),
    })
    validate('limiteCredito', limiteCredito.value ?? 0, {
      required: true,
      min: 0,
    })
    validate('validade', validade.value, {
      required: true,
      custom: (value) => !isNaN(Date.parse(String(value))),
    })

    if (hasErrors.value) {
      isLoading.value = false
      return
    }

    const cepSemMascara = cep.value.replace(/\D/g, '')

    const data = {
      idUsuario,
      codigo: codigo.value,
      nome: nome.value,
      cpfCnpj: cpfCnpj.value,
      cep: cepSemMascara,
      logradouro: logradouro.value,
      endereco: endereco.value,
      numero: Number(numero.value),
      bairro: bairro.value,
      cidade: cidade.value,
      uf: uf.value,
      complemento: complemento.value,
      fone: fone.value,
      limiteCredito: Number(limiteCredito.value),
      validade: validade.value,
    }

    try {
      const response = clienteId.value
        ? await request.put(`/clientes/${clienteId.value}`, data)
        : await request.post('/clientes', data)

      if (response.status === 200 || response.status === 201) {
        const message = `Cliente ${clienteId.value ? 'editado' : 'adicionado'} com sucesso!`
        toastStore.setNextToast(message, 'success')

        router.push('/clientes')
      }
    } finally {
      isLoading.value = false
    }
  }

  const onCepInput = async () => {
    try {
      if (cep.value.length === 9) {
        const response = await getCepInfo(cep.value)
        logradouro.value = response.logradouro
        endereco.value = response.endereco
        bairro.value = response.bairro
        cidade.value = response.localidade
        uf.value = response.uf
        errors.value.cep = ''
      }
    } catch (error: any) {
      errors.value.cep = error.message || 'Erro ao buscar endereço.'
    }
  }

  const loadInfo = async () => {
    try {
      isLoading.value = true
      const response = await request.get(`/clientes/${clienteId.value}`)

      if (response.status === 200) {
        const data = response.data
        codigo.value = data.codigo
        nome.value = data.nome
        cpfCnpj.value = data.cpfCnpj
        cep.value = '13076-580' //data.cep.toString()
        logradouro.value = data.logradouro
        endereco.value = data.endereco
        numero.value = data.numero
        bairro.value = data.bairro
        cidade.value = data.cidade
        uf.value = data.uf
        complemento.value = data.complemento
        fone.value = data.fone
        limiteCredito.value = data.limiteCredito
        validade.value = data.validade
      }
    } catch (error) {
      console.error('Erro ao carregar os clientes:', error)
      router.push('/clientes')
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    if (clienteId.value) {
      loadInfo()
    }
  })
</script>

<style scoped></style>
