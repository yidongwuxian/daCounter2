import axios from 'axios'
import request from '@/router/axios'
// import Qs from 'Qs'

export function sendSms(data) { //获取手机验证码
	return axios({
		url: '/api/login/sendSms',
		method: 'post',
		data: data
	})
}

export function getSysUserByPhone(data,type) { //手机号重复
	if (type == 'axios') {
		return axios({
			url: '/api/login/getSysUserByPhone',
			method: 'post',
			data: data
		})
	} else if (type == 'request') {
		return request({
			url: '/user/user/getSysUserByInnerPhone',
			method: 'post',
			data: data
		})
	}
}


export function updatePhoneByH5(data) { //绑定手机号
	return request({
		url: '/user/user/updatePhoneByH5',
		method: 'post',
		data: data
	})
}

export function userSignUp(data) { //注册用户
	return axios({
		url: '/api/login/userSignUp',
		method: 'post',
		data: data
	})
}

export function updatePasswordByH5(data, type) { //忘记&修改密码
	if (type == 'axios') {
		return axios({
			url: '/api/login/updatePasswordByH5',
			method: 'post',
			data: data
		})
	} else if (type == 'request') {
		return request({
			url: '/user/user/updatePasswordByInnerH5',
			method: 'post',
			data: data
		})
	}

}


export function loginByH5(data) { //手机号用户登录
	return axios({
		url: '/api/login/loginByH5',
		method: 'post',
		data: data
	})
}

export function getUserInfo(data) { //获取用户信息
	return request({
		url: '/user/user/getUserInfo',
		method: 'get',
		data: data
	})
}

export function updateSysUser(data) { //保存用户头像
	return request({
		url: '/user/user/updateSysUser',
		method: 'post',
		data: data
	})
}

