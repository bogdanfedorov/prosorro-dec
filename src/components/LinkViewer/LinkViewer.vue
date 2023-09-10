<template>
  <button class="bg-blue-600 rounded-md p-2 text-white ml-5" @click="openLink">
    {{ label }}
  </button>
</template>

<script lang="ts">
export default {
  name: "link-viewer",
  props: ["url", "label"],

  defineProps: {
    url: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  methods: {
    openLink() {
      window.open(
        this.url,
        "preview",
        "left=100,top=100,width=1024,height=768"
      );
    },
  },
};
</script>
