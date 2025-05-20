<template>
  <div class="app-radio">
    <label
      class="app-radio__label"
      :for="elementId"
    >
      <input
        v-model="inputValue"
        class="app-radio__input"
        type="radio"
        :value="value"
        :id="elementId"
        :disabled="disabled"
      />
      <IconRadioControl
        class="app-radio__control-icon"
        :checked="isChecked"
        :disabled="disabled"
      />
      <div class="app-radio__text-wrapper">
        <slot>
          <span>{{ text }}</span>
        </slot>
      </div>
    </label>
  </div>
</template>

<script setup>
import { computed, useId } from 'vue';
import IconRadioControl from './IconRadioControl.vue';

const elementId = useId();

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  value: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const inputValue = defineModel('modelValue', { type: String, default: '' });

const isChecked = computed(() => inputValue.value === props.value);
</script>

<style lang="scss" scoped>
.app-radio {
  width: fit-content;
  &__label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    position: relative;
  }
  &__input {
    width: 0;
    height: 0;
    opacity: 0;
    position: absolute;
    &:focus-visible + .app-radio__control-icon {
      outline: 0.125rem solid black;
      outline-offset: 0.25rem;
    }
  }
  &__control-icon {
    flex-shrink: 0;
    cursor: pointer;
  }
}
</style>
