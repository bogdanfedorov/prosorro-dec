<template>
  <button
    :style="bg ? bg : 'bg-blue-600'"
    class="bg-blue-600 rounded-md p-2 text-white ml-5" @click="$emit('click')">
    {{ text }}
  </button>
</template>

<script lang="ts">
export default {
  name: 'action-button',
  emits: ['click'],
  props: {
    text: String,
    bg: String,
  }
}
</script>
