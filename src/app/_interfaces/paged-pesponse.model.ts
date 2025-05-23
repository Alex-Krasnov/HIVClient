export interface PagedResponse<T> {

    pageNumber: number
    pageSize: number
    totalCount: number
    data: T[]
}