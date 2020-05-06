<style lang="less">
@vw: 7.5vw;
.order_info {
	width: 100%;
	max-height: 100vh;
	box-sizing: border-box;
	padding: 40 / @vw 40 / @vw 140 / @vw;
	overflow-x: hidden;
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
	.stpe_wrap {
		width: 100%;
		overflow: hidden;
	}
	.product_wrap {
		margin-top: 40 / @vw;
	}
	.order_meg {
		margin-top: 40 / @vw;
		width: 100%;
	}
	.operate_wrap {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100 / @vw;
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-end;
		align-items: center;
		box-sizing: border-box;
		box-shadow: 0 2 / @vw 2 / @vw 2 / @vw rgb(228, 228, 228);
		.operate_btn {
			margin: 0 20 / @vw;
		}
	}
}
</style>
<template>
	<div class="order_info">
		<div class="stpe_wrap">
			<van-steps :active="orderInfo.status">
				<van-step>待付款</van-step>
				<van-step>待发货</van-step>
				<van-step>待收货</van-step>
				<van-step>已收货</van-step>
			</van-steps>
		</div>
		<div class="product_wrap">
			<ProductCard
				:productInfo="item"
				:isOrder="true"
				v-for="(item, index) in orderInfo.productList"
				:key="index"
			/>
		</div>
		<div class="order_meg">
			<van-cell title="订单编号" :value="orderInfo.orderId" />
			<van-cell title="订单价格" :value="orderInfo.price | priceFormat" />
			<van-cell title="订单状态" :value="orderInfo.status | orderStatusForamt" />
			<van-cell title="收货地址">
				<template>
					{{ address.address || '默认地址' }}
				</template>
			</van-cell>
			<van-cell title="退款状态" v-if="orderInfo.backStatus" :value="orderInfo.backStatus | backStatusForamt" />
		</div>
		<div class="operate_wrap">
			<van-button class="operate_btn" round @click="payOrder" v-if="orderInfo.status === 0">立即付款</van-button>
			<van-button class="operate_btn" round @click="confirmDialog" v-if="orderInfo.status === 2"
				>确认收货</van-button
			>
			<van-button
				class="operate_btn"
				round
				@click="toBack"
				v-if="orderInfo.status !== 0 && (orderInfo.backStatus === 0 || orderInfo.backStatus === 3)"
				>申请退款</van-button
			>
		</div>
		<van-dialog v-model="backShow" title="标题" show-cancel-button @confirm="backOrder">
			<van-field label="退款理由" v-model="backTxt" placeholder="请输入退款理由" />
		</van-dialog>
	</div>
</template>
<script>
import ProductCard from '@/components/ProductCard';
import { order, errors } from '@/api';
import { mapState } from 'vuex';

export default {
	filters: {
		priceFormat(val) {
			if (!val) return '0.00 元';
			return (val / 100).toFixed(2) + ' 元';
		},
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
			} else if (val === 5) {
				return '已取消';
			}
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
			orderId: this.$route.params.id,
			orderInfo: {},
			address: {},
			backShow: false,
			backTxt: ''
		};
	},
	mounted() {
		this.getOrderInfo();
	},
	methods: {
		async getOrderInfo() {
			try {
				const { data, ok } = await order.orderInfo(this.orderId);
				if (!ok) return;
				this.orderInfo = data.data;
				this.address = data.data.address;
			} catch (error) {
				errors(error);
			}
		},
		payOrder() {
			const options = {
				title: '支付',
				message: '立即支付？',
				confirmButtonText: '确认支付',
				cancelButtonText: '取消支付'
			};
			this.$dialog.confirm(options).then(() => {
				this.pay();
			});
		},
		async pay() {
			this.$toast.loading();
			try {
				const { data, ok } = await order.payOrder(this.orderInfo.orderId);
				if (!ok) return;
				this.$toast.clear();
				this.$toast(data.msg);
				this.getOrderInfo();
			} catch (error) {
				errors(error);
			}
		},
		confirmDialog() {
			const options = {
				title: '确认收货',
				message: '是否确认收货？',
				confirmButtonText: '确认',
				cancelButtonText: '取消'
			};
			this.$dialog.confirm(options).then(() => {
				this.confirmOrder();
			});
		},
		async confirmOrder() {
			this.$toast.loading();
			try {
				const { data, ok } = await order.confirmOrder(this.orderInfo.orderId);
				if (!ok) return;
				this.$toast.clear();
				this.$toast(data.msg);
				this.getOrderInfo();
			} catch (error) {
				errors(error);
			}
		},
		toBack() {
			this.backTxt = '';
			this.backShow = true;
		},
		async backOrder() {
			this.$toast.loading();
			try {
				const reData = {
					backDes: this.backTxt
				};
				const { data, ok } = await order.createBack(this.orderInfo.orderId, reData);
				if (!ok) return;
				this.$toast.clear();
				this.$toast(data.msg);
				this.getOrderInfo();
			} catch (error) {
				errors(error);
			}
		}
	}
};
</script>
