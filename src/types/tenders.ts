import type PaginationResponse from './paginationResponse'

export interface Tender {
  winnerName?: string
  publicationDate?: string
  price?: string | number
  currency?: string
}

export interface TenderResponse {
  tenderID: string
  value: { amount: number, currency: string }
}

export interface TenderPaginationResponse extends PaginationResponse<TenderResponse> {}

export enum DateSort {
  tender = 'tender',
  enquiry = 'enquiry',
  auction = 'auction',
  award = 'award',
}

export type DateSortType = keyof typeof DateSort & undefined

export interface TenderFilter {
  dateStart: Date
  dateEnd: Date
  dateType: string
}
