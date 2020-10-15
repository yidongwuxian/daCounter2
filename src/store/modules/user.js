import {
	loginByH5
} from '@/api/account'
import {
	setLocalStorage,
	getLocalStorage,
	removeLocalStorage,
} from '@/utils/auth'

const user = {
	state: {
		userToken: '',
		bindStatus:''
	},

	mutations: {
		SET_USERTOKEN: (state, userToken) => {
			state.userToken = userToken
		},
		SET_BINDSTATUS:(state,bindStatus)=>{
			state.bindStatus = bindStatus
		}
	},
	actions: {
		Login({
			commit
		}, option) {
			// console.log(option)
			return new Promise((resolve, reject) => {
				loginByH5(option).then(response => {
					
					if(response.data.isSuccess=='true'){
						setLocalStorage('userToken', response.data.userToken)
						commit('SET_USERTOKEN', response.data.userToken)
						
						setLocalStorage('bindStatus', response.data.bindStatus)
						commit('SET_BINDSTATUS', response.data.bindStatus)

					}
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		// 登出
		LogOut({
			commit,
			state
		}) {
			return new Promise((resolve, reject) => {
				// console.log(getLocalStorage('userToken'))
				logout(getLocalStorage('userToken')).then(() => {
					commit('SET_USERTOKEN', '')
					removeLocalStorage('userToken')

					commit('SET_BINDSTATUS', '')
					removeLocalStorage('bindStatus')

					resolve()
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		// 前端 登出
		FedLogOut({
			commit
		}) {
			return new Promise((resolve, reject) => {
				
				commit('SET_USERTOKEN', '')
				removeLocalStorage('userToken')

				commit('SET_BINDSTATUS', '')
				removeLocalStorage('bindStatus')

				resolve()
				
			})
		},



	}
}

export default user
