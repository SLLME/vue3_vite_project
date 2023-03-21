export interface ObjectModel{
  [key: string]: any
}

/** 基础分页请求参数 */
export interface BaseParams{
  page: number,
  pageSize: number
}