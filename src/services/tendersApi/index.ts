import ProzorroApi from '../prozorroApi'
import { TenderPaginationResponse } from '../../types'
import dayjs from 'dayjs'
import { AxiosRequestConfig } from 'axios'

export async function getTenders(
  page: number,
  dateFilter?: {
    dateStart: Date
    dateEnd: Date
    dateType: string
  },
): Promise<TenderPaginationResponse> {
  const config: AxiosRequestConfig = {
    params: {
      filterType: 'tenders',
      status: ['complete'],
      page: `${page}`,
    },
  }

  if (dateFilter) {
    Object.assign(config.params, {
      [`date[${dateFilter.dateType}][start]`]: dayjs(dateFilter.dateStart).format('YYYY-MM-DD'),
      [`date[${dateFilter.dateType}][end]`]: dayjs(dateFilter.dateEnd).format('YYYY-MM-DD'),
    })
  }
  const response = await ProzorroApi.post('/api/search/tenders', '', config)

  return response.data
}

export async function getTenderHtml(tenderId: string): Promise<string> {
  const response = await ProzorroApi.get(`tender/${tenderId}`)

  return response.data
}
