import PaginationResponse from './paginationResponse';

export interface Tender {
    winnerName?: string;
    publicationDate?: string;
    price?: string;
}

interface TenderResponse {
    tenderID: string;
    value: { amount: number; currency: string };
}

export interface TenderPaginationResponse extends PaginationResponse<TenderResponse> {
}
