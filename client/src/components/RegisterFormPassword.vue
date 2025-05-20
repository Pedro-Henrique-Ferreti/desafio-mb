<template>
  <RegisterCard
    title="Senha de acesso"
    :form-step="3"
    @next="$emit('next')"
    @previous="$emit('previous')"
  >
    <AppInput
      v-model="password"
      label="Sua senha"
    />
  </RegisterCard>
</template>

<script setup>
import AppInput from './AppInput.vue';
import RegisterCard from './RegisterCard.vue';

defineEmits(['next', 'previous']);
const password = defineModel('password', { type: String, required: true });
</script>
