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

/** 获取所有用户 */
export function getAllUsers() {
  return request({
    url: '/user/getAllUsers',
    method: 'get'
  })
}

/** 新增用户 */
export function addUser(data: any) {
  return request({
    url: '/user/addUser',
    method: 'post',
    data
  })
}

/** 删除用户 */
export function deleteUser(data: any) {
  return request({
    url: '/user/deleteUser',
    method: 'post',
    data: data
  })
}