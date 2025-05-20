<template>
  <span class="register-card__step">
    Etapa <span>{{ formStep }}</span> de 4
  </span>
  <h1 class="register-card__title">
    {{ title }}
  </h1>
  <div class="register-card__fields">
    <slot />
    <div class="register-card__footer">
      <AppButton
        v-if="showPreviousButton"
        class="register-card__footer-button"
        outline
        @click="$emit('previous')"
      >
        Voltar
      </AppButton>
      <AppButton
        class="register-card__footer-button"
        @click="$emit('next')"
      >
        {{ submitButtonText }}
      </AppButton>
    </div>
  </div>
</template>

<script setup>
import AppButton from './AppButton.vue';

defineEmits(['previous', 'next']);
defineProps({
  formStep: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  showPreviousButton: {
    type: Boolean,
    default: true,
  },
  submitButtonText: {
    type: String,
    default: 'Continuar',
  },
});
</script>

<style lang="scss" scoped>
.register-card {
  &__step {
    font-size: 0.875rem;
    > span {
      color: $color--primary;
    }
  }
  &__title {
    margin-top: 0.5rem;
    margin-bottom: 2rem;
    font-size: 1.75rem;
    font-weight: $font-weight--bold;
  }
  &__fields {
    display: grid;
    gap: 1rem;
    max-width: 18rem;
  }
  &__footer {
    display: flex;
    gap: 1rem;
  }
  &__footer-button {
    flex-grow: 1;
    &:not(:first-child) {
      flex-grow: 1.3;
    }
  }
}
</style>
