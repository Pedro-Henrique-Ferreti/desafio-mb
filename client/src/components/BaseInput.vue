<template>
  <textarea
    v-if="type === 'textarea'"
    :id="id"
    v-model="inputValue"
    class="base-input base-input--textarea"
    :disabled="disabled"
    @change="handleChange($event.target.value)"
  />
  <input
    v-else-if="mask"
    :id="id"
    ref="input"
    class="base-input"
    type="text"
    :disabled="disabled"
    @blur="handleChange(imaskInstance?.unmaskedValue || '')"
  >
  <input
    v-else
    :id="id"
    v-model="inputValue"
    class="base-input"
    :type="type"
    :disabled="disabled"
    @change="handleChange($event.target.value)"
  >
</template>

<script setup>
import {
  ref,
  watch,
  onMounted,
  computed,
} from 'vue';
import IMask from 'imask';

const emit = defineEmits(['change', 'update:modelValue']);
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'text',
  },
  id: {
    type: String,
    required: true,
  },
  mask: {
    type: [String, RegExp, Function],
    default: '',
  },
  maskOptions: {
    type: Object,
    default: () => ({}),
  },
  modelModifiers: {
    type: Object,
    default: () => ({}),
  },
});

const inputValue = computed({
  get: () => props.modelValue,
  set(value) {
    if (!props.modelModifiers.lazy) {
      emit('update:modelValue', value);
    }
  },
});

function handleChange(value) {
  if (props.modelModifiers.lazy) {
    emit('update:modelValue', value);
  }
}

// IMask setup
const input = ref(null);
let imaskInstance = null;

function setupIMask() {
  if (!props.mask || !input.value) return;

  imaskInstance = IMask(input.value, {
    mask: props.mask,
    ...props.maskOptions,
  });

  imaskInstance.value = props.modelValue;

  if (!props.modelModifiers.lazy) {
    imaskInstance.on('accept', () => {
      emit('update:modelValue', imaskInstance?.unmaskedValue);
    });
  }
}

onMounted(setupIMask);

// Update IMask value when prop modelValue changes
function resetImaskValue() {
  if (imaskInstance) {
    imaskInstance.unmaskedValue = props.modelValue;
  }
}

watch(() => props.modelValue, resetImaskValue);

// Update IMask options when mask changes
watch(() => props.mask, () => {
  if (!imaskInstance) return;
  imaskInstance.updateOptions({ mask: props.mask });
  resetImaskValue();
});
</script>

<style lang="scss" scoped>
.base-input {
  --outline-color: transparent;
  width: 100%;
  min-height: 2.5rem;
  padding: 0 1rem;
  background-color: $color--white;
  color: $color--text;
  border: 1px solid $color--black;
  border-radius: $radius--medium;
  outline: 2px solid var(--outline-color);
  outline-offset: -1px;
  transition:
    outline-color $transition--fastest ease-in,
    border-color $transition--fastest ease-in;
  &.base-input--textarea {
    padding: 0.5rem 1rem;
    min-height: 4rem;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: $color--text;
    box-shadow: 0 0 0 30px $color--white inset !important;
  }
  &:focus {
    --outline-color: #{$color--primary};
  }
  &[type="password"] {
    font-family: Verdana, sans-serif;
    letter-spacing: 0.125em;
  }
}
</style>
