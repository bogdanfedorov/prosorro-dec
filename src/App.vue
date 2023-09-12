<script setup lang="ts">
import ActionButton from './components/ActionButton/ActionButton.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import TendersTable from './components/TendersTable/TendersTable.vue'
</script>

<template>
  <header class="flex flex-col m-5">
    <div class="flex flex-row">
      <span class="inline-block">Сортувати по : </span>
      <select
        class="border rounded pl-[10px] pr-[30px] pt-[6px] pb-[6px] h-[38px]"
        v-model="dateSort"
      >
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.text }}
        </option>
      </select>
      <div class="w-[350px]">
        <vue-date-picker class="ml-2" v-model="dateRange" range :partial-range="false" fixed-end />
      </div>
      <div class="ml-2">
        <action-button
          :disabled="dateSort === undefined"
          text="застосувати фільтр"
          @click="applyFilters"
        />
      </div>
    </div>
    <div class="flex flex-row mt-2">
      <action-button text="Завантажити наступні" @click="loadNexPage" />
      <action-button text="Показати вибрані" @click="showSelected" class="ml-2" />
    </div>
    <div class="flex flex-col mt-2">
      <span>Остання завантаженна сторінка: {{ currentPage - 1 }}</span>
      <span
        >Всього завантаженно: {{ tendersMap.size }}/{{ totalItems }}
        {{ formatAsPercent(tendersMap.size, totalItems) }}
      </span>
    </div>
  </header>

  <div class="m-5">
    <main>
      <tenders-table :items="tendersMap" />
    </main>
  </div>
</template>

<script lang="ts">
import { getTenderHtml, getTenders } from './services/tendersApi'
import { TendersConvertor } from './services/tendersApi/convertor.ts'
import dayjs from 'dayjs'
import { type Tender } from './types'
import { DateSort, type TenderResponse } from './types/tenders.ts'

export default {
  data () {
    const dateStart = dayjs().add(-1, 'month').toDate()
    const dateEnd = dayjs().toDate()

    return {
      tendersMap: new Map<string, Tender>(),

      dateRange: [dateStart, dateEnd],
      dateSort: undefined,
      options: [
        { text: 'Нічого', value: undefined },
        { text: 'Аукціон', value: DateSort.auction },
        { text: 'Відбори', value: DateSort.award },
        { text: 'Дата уточнень', value: DateSort.enquiry },
        { text: 'Дата прийому позиції', value: DateSort.tender }
      ],

      currentPage: 1,
      totalItems: 0,
      selectedTenders: new Set<string>(),
      visitTenders: new Set<string>()
    }
  },
  methods: {
    async loadItems (): Promise<void> {
      this.$emit('isLoading')

      const dateFilter = this.getDateFilter()
      const tendersResponse = await getTenders(this.currentPage, dateFilter)

      this.$emit('isLoadingDone')

      this.mapTenders(tendersResponse.data)

      this.totalItems = tendersResponse.total
    },

    async applyFilters (): Promise<void> {
      this.currentPage = 1
      this.tendersMap.clear()

      await this.loadItems()
    },

    getDateFilter () {
      let dateFilter
      if (this.dateSort !== undefined) {
        dateFilter = {
          dateStart: this.dateRange[0],
          dateEnd: this.dateRange[1],
          dateType: this.dateSort
        }
      }
      return dateFilter
    },

    mapTenders (tenders: TenderResponse[]): Array<Promise<void>> {
      return tenders.map(async (tender) => {
        this.tendersMap.set(tender.tenderID, {
          price: tender.value.amount,
          currency: tender.value.currency
        })
        await this.loadMoreInfo(tender.tenderID)
      })
    },

    priceFormat (price: string, currency: string) {
      const normalizePrice = price.replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ')
      return `${normalizePrice} ${currency}`
    },

    async loadMoreInfo (tenderID: string) {
      const html = await getTenderHtml(tenderID)

      const parsedHtml = new TendersConvertor(html)
      const winnerName = parsedHtml.getWinnerName()
      const publicationDate = parsedHtml.getPublicationDate()

      this.tendersMap.set(tenderID, {
        ...this.tendersMap.get(tenderID),
        winnerName,
        publicationDate
      })
    },

    async loadNexPage () {
      this.currentPage += 1

      await this.loadItems()
    },

    selectedTender (tenderID: string) {
      if (this.selectedTenders.has(tenderID)) {
        this.selectedTenders.delete(tenderID)
      } else {
        this.selectedTenders.add(tenderID)
      }
    },

    showSelected () {
      alert(
        `Selected tenders: ${this.selectedTenders.size}\n${[...this.selectedTenders].join('\n')}`
      )
    },

    formatAsPercent (num1: number = 1, num2: number = 1) {
      const percent = (num1 / num2) * 100
      if (Number.isNaN(percent)) {
        return '100%'
      }
      return `${percent.toFixed(2)}%`
    }
  }
}
</script>
