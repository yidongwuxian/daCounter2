import {
	getSysUserByPhone
} from '@/api/account'
export function isvalidUsername(str) {
	const valid_map = ['admin', 'editor']
	return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
	const urlregex =
		/^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
	return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
	const reg = /^[a-z]+$/
	return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
	const reg = /^[A-Z]+$/
	return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
	const reg = /^[A-Za-z]+$/
	return reg.test(str)
}

/* 手机号*/
export function ismobile(value) {
	if (!value) {
		return false;
	}
	var pattern = /^1[34578]\d{9}$/
	if (pattern.test(value)) {
		return true
	}
	return false
}

/** 这个文件只允许放表单验证方法 **/

export function isRequired(value) {
	var reg = /^[\s\S]*.*[^\s][\s\S]*$/
	return reg.test(value)
}
//验证手机号格式
export async function isPhone(value, option) {
	if (value === '') {
		return {
			flag: false,
			errMsg: '请输入手机号'
		}
	} else {
		var reg = /^1[34578]\d{9}$/;
		if (!reg.test(value)) {
			return {
				flag: false,
				errMsg: '手机号格式错误'
			}
		} else {
			let data = await getSysUserByPhone({
				'phone': value,
				'callType': option.callType
			}, option.type).then(response => {
				console.log(response)
				if (response.data.resultFlag == "success") {
					return {
						flag: true,
						errMsg: ''
					}
				} else {
					return {
						flag: false,
						errMsg: response.data.body
					}
				}
			})
			return data
		}

	}
}
//验证用户名
export async function isUsername(value, option) {
	if (value === '') {
		return {
			flag: false,
			errMsg: '请输入账号'
		}
	} else {
		var reg = /^[a-zA-Z0-9]{1,10}$/;
		if (!reg.test(value)) {
			return {
				flag: false,
				errMsg: '仅支持1-10位数字和字母'
			}
		} else {
			let data = await getSysUserByPhone({
				'username': value,
				'callType': option.callType
			}, option.type).then(response => {
				console.log(response)
				if (response.data.resultFlag == "success") {
					return {
						flag: true,
						errMsg: ''
					}
				} else {
					return {
						flag: false,
						errMsg: response.data.body
					}
				}
			}).catch(err=>{
				return {
					flag: false,
					errMsg: '请重试'
				}
			})
			return data
		}

	}
}

//验证6位数
export function isSmsCode(value, option) {
	console.log(option)
	if (!value) {
		return {
			flag: false,
			errMsg: '请输入验证码'
		}
	} else {
		var reg = /^\d{6}$/;
		if (!reg.test(value)) {
			return {
				flag: false,
				errMsg: '验证码格式错误'
			}
		} else {
			return {
				flag: true,
				errMsg: ''
			}
		}
	}
}

//密码验证
export function isPassword(value, option) {
	if (value === '') {
		return {
			flag: false,
			errMsg: '请输入密码'
		}
	} else {
		var reg = new RegExp("^[^\\s]{0,}$");
		if (!reg.test(value)) {
			return {
				flag: false,
				errMsg: '不能输入空格'
			}
		} else {
			var reg = new RegExp("^(?=.*\\d)(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\\s\\u4e00-\\u9fa5]{6,16}$");
			if (!reg.test(value)) {
				return {
					flag: false,
					errMsg: '6-16位密码，数字、字母、符号至少包含两种'
				}
			} else {
				return {
					flag: true,
					errMsg: ''
				}
			}
		}
	}
}
//密码二次验证
export function isPassword1(value, option) {
	if (value === '') {
		return {
			flag: false,
			errMsg: '请再次输入密码'
		}
	} else if (value !== option.password) {
		return {
			flag: false,
			errMsg: '两次输入密码不一致！'
		}
	} else {
		return {
			flag: true,
			errMsg: ''
		}
	}
}
