import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins';

Vue.config.productionTip = false;

//设置全局路由首位，判断当前是否存在账号信息，若存在，则进行下一步，若不存在，则验证当前是否登录，若验证不通过跳转登录页面
router.beforeEach((to, from, next) => {
	if (to.name === 'login') {
		next();
	} else {
		if (
			!store.state.users.userInfo ||
			Object.keys(store.state.users.userInfo).length === 0 ||
			!store.state.users.userInfo.userId
		) {
			if (localStorage.getItem('WEBSHOPLOGIN')) {
				const dataStr = decodeURIComponent(escape(atob(localStorage.getItem('WEBSHOPLOGIN'))));
				const index = dataStr.lastIndexOf('&&');
				const str = dataStr.substring(0, index);
				const time = dataStr.substring(index + 2, dataStr.length);
				const now = new Date().getTime();
				//判断时间，有效期为一小时，一小时之后需要重新登录
				if (now - parseInt(time) > 60 * 60 * 1000) {
					localStorage.removeItem('WEBSHOPLOGIN');
					router.push({
						name: 'login'
					});
					return;
				}
				const userInfo = JSON.parse(str);
				store.dispatch('users/setUserInfo', userInfo);
				next();
			} else {
				router.push({
					name: 'login'
				});
				next();
			}
		} else {
			next();
		}
	}
});

let app = new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
