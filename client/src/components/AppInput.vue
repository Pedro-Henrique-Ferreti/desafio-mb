<template>
  <div
    class="app-input"
    :data-disabled="disabled"
    :data-valid="showValidState"
    :data-invalid="showInvalidState"
  >
    <label
      v-if="label"
      class="app-input__label"
      :for="elementId"
      v-text="label"
    />
    <div class="app-input__content">
      <BaseInput
        v-bind="$attrs"
        :id="elementId"
        ref="input"
        v-model="inputValue"
        class="app-input__input"
        :type="type"
        :disabled="disabled"
        :aria-label="label ? null : ariaLabel"
        :model-modifiers="modelModifiers"
      />
    </div>
    <small
      v-if="validationMessage"
      class="app-input__validation-message"
      v-text="validationMessage"
    />
    <div class="app-input__support-text">
      <slot name="support-text" />
    </div>
  </div>
</template>

<script setup>
import { computed, useId } from 'vue';
import BaseInput from './BaseInput.vue';

const elementId = useId();

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  modelModifiers: {
    type: Object,
    default: () => ({}),
  },
  type: {
    type: String,
    default: 'text',
  },
  label: {
    type: String,
    default: '',
  },
  ariaLabel: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  successMessage: {
    type: String,
    default: '',
  },
  errorMessage: {
    type: String,
    default: '',
  },
  dirty: {
    type: Boolean,
    default: false,
  },
});

const inputValue = computed({
  get: () => props.modelValue,
  set(value) {
    emit('update:modelValue', value);
  },
});

// Validation state
const showValidState = computed(() => (
  props.dirty
  && !props.errorMessage
  && !!props.successMessage
));
const showInvalidState = computed(() => (props.dirty && !!props.errorMessage));
const validationMessage = computed(() => {
  if (showInvalidState.value) return props.errorMessage;
  if (showValidState.value) return props.successMessage;
  return '';
});
</script>

<style lang="scss" scoped>
.app-input {
  --success-color: #{$color--text};
  --invalid-color: #{$color--text};
  &[data-valid="true"] {
    --validation-message-text-color: var(--success-color);
    .app-input__input:not(:focus) {
      --outline-color: var(--success-color);
    }
  }
  &[data-invalid="true"] {
    --validation-message-text-color: var(--invalid-color);
    .app-input__input:not(:focus) {
      --outline-color: var(--invalid-color);
    }
  }
  &__label {
    display: block;
    margin-bottom: 0.375rem;
    font-size: 0.875rem;
  }
  &__validation-message,
  &__support-text {
    margin-top: 0.75rem;
    font-size: 0.75rem;
  }
  &__validation-message {
    color: var(--validation-message-text-color);
  }
  &__support-text:empty {
    display: none;
  }
}
</style>
