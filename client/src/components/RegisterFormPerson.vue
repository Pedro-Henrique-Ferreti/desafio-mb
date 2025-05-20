<template>
  <RegisterCard
    :title="isCompany ? 'Pessoa Jurídica' : 'Pessoa Física'"
    :form-step="2"
    @next="$emit('next')"
    @previous="$emit('previous')"
  >
    <AppInput
      v-model="name"
      :label="isCompany ? 'Razão social' : 'Nome'"
    />
    <AppInput
      v-model="documentId"
      :label="isCompany ? 'CNPJ' : 'CPF'"
    />
    <AppInput
      v-model="birthdate"
      :label="isCompany ? 'Data de abertura' : 'Data de nascimento'"
    />
    <AppInput
      v-model="phoneNumber"
      label="Telefone"
    />
  </RegisterCard>
</template>

<script setup>
import AppInput from './AppInput.vue';
import RegisterCard from './RegisterCard.vue';

defineEmits(['next', 'previous']);
defineProps({
  isCompany: {
    type: Boolean,
    required: true,
  },
});

const name = defineModel('name', { type: String, required: true });
const documentId = defineModel('document-id', { type: String, required: true });
const birthdate = defineModel('birthdate', { type: String, required: true });
const phoneNumber = defineModel('phone-number', { type: String, required: true });
</script>
