import request from '@/utils/request'

export function list(params: any) {
  return request({
    url: '/query/upload/vehicle',
    method: 'get',
    params
  })
}

export function deleteById(id: string) {
  return request({
    url: '/query/upload/vehicle/' + id,
    method: 'delete'
  })
}

export function insertNew(params: any) {
  return request({
    url: '/query/upload/vehicle',
    method: 'post',
    data: params
  })
}

export function fetch(id: string) {
  return request({
    url: '/query/upload/vehicle/' + id,
    method: 'post'
  })
}

export function rerequest(id: string) {
  return request({
    url: '/query/upload/vehicle/doRerequest/' + id,
    method: 'post'
  })
}

export function getInfoById(id: string) {
  return request({
    url: '/query/upload/vehicle/' + id,
    method: 'get'
  })
}
