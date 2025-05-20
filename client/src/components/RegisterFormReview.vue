<template>
  <RegisterCard
    title="Revise suas informações"
    :form-step="4"
    @next="$emit('next')"
    @previous="$emit('previous')"
  >
    <AppInput
      v-model="email"
      label="Endereço de e-mail"
    />
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
    <AppInput
      v-model="password"
      label="Senha"
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

const email = defineModel('email', { type: String, required: true });
const name = defineModel('name', { type: String, required: true });
const documentId = defineModel('document-id', { type: String, required: true });
const birthdate = defineModel('birthdate', { type: String, required: true });
const phoneNumber = defineModel('phone-number', { type: String, required: true });
const password = defineModel('password', { type: String, required: true });
</script>
