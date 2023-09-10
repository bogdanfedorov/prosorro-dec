<template>
  <span> {{ priceFormat(price, currency) }}</span>
</template>

<script lang="ts">
export default {
  props: ["currency", "price"],

  defineProps: {
    currency: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  methods: {
    priceFormat(price: string | number = 0, currency: string = "$") {
      const priseRegexp = /(?!^)(?=(?:\d{3})+(?:\.|$))/gm; // 1234567.89 => 1 234 567.89
      const normalizePrice = price.toString().replace(priseRegexp, " ");

      return `${normalizePrice} ${currency}`;
    },
  },
};
</script>
