import request from '@/utils/request'

// export function doRequest(params) {
//   return request({
//     url: '/query/upload/invoice',
//     method: 'post',
//     params
//   })
// }

export function list(params:any) {
  return request({
    url: '/query/upload/invoice',
    method: 'get',
    params
  })
}

// export function deleteById(id) {
//   return request({
//     url: '/query/upload/invoice/' + id,
//     method: 'delete'
//   })
// }

// export function insertNew(params) {
//   return request({
//     url: '/query/upload/invoice',
//     method: 'post',
//     data: params
//   })
// }

// export function fetch(id) {
//   return request({
//     url: '/query/upload/invoice/' + id,
//     method: 'post'
//   })
// }

// export function rerequest(id) {
//   return request({
//     url: '/query/upload/invoice/doRerequest/' + id,
//     method: 'post'
//   })
// }

// export function getInfoById(id) {
//   return request({
//     url: '/query/upload/invoice/' + id,
//     method: 'get'
//   })
// }
