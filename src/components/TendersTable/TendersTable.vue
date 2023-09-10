<script setup lang="ts">
import ActionButton from "../ActionButton/ActionButton.vue";
import CurrencyPrice from "../CurrencyPrice/CurrencyPrice.vue";
import LinkViewer from "../LinkViewer/LinkViewer.vue";
</script>

<template>
  <table class="table-auto mt-5 w-full">
    <thead>
    <tr>
      <th class="border-black border-2">Айді</th>
      <th class="border-black border-2">Переможець</th>
      <th class="border-black border-2">Дата</th>
      <th class="border-black border-2"
          @click="clickSort('price')">
        Ціна <span v-if="sorted.key === 'price'">{{ sorted.order }}</span>
      </th>
      <th class="border-black border-2">Взаємодія</th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="[key, value] in sortedItems.entries()"
        :key="key"
        :style='selectedTenders.has(key)? {"background-color": "lightblue"} : {"background-color": "white"}'
        class="h-10 mt-5 :hover:bg-gray-100"
    >
      <td>
        {{ key }}
      </td>
      <td>
        {{ value.winnerName }}
      </td>
      <td>
        {{ value.publicationDate }}
      </td>
      <td>
        <currency-price :price="value.price" :currency="value.currency"/>
      </td>
      <td class="flex flex-row">
        <link-viewer :url="linkGenerator(key)" label="Відкрити"/>
        <action-button text="Вибрати" @click="selectedTender(key)"/>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import {Tender} from "../../types";

export default {
  emits: ['selectedTender'],
  props: ['items'],

  defineProps: {
    items: {
      type: Map<string, Tender>,
      required: true,
    }
  },
  data() {
    return {
      selectedTenders: new Set<string>(),
      sorted: {
        key: undefined as string | undefined,
        order: undefined as '↓' | '↑' | undefined,
      },
      sortedItems: this.items as Map<string, Tender>,
    }
  },
  methods: {
    linkGenerator(tenderID: string) {
      return `https://prozorro.gov.ua/tender/${tenderID}`
    },
    selectedTender(tenderID: string) {
      if (this.selectedTenders.has(tenderID)) {
        this.selectedTenders.delete(tenderID)
      } else {
        this.selectedTenders.add(tenderID)
      }

      this.$emit('selectedTender', tenderID)
    },

    clickSort(key: string) {
      if(this.items.size === 0) return

      let  itemList = [...this.items.entries()]
      if (this.sorted.key === key) {
        if (this.sorted.order === undefined) {
          this.sorted.order = '↓'
          itemList = itemList.sort((a, b) => b[1].price - a[1].price)
        } else if (this.sorted.order === '↓') {
          this.sorted.order = '↑'
          itemList = itemList.sort((a, b) => a[1].price - b[1].price)
        } else if (this.sorted.order === '↑') {
          this.sorted.order = undefined
        }
      } else {
        this.sorted.key = key
        this.sorted.order = '↓'
        itemList = itemList.sort((a, b) => b[1].price - a[1].price)
      }

      this.sortedItems = new Map<string, Tender>(itemList)
    }
  }
}

</script>