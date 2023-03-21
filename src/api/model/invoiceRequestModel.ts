import { BaseParams } from "./objectModel";

export interface DoRequestParams{
  nsrsbh: string,
  yearMonth: string,
}

export interface InvoiceRequestListParams extends BaseParams{
  invType?: string | undefined,
  rerequest?: string | undefined,
  flag?: string | undefined,
  buyName?: string | undefined,
  buyTaxNo?: string | undefined,
  kprqq?: string | undefined,
  kprqz?: string | undefined,
}