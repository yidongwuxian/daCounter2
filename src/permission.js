import router from '@/router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import {
	getLocalStorage
} from '@/utils/auth' // 验权
router.beforeEach((to, from, next) => {
	// NProgress.start()
	// //是否需要验证权限
	if (to.meta.notrequireAuth) {
		next()
	} else {
		if (getLocalStorage('userToken')) {
			if (to.meta.nobindStatus) {
				next()
			} else {
				if (getLocalStorage('bindStatus')) {
					if (getLocalStorage('bindStatus') == "0") {
						next({
							path: '/boundPhone'
						})
					} else if (getLocalStorage('bindStatus') == "1") {
						next()
					} else if (getLocalStorage('bindStatus') == "2") {
						next({
							path: '/boundPhone'
						})
					} else if (getLocalStorage('bindStatus') == "3") {
						next({
							path: '/boundWexin'
						})
					}
				} else {
					next({
						path: '/login'
					})
				}

			}
		} else {
			next({
				path: '/login'
			})
		}
	}

})

router.afterEach(() => {
	NProgress.done() // 结束Progress
})
