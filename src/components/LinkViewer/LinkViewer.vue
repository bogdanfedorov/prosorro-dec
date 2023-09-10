<template>
  <button
      class="bg-blue-600 rounded-md p-2 text-white ml-5"
      @click="openLink">
    {{ label }}
  </button>
</template>

<script lang="ts">
export default {
  name: 'link-viewer',
  props: ['url', 'label'],

  defineProps: {
    url: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    }
  },
  methods: {
    openLink() {
      window.open(this.url, 'preview', 'width=1200,height=100');
    }
  }
}
</script>
