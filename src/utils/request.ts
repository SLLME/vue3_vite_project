import axios from 'axios'
import { getToken } from '@/utils/auth'
import { message, Modal, Button } from 'ant-design-vue'

// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 80000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (getToken()) {
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.errcode != 0) {
      message.open({
        content: res.message || 'Error',
        type: 'error',
        duration: 5
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        Modal.confirm({
          content: 'You have been logged out, you can cancel to stay on this page, or log in again',
          title: 'Confirm logout',
          cancelText: 'Cancel',
          okText: 'Re-login',
          onOk: () => {
            // store.dispatch('user/resetToken').then(() => {
            //   location.reload()
            // })
          }
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    message.open({
      content: error.message,
      type: 'error',
      duration: 5
    })
    return Promise.reject(error)
  }
)

export default service
