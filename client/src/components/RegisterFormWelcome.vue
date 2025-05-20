<template>
  <RegisterCard
    title="Seja bem-vindo(a)"
    :show-previous-button="false"
    :form-step="1"
    @next="validateForm"
  >
    <AppInput
      v-model="email"
      type="email"
      label="Endereço de e-mail"
      :dirty="v$.email.$dirty"
      :error-message="v$.email.$errors[0]?.$message"
    />
    <div class="radio-wrapper">
      <AppRadioInput
        v-model="registerType"
        text="Pessoa física"
        :value="RegisterType.PERSON"
      />
      <AppRadioInput
        v-model="registerType"
        text="Pessoa jurídica"
        :value="RegisterType.COMPANY"
      />
    </div>
  </RegisterCard>
</template>

<script setup>
import useVuelidate from '@vuelidate/core';
import { emailValidator, requiredValidator } from '@/helpers/validators';
import AppInput from './AppInput.vue';
import RegisterCard from './RegisterCard.vue';
import AppRadioInput from './AppRadioInput.vue';
import { RegisterType } from '@/constants/register';

const emit = defineEmits(['next']);

const email = defineModel('email', { type: String, required: true });
const registerType = defineModel('register-type', { type: String, required: true });

// Validation rules
const v$ = useVuelidate({
  email: {
    required: requiredValidator,
    email: emailValidator,
  },
}, { email }, { $autoDirty: true });

async function validateForm() {
  if (!await v$.value.$validate()) return;

  emit('next');
}
</script>

<style scoped>
.radio-wrapper {
  display: flex;
  gap: 1rem;
}
</style>
