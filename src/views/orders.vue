<style lang="less">
@vw: 7.5vw;
.orders_wrap {
	width: 100%;
	max-height: 100vh;
	box-sizing: border-box;
	overflow-x: hidden;
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
	.order_list {
		width: 100%;
		box-sizing: border-box;
		padding: 40 / @vw;
	}
	.order_content {
		margin-top: 40 / @vw;
		width: 100%;
		border: 5 / @vw solid rgba(231, 231, 231, 0.8);
		border-radius: 8 / @vw;
		overflow: hidden;
		&:first-child {
			margin-top: 0;
		}
		.order_meg {
			width: 100%;
			box-sizing: border-box;
			padding: 20 / @vw 30 / @vw;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;
			.order_no {
				font-size: 30 / @vw;
				color: #939393;
			}
			.order_status {
				font-size: 30 / @vw;
				color: rgb(255, 142, 66);
			}
			.finish {
				color: rgb(52, 199, 96);
			}
		}
		.order_price {
			width: 100%;
			box-sizing: border-box;
			padding: 20 / @vw 30 / @vw;
			font-size: 28 / @vw;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;
			.price {
				color: rgb(231, 54, 54);
			}
			.backStatus {
				color: rgb(255, 142, 66);
			}
		}
	}
}
</style>
<template>
	<div class="orders_wrap">
		<van-nav-bar title="我的订单" left-text="返回" left-arrow @click-left="onBack" />
		<van-tabs v-model="status" @change="tabChange" swipe-threshold="5">
			<van-tab title="全部" :name="-1"></van-tab>
			<van-tab title="待发货" :name="1"></van-tab>
			<van-tab title="待收货" :name="2"></van-tab>
			<van-tab title="已完成" :name="4"></van-tab>
			<van-tab title="已取消" :name="5"></van-tab>
		</van-tabs>
		<div class="order_list">
			<div class="order_content" v-for="(i, k) in orderList" :key="k" @click="toOrderInfo(i)">
				<div class="order_meg">
					<div class="order_no">订单号: {{ i.orderId }}</div>
					<div class="order_status" :class="i.status === 3 || i.status === 4 ? 'finish' : ''">
						{{ i.status | orderStatusForamt }}
					</div>
				</div>
				<ProductCard :productInfo="item" :isOrder="true" v-for="(item, index) in i.productList" :key="index" />
				<div class="order_price">
					<div class="price">¥ {{ i.price | priceForamt }}</div>
					<div class="backStatus" v-if="i.backStatus">{{ i.backStatus | backStatusForamt }}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import ProductCard from '@/components/ProductCard';
import { order, errors } from '@/api';
import { mapState } from 'vuex';

export default {
	filters: {
		orderStatusForamt(val) {
			if (val === 0) {
				return '未付款';
			} else if (val === 1) {
				return '待发货';
			} else if (val === 2) {
				return '待收货';
			} else if (val === 3) {
				return '已收货';
			} else if (val === 4) {
				return '已完成';
			}
		},
		priceForamt(val) {
			if (!val) return '0.00';
			return (val / 100).toFixed(2);
		},
		backStatusForamt(val) {
			if (val === 0) {
				return '正常';
			} else if (val === 1) {
				return '正在退款';
			} else if (val === 2) {
				return '退款完成';
			} else if (val === 3) {
				return '退款失败';
			}
		}
	},
	components: {
		ProductCard
	},
	computed: {
		...mapState({
			userInfo: state => state.users.userInfo
		})
	},
	data() {
		return {
			status: -1,
			orderList: []
		};
	},
	mounted() {
		if (this.$route.params) {
			this.status = this.$route.params.status;
		}
		this.getOrderListInfo();
	},
	methods: {
		tabChange(val) {
			this.orderList = [];
			this.getOrderListInfo();
		},
		async getOrderListInfo() {
			try {
				const params = {
					userId: this.userInfo.userId,
					status: this.status
				};
				const { data, ok } = await order.getOrderListInfo(params);
				if (!ok) return;
				console.log(data);
				this.orderList.push(...data.data);
			} catch (error) {
				errors(error);
			}
		},
		toOrderInfo(item) {
			this.$router.push({
				name: 'orderInfo',
				params: {
					id: item.orderId
				}
			});
		},
		onBack() {
			this.$router.go(-1);
		}
	}
};
</script>
