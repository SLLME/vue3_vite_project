import request from '@/utils/request'
import { DoRequestParams, InvoiceRequestListParams } from './model/invoiceRequestModel'

export function doRequest(params: DoRequestParams) {
  return request({
    url: '/invoiceRequest/doRequest',
    method: 'post',
    params
  })
}

export function list(params: InvoiceRequestListParams) {
  return request({
    url: '/invoiceRequest',
    method: 'get',
    params
  })
}

export function deleteById(id: string) {
  return request({
    url: '/invoiceRequest/' + id,
    method: 'delete'
  })
}

export function insertNew(params: any) {
  return request({
    url: '/invoiceRequest',
    method: 'post',
    data: params
  })
}

export function fetch(id: string) {
  return request({
    url: '/invoiceRequest/' + id,
    method: 'post'
  })
}

export function rerequest(id: string) {
  return request({
    url: '/invoiceRequest/doRerequest/' + id,
    method: 'post'
  })
}

export function getInfoById(id: string) {
  return request({
    url: '/invoiceRequest/' + id,
    method: 'get'
  })
}
