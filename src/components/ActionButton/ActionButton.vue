<template>
  <button
    :disabled="disabled"
    :style="bg ? bg : 'bg-blue-600'"
    class="bg-blue-600 rounded-md p-2 text-white h-10 disabled:bg-gray-400"
    @click="$emit('click')"
  >
    {{ text }}
  </button>
</template>

<script lang="ts">
export default {
  name: 'action-button',
  emits: ['click'],
  props: ['text', 'bg', 'disabled'],

  defineProps: {
    text: {
      type: String,
      required: true,
    },
    bg: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>
