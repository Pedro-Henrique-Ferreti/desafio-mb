<template>
  <RegisterCard
    title="Revise suas informações"
    submit-button-text="Cadastrar"
    :form-step="4"
    :is-loading="isLoading"
    @next="validateForm"
    @previous="$emit('previous')"
  >
    <AppInput
      v-model="email"
      type="email"
      label="Endereço de e-mail"
      :dirty="v$.email.$dirty"
      :error-message="v$.email.$errors[0]?.$message"
    />
    <AppInput
      v-model="name"
      :label="isCompany ? 'Razão social' : 'Nome'"
      :dirty="v$.name.$dirty"
      :error-message="v$.name.$errors[0]?.$message"
    />
    <AppInput
      v-model="documentId"
      :label="isCompany ? 'CNPJ' : 'CPF'"
      :mask="isCompany ? '00.000.000/0000-00' : '000.000.000-00'"
      :dirty="v$.documentId.$dirty"
      :error-message="v$.documentId.$errors[0]?.$message"
    />
    <AppInput
      v-model="birthdate"
      type="date"
      :label="isCompany ? 'Data de abertura' : 'Data de nascimento'"
      :dirty="v$.birthdate.$dirty"
      :error-message="v$.birthdate.$errors[0]?.$message"
    />
    <AppInput
      v-model="phoneNumber"
      label="Telefone"
      :mask="Number"
      :dirty="v$.phoneNumber.$dirty"
      :error-message="v$.phoneNumber.$errors[0]?.$message"
    />
    <AppInput
      v-model="password"
      label="Senha"
      type="password"
      :dirty="v$.password.$dirty"
      :error-message="v$.password.$errors[0]?.$message"
    />
  </RegisterCard>
</template>

<script setup>
import useVuelidate from '@vuelidate/core';
import { requiredValidator } from '@/helpers/validators';
import AppInput from './AppInput.vue';
import RegisterCard from './RegisterCard.vue';

const emit = defineEmits(['submit-form', 'previous']);
defineProps({
  isCompany: {
    type: Boolean,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const email = defineModel('email', { type: String, required: true });
const name = defineModel('name', { type: String, required: true });
const documentId = defineModel('document-id', { type: String, required: true });
const birthdate = defineModel('birthdate', { type: String, required: true });
const phoneNumber = defineModel('phone-number', { type: String, required: true });
const password = defineModel('password', { type: String, required: true });

// Validation rules
const v$ = useVuelidate({
  email: { required: requiredValidator },
  name: { required: requiredValidator },
  documentId: { required: requiredValidator },
  birthdate: { required: requiredValidator },
  phoneNumber: { required: requiredValidator },
  password: { required: requiredValidator },
}, { email, name, documentId, birthdate, phoneNumber, password }, { $autoDirty: true });

async function validateForm() {
  if (!await v$.value.$validate()) return;

  emit('submit-form');
}
</script>
