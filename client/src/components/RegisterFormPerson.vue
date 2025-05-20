<template>
  <RegisterCard
    :title="isCompany ? 'Pessoa Jurídica' : 'Pessoa Física'"
    :form-step="2"
    @next="validateForm"
    @previous="$emit('previous')"
  >
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
  </RegisterCard>
</template>

<script setup>
import useVuelidate from '@vuelidate/core';
import { documentIdValidator, requiredValidator } from '@/helpers/validators';
import AppInput from './AppInput.vue';
import RegisterCard from './RegisterCard.vue';

const emit = defineEmits(['next', 'previous']);
const props = defineProps({
  isCompany: {
    type: Boolean,
    required: true,
  },
});

const name = defineModel('name', { type: String, required: true });
const documentId = defineModel('document-id', { type: String, required: true });
const birthdate = defineModel('birthdate', { type: String, required: true });
const phoneNumber = defineModel('phone-number', { type: String, required: true });

// Validation rules
const v$ = useVuelidate({
  name: { required: requiredValidator },
  documentId: {
    required: requiredValidator,
    documentIdValidator: documentIdValidator(props.isCompany),
  },
  birthdate: { required: requiredValidator },
  phoneNumber: { required: requiredValidator },
}, { name, documentId, birthdate, phoneNumber }, { $autoDirty: true });

async function validateForm() {
  if (!await v$.value.$validate()) return;

  emit('next');
}
</script>
