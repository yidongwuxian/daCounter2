import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {
	getSize
} from './utils/adapt6.js'

import VueAxios from 'vue-axios'
import axios from './router/axios'
Vue.use(VueAxios, axios)
// import '@/permission' // permission control
import '@/styles/iconfont.scss' // iconfont css

import Vant from 'vant';
import 'vant/lib/index.css';
import '@vant/touch-emulator';

import {
	Grid,
	GridItem,
	Icon,
	PullRefresh,
	List,
	Rate,
	Collapse,
	CollapseItem,
	Area,
	Divider,
	Col,
	Row,
	Dialog,
	Toast,
	Notify,
	Stepper,
	Image,
	Search
} from 'vant';


Vue.use(Vant);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Icon);
Vue.use(PullRefresh);
Vue.use(List);
Vue.use(Rate);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Area);
Vue.use(Divider);
Vue.use(Col);
Vue.use(Dialog);
Vue.use(Row);
Vue.use(Toast);
Vue.use(Notify);
Vue.use(Stepper);
Vue.use(Image);
Vue.use(Search);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import '@/styles/index.scss' // global css
import store from './store'

Vue.config.productionTip = false
Vue.mixin({
	mounted() {
		getSize()
	}
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})
// new Vue({
//   render: h => h(App),
// }).$mount('#app')
