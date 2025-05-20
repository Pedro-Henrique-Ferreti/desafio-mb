<template>
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    class="radio-control"
    style="fill: var(--bg-color)"
    :data-checked="checked"
    :data-disabled="disabled"
  >
    <circle
      cx="12"
      cy="12"
      r="11.5"
      style="stroke: var(--border-color)"
    />
    <circle
      cx="12"
      cy="12"
      r="9"
      style="fill: var(--selection-color)"
    />
  </svg>
</template>

<script setup>
defineProps({
  checked: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.radio-control {
  --bg-color: #{$color--white};
  --border-color: #{$color--black};
  --selection-color: transparent;
  &[data-checked="true"] {
    --border-color: #{$color--black};
    --selection-color: #{$color--black};
  }
}
</style>
