import request from '@/utils/request'

export function list(params: any) {
  return request({
    url: '/nsrsbhs',
    method: 'get',
    params
  })
}

export function deleteById(id: string) {
  return request({
    url: '/nsrsbhs/' + id,
    method: 'delete'
  })
}

export function insertNew(data: any) {
  return request({
    url: '/nsrsbhs',
    method: 'post',
    data
  })
}
