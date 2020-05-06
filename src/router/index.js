import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'index',
		component: () => import('@/views/index'),
		redirect: '/home',
		children: [
			{
				path: 'home',
				name: 'home',
				component: () => import('@/views/home')
			},
			{
				path: 'search',
				name: 'search',
				component: () => import('@/views/home/search')
			},
			{
				path: 'center',
				name: 'center',
				component: () => import('@/views/home/center')
			}
		]
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login')
	},
	{
		path: '/productDetail/:id',
		name: 'productDetail',
		component: () => import('@/views/productDetail')
	},
	{
		path: '/orders',
		name: 'orders',
		component: () => import('@/views/orders')
	},
	{
		path: '/feedback',
		name: 'feedback',
		component: () => import('@/views/feedback')
	},
	{
		path: '/setting',
		name: 'setting',
		component: () => import('@/views/setting')
	},
	{
		path: '/shoppingCart',
		name: 'shoppingCart',
		component: () => import('@/views/shoppingCart')
	},
	{
		path: '/confirmOrder',
		name: 'confirmOrder',
		component: () => import('@/views/confirmOrder')
	},
	{
		path: '/orderInfo/:id',
		name: 'orderInfo',
		component: () => import('@/views/orderInfo')
	}
];

const router = new VueRouter({
	routes
});

export default router;
