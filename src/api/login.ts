import request from "@/utils/request"
import { LoginParams } from "./model/loginModel"

/** 登录 */
export function login(data:LoginParams) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

/** 退出 */
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getAllUsers() {
  return request({
    url: '/user/getAllUsers',
    method: 'get'
  })
}

export function addUser(data: any) {
  return request({
    url: '/user/addUser',
    method: 'post',
    data
  })
}

export function deleteUser(data: any) {
  return request({
    url: '/user/deleteUser',
    method: 'post',
    data: data
  })
}