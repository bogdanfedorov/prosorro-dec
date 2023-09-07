import ProzorroApi from "../prozorroApi";
import {TenderPaginationResponse} from "../../types";

export async function getTenders(page: number): Promise<TenderPaginationResponse> {
  const response = await ProzorroApi.post('/api/search/tenders', '', {
    params: {
      filterType: 'tenders',
      status: ['complete'],
      page: `${page + 1}`,
      sort_by: 'value.amount',
      order: 'desc',
      datestart: '2021-01-01',
      dateend: '2021-01-31'
    }
  })

  return response.data;
}

export async function getTenderHtml(tenderId: string): Promise<string> {
  const response = await ProzorroApi.get(`tender/${tenderId}`)

  return response.data;
}
