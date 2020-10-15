import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getters'
import {
	setLocalStorage,
	getLocalStorage,
	removeLocalStorage,
} from '@/utils/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		user
	},
	getters
})
let userToken = getLocalStorage('userToken');
if (userToken) {
	store.commit('SET_USERTOKEN', userToken);
}
export default store
