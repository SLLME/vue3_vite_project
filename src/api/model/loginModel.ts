
export interface LoginParams{
  username: string,
  password: string,
  code?: string
}

export interface ResponseData{
  data?: any,
  errcode?: number,
  errmsg?: string
}