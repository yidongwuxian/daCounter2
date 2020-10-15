/**
 *
 * http配置
 *
 */

import axios from 'axios'
import store from '../store'
import router from './index'
import {
	getLocalStorage,
} from '@/utils/auth'
// import {
//   Message,Loading
// } from 'element-ui'
// import errorCode from '@/const/errorCode'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

// 创建axios实例
// 超时时间
const service = axios.create({
	//baseURL: isPro ? 'process.prod.BASE_API' : '',// api 的 base_url
	timeout: 50000 // 请求超时时间
})
// 跨域请求，允许保存cookie
// axios.defaults.withCredentials = true
// // var loadinginstace
// NProgress.configure({
//   showSpinner: false
// }) // NProgress Configuration
// let msg
// HTTPrequest拦截
service.interceptors.request.use(config => {

	NProgress.start() // start progress bar
	if (store.getters.userToken) {
		config.headers['userToken'] = getLocalStorage('userToken')
	} else {
		router.push({
			path: '/login'
		})
	}
	// config.headers['source'] = 'admin' // 系统标识
	return config
}, error => {
	// if (config.headers.showLoading !== false) {
	//     loadinginstace.close()
	// }
	return Promise.reject(error)
})
// HTTPresponse拦截
service.interceptors.response.use(data => {
	console.log(data)
	NProgress.done()
	// if (data.config.headers.showLoading !== false) {
	//     loadinginstace.close()
	// }
	// if(data.status === 200 && (data.data !== undefined && data.data.code !== undefined && data.data.code > 1000)) {
	//    let code = data.data.code
	//    let msg = data.data.msg
	//  console.log(msg);
	//    Message({
	//      message: msg || errorCode['default'],
	//      type: 'error'
	//    })
	//    return Promise.reject(msg)
	// } else {
	//  return data
	// }
	// } else {
	//  return data
	// }
	return data
}, error => {
	NProgress.done()
	// console.log(21312)
	// console.log(error)
	// if (error.config.headers.showLoading !== false) {
	//     loadinginstace.close()
	// }
	console.log('error.response.data==' + JSON.stringify(error.response.data))
	if (error.response.data && error.response.data.resultFlag == 401) { // 自定义异常
		router.push({
			path: '/login'
		})
		return Promise.reject(error.response.data.body)
	} else {
		let errMsg = error.toString()
		let code = errMsg.substr(errMsg.indexOf('code') + 5)
		// Message({
		//   message: errorCode[code] || errorCode['default'],
		//   type: 'error'
		// })
		return Promise.reject(new Error(error))
	}
})

export default service
