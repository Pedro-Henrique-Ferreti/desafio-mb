<template>
  <RegisterCard
    title="Senha de acesso"
    :form-step="3"
    @next="validateForm"
    @previous="$emit('previous')"
  >
    <AppInput
      v-model="password"
      label="Sua senha"
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

const emit = defineEmits(['next', 'previous']);

const password = defineModel('password', { type: String, required: true });

// Validation rules
const v$ = useVuelidate({
  password: { required: requiredValidator },
}, { password }, { $autoDirty: true });

async function validateForm() {
  if (!await v$.value.$validate()) return;

  emit('next');
}
</script>
