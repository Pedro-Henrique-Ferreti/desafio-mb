<template>
  <button
    class="button"
    :type="type"
    :disabled="disabled"
    :data-outline="outline"
    :data-loading="isLoading"
    @click="handleClick"
  >
    <div class="button__content-wrapper">
      <div class="button__content">
        <slot />
      </div>
      <!-- <IconSpinner
        class="button__icon-loader"
        size="24"
      /> -->
    </div>
  </button>
</template>

<script setup>
// import IconSpinner from './IconSpinner.vue';

const emit = defineEmits(['click']);
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  outline: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'button',
  },
});

function handleClick(event) {
  if (props.isLoading) {
    event.preventDefault();
    return;
  }

  emit('click', event);
}
</script>

<style lang="scss" scoped>
.button {
  --height: 2.5rem;
  // --loader-indicator-color: #{$color--text-strong};

  &[data-loading="true"] {
    cursor: default;
    .button__icon-loader,
    .button__content {
      transform: translateY(calc(var(--height) * -1));
    }
  }

  display: inline-flex;
  justify-content: center;
  width: fit-content;
  height: var(--height);
  padding: 0 1.25rem;
  background-color: var(--bg-color);
  color: var(--text-color);
  border-radius: $radius--medium;
  cursor: pointer;
  transition:
    background-color $transition--fast ease-in,
    color $transition--fast ease-in,
    border-color $transition--fast ease-in;
  &:hover:not([data-loading="true"]) {
    background-color: var(--hover-bg-color, var(--bg-color));
    color: var(--hover-text-color, var(--text-color));
  }
  &[data-outline="true"] {
    border: 1px solid var(--border-color);
    &:hover:not([data-loading="true"]) {
      border-color: var(--hover-border-color, var(--border-color));
    }
  }
  &__content-wrapper {
    height: 100%;
    overflow: hidden;
  }
  &__icon-loader {
    --track-color: transparent;
    --indicator-color: var(--loader-indicator-color);
  }
  &__icon-loader,
  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    transition: $transition--1;
  }

  &[data-outline="false"] {
    --bg-color: #{$color--primary};
    --text-color: #{$color--white};
    --hover-bg-color: #{$color--primary};
  }
  &[data-outline="true"] {
    --text-color: #{$color--primary};
    --border-color: #{$color--primary};
    --bg-color: #{$color--white};
    --hover-bg-color: #{$color--primary};
    --hover-text-color: #{$color--white};
  }
}
</style>
