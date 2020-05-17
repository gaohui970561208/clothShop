<style lang="less">
@vw: 7.5vw;
.confirm_order {
	width: 100%;
	height: 100vh;
	box-sizing: border-box;
	padding-bottom: 100 / @vw;
	overflow-x: hidden;
	overflow-y: auto;
	.address_wrap {
		width: 100%;
		box-sizing: border-box;
		padding: 40 / @vw 40 / @vw 0;
		.address_content {
			width: 100%;
			display: flex;
			flex-flow: column nowrap;
			box-shadow: 0 0 2 / @vw 1 / @vw rgb(246, 174, 255);
			box-sizing: border-box;
			padding: 20 / @vw 30 / @vw;
		}
		.no_address_text {
			text-align: center;
			cursor: pointer;
		}
		.address_people {
			width: 100%;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			.address_name {
				font-size: 30 / @vw;
			}
			.address_phone {
				margin-left: 30 / @vw;
				font-size: 28 / @vw;
			}
		}
		.address_text {
			margin-top: 40 / @vw;
			width: 100%;
			text-align: left;
		}
	}
	.product_wrap {
		box-sizing: border-box;
		padding: 40 / @vw;
		.product_card {
			margin-top: 40 / @vw;
			&:first-child {
				margin-top: 0;
			}
		}
	}
	.pay_type_wrap {
		box-sizing: border-box;
		padding: 40 / @vw;
		.pay_title {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			.icon {
				font-size: 40 / @vw;
			}
			.weixin {
				color: rgb(0, 245, 33);
			}
			.zhifubao {
				color: rgb(0, 174, 255);
			}
			.pay_name {
				margin-left: 10 / @vw;
				font-size: 30 / @vw;
				color: #939393;
			}
		}
	}
}
.address_choice {
	.van-radio-group {
		box-sizing: border-box;
		padding: 40 / @vw;
	}
	.van-radio__icon {
		margin-left: 20 / @vw;
	}
	.van-radio {
		border: 2 / @vw solid rgb(255, 169, 255);
		border-radius: 5 / @vw;
		& + .van-radio {
			margin-top: 20 / @vw;
		}
	}
	.van-radio__label {
		width: 100%;
		box-sizing: border-box;
		padding-left: 50 / @vw;
	}
	.address_content {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		flex-flow: column;
		position: relative;
		.address_top {
			display: flex;
			flex-flow: row nowrap;
			justify-content: flex-start;
			align-items: center;
			.address_name {
				font-size: 30 / @vw;
			}
			.address_phone {
				margin-left: 40 / @vw;
				font-size: 28 / @vw;
			}
		}
		.address_address {
			margin-top: 30 / @vw;
			.address_area {
				font-size: 28 / @vw;
			}
			.address_text {
				margin-top: 10 / @vw;
				font-size: 24 / @vw;
			}
		}
		.edit_icon {
			position: absolute;
			top: 50%;
			right: 0;
			transform: translateY(-50%);
			width: 50 / @vw;
			height: 50 / @vw;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			.icon {
				font-size: 45 / @vw;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
	.add_address {
		width: 100%;
		box-sizing: border-box;
		padding: 50 / @vw;
		.van-button {
			width: 100%;
		}
	}
}
</style>
<template>
	<div class="confirm_order">
		<van-nav-bar title="提交订单" left-text="返回" left-arrow @click-left="onBack" />
		<div class="address_wrap" @click="addressDataShow = true">
			<div class="address_content" v-if="addressData && Object.keys(addressData).length > 0">
				<div class="address_people">
					<div class="address_name">{{ addressData.name }}</div>
					<div class="address_phone">{{ addressData.phone }}</div>
				</div>
				<div class="address_text">{{ addressData.area }} {{ addressData.address }}</div>
			</div>
			<div class="address_content" v-else>
				<div class="no_address_text">请选择地址</div>
			</div>
		</div>
		<div class="product_wrap">
			<ProductCard :productInfo="item" :isOrder="true" v-for="(item, index) in productList" :key="index" />
		</div>
		<div class="pay_type_wrap">
			<div class="tips">支付方式</div>
			<van-radio-group v-model="payType">
				<van-cell-group>
					<van-cell :border="false" clickable @click="payType = 1">
						<template #title>
							<div class="pay_title">
								<i class="icon iconfont iconweixinzhifu weixin"></i>
								<div class="pay_name">微信支付</div>
							</div>
						</template>
						<template #right-icon>
							<van-radio :name="1" />
						</template>
					</van-cell>
					<van-cell :border="false" clickable @click="payType = 2">
						<template #title>
							<div class="pay_title">
								<i class="icon iconfont iconzhifubao zhifubao"></i>
								<div class="pay_name">支付宝支付</div>
							</div>
						</template>
						<template #right-icon>
							<van-radio :name="2" />
						</template>
					</van-cell>
				</van-cell-group>
			</van-radio-group>
		</div>
		<van-submit-bar :price="allPrice" button-text="提交订单" @submit="createOrder" />
		<van-popup v-model="addressDataShow" position="bottom" class="address_choice">
			<div class="add_address" v-if="!addressList || !Array.isArray(addressList) || addressList.length === 0">
				<van-button type="danger" @click="addAddress">添加地址</van-button>
			</div>
			<van-radio-group v-model="addressData" @change="addChange" v-else>
				<van-radio v-for="(item, index) in addressList" :key="index" :name="item">
					<div class="address_content">
						<div class="address_top">
							<div class="address_name">{{ item.name }}</div>
							<div class="address_phone">{{ item.phone }}</div>
						</div>
						<div class="address_address">
							<div class="address_area">{{ item.area }}</div>
							<div class="address_text">{{ item.address }}</div>
						</div>
					</div>
				</van-radio>
			</van-radio-group>
		</van-popup>
	</div>
</template>
<script>
import { order, users, errors } from '@/api';
import { mapState, mapActions } from 'vuex';
import areaList from '@/plugins/areaList';
import ProductCard from '@/components/ProductCard';

export default {
	components: {
		ProductCard
	},
	computed: {
		...mapState({
			userInfo: state => state.users.userInfo
		}),
		allPrice() {
			let price = 0;
			if (
				!this.$route.params.productList ||
				!Array.isArray(this.$route.params.productList) ||
				this.$route.params.productList.length === 0
			) {
				return price;
			} else {
				this.productList.forEach(element => {
					price += element.catePrice;
				});
				return price;
			}
		}
	},
	data() {
		return {
			productList: [],
			areaList,
			addressData: {},
			payType: 0,
			addressDataShow: false,
			addressList: []
		};
	},
	mounted() {
		this.areaList = areaList;
		console.log(this.$route.params);
		if (
			!this.$route.params.productList ||
			!Array.isArray(this.$route.params.productList) ||
			this.$route.params.productList.length === 0
		) {
			this.$router.go(-1);
		} else {
			this.productList.push(...this.$route.params.productList);
		}
		console.log(this.productList);
		this.getAddressList();
	},
	methods: {
		...mapActions({
			setUserInfo: 'users/setUserInfo'
		}),
		async getAddressList() {
			try {
				this.addressList = [];
				const params = {
					userId: this.userInfo.userId
				};
				const { data, ok } = await users.getAddressList(params);
				if (!ok) return;
				console.log(data);
				if (data.data && Array.isArray(data.data) && data.data.length > 0) {
					data.data.forEach(element => {
						if (element.isDefault) {
							this.addressData = element;
						}
						this.addressList.push(element);
					});
					if (data.data.length === 1) {
						this.addressData = data.data[0];
					}
				} else {
					return;
				}
			} catch (error) {
				errors(error);
			}
		},
		createOrder() {
			if (!this.addressData || Object.keys(this.addressData).length === 0) {
				this.$toast('选择收货地址');
				return;
			}
			this.$toast.loading();
			try {
				const addressData = this.addressData;
				this.productList.forEach((element, index) => {
					let list = [];
					list.push(element);
					const reData = {
						status: 1,
						paymentStatus: 2,
						price: parseInt(element.catePrice) * parseInt(element.productNum),
						productList: list,
						shopId: element.shopId,
						address: addressData,
						payType: this.payType
					};
					order.createOrder(this.userInfo.userId, reData).then(({ data, ok } = res) => {
						if (!ok) return;
						this.$toast.clear();
						this.$toast(data.msg);
						if (index >= this.productList.length - 1) {
							let shoppingList = [];
							shoppingList.push(...this.productList);
							users.deleteShoppingCart(this.userInfo.userId, shoppingList).then(() => {
								const userData = {
									userId: this.userInfo.userId
								};
								this.setUserInfo(userData);
							});
						}
					});
					this.$router.go(-1);
				});
			} catch (error) {
				errors(error);
			}
		},
		onBack() {
			this.$router.go(-1);
		},
		addChange(val) {
			this.addressDataShow = false;
		},
		addAddress() {
			this.$router.push({
				name: 'address'
			});
		}
	}
};
</script>
