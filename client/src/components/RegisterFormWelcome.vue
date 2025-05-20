<template>
  <RegisterCard
    title="Seja bem-vindo(a)"
    :show-previous-button="false"
    :form-step="1"
    @next="$emit('next')"
  >
    <AppInput
      v-model="email"
      label="Endereço de e-mail"
    />
  </RegisterCard>
</template>

<script setup>
import AppInput from './AppInput.vue';
import RegisterCard from './RegisterCard.vue';

defineEmits(['next']);
const email = defineModel('email', { type: String, required: true });
</script>
