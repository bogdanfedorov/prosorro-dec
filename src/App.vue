<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import ActionButton from "./components/buttons/ActionButton.vue";
import '@vuepic/vue-datepicker/dist/main.css';
</script>

<template>
  <div class="m-5">
    <header class="flex flex-col ml-5">
      <div class="flex flex-row">
        <div class="w-[350px]">
          <vue-date-picker v-model="dataRange" range :partial-range="false" fixed-end/>
        </div>
        <action-button text="Завантажети наступні" @click="loadNexItems"/>
        <action-button text="Показати вибрані" @click="showSelected"/>
      </div>
      <div class="flex flex-col">
        <span>Остання завантаженна сторінка: {{ currentPage }}</span>
        <span>Всього завантаженно:
          {{ tendersMap.size }}/{{ totalItems }}
          {{ formatAsPercent(tendersMap.size, totalItems) }} </span>
      </div>
    </header>

    <table class="table-auto mt-5 w-full">
      <thead>
      <tr>
        <th>Айді</th>
        <th>Переможець</th>
        <th>Дата</th>
        <th>Ціна</th>
        <th>Взаємодія</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="[key, value] in tendersMap.entries()"
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
          <span>{{ value.price }}</span>
        </td>
        <td class="flex flex-row">
          <action-button text="Посилання" @click="openLink(key)"/>
          <action-button text="Вибрати" @click="selectedTender(key)"/>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import {getTenderHtml, getTenders} from "./services/tendersApi";
import {TendersConvertor} from "./services/tendersApi/convertor.ts";
import {Tender} from "./types";

export default {
  data() {
    return {
      tendersMap: new Map<string, Tender>(),
      dataRange: [new Date(), new Date()],
      currentPage: 0,
      totalItems: 0,
      selectedTenders: new Set<string>(),
      visitTenders: new Set<string>(),
    }
  },
  methods: {
    async loadItems() {
      const tendersResponse = await getTenders(this.currentPage);

      tendersResponse.data.map((tender) => {
        this.tendersMap.set(tender.tenderID, {
          price: this.priceFormat(tender.value.amount.toString(), tender.value.currency),
        });
        this.loadMoreInfo(tender.tenderID);
      });

      this.totalItems = tendersResponse.total;
    },

    priceFormat(price: string, currency: string) {
      const normalizePrice = price.replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ')
      return `${normalizePrice} ${currency}`
    },

    async loadMoreInfo(tenderID: string) {
      const html = await getTenderHtml(tenderID);

      const parsedHtml = new TendersConvertor(html);

      const winnerName = parsedHtml.getWinnerName();
      const publicationDate = parsedHtml.getPublicationDate();

      this.tendersMap.set(tenderID, {
        ...this.tendersMap.get(tenderID),
        winnerName,
        publicationDate,
      })
    },

    async loadNexItems() {
      this.currentPage += 1;

      await this.loadItems()
    },

    selectedTender(tenderID: string) {
      if (this.selectedTenders.has(tenderID)) {
        this.selectedTenders.delete(tenderID)
        return
      }
      this.selectedTenders.add(tenderID)
    },

    showSelected() {
      alert(`Selected tenders: ${this.selectedTenders.size}\n${[...this.selectedTenders].join('\n')}`)
    },

    openLink(tenderID: string) {
      this.visitTenders.add(tenderID);
      window.open(`https://prozorro.gov.ua/tender/${tenderID}`, 'preview', 'width=600,height=500');
    },

    formatAsPercent(num1: number, num2: number) {
      return `${(num1 / num2 * 100).toFixed(2)}%`;
    }
  }
}
</script>
