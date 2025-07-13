export interface IApiPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export const ApiPaginationDefault: IApiPagination = {
  page: 0,
  limit: 0,
  total: 0,
  pages: 0,
  has_next: false,
  has_prev: false,
};
