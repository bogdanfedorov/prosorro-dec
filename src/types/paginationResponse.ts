export default interface PaginationResponse<T> {
  total: number
  data: T[]
}
