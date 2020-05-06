<style lang="less">
@vw: 7.5vw;
.confirm_order {
	width: 100%;
	box-sizing: border-box;
	padding: 40 / @vw;
	.product_wrap {
		margin-top: 40 / @vw;
	}
	.pay_type_wrap {
		margin-top: 40 / @vw;
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
</style>
<template>
	<div class="confirm_order">
		<div class="address_wrap">
			<van-cell title="收获地址" @click="choiceAddress">
				<div class="address_city">{{ areaStr || '请选择地区' }}</div>
			</van-cell>
			<van-cell title="详细地址" @click="addAddress">
				<div class="address_city">{{ address || '请添加详细地址' }}</div>
			</van-cell>
			<van-cell title="姓名" @click="nameDialog">
				<div class="address_city">{{ name || '请添加联系人姓名' }}</div>
			</van-cell>
			<van-cell title="手机号" @click="phoneDialog">
				<div class="address_city">{{ phone || '请添加收货联系方式' }}</div>
			</van-cell>
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
		<van-popup v-model="areaChoice" position="bottom">
			<van-area :area-list="areaList" :columns-placeholder="['请选择', '请选择', '请选择']" @confirm="confirm" />
		</van-popup>
		<van-dialog v-model="addressShow" title="标题" show-cancel-button @confirm="addressUpdate">
			<van-field v-model="addressTxt" placeholder="请输入详细地址" />
		</van-dialog>
		<van-dialog v-model="nameShow" title="标题" show-cancel-button @confirm="nameUpdate">
			<van-field v-model="nameTxt" placeholder="请输入联系人姓名" />
		</van-dialog>
		<van-dialog v-model="phoneShow" title="标题" show-cancel-button @confirm="phoneUpdate">
			<van-field v-model="phoneTxt" placeholder="请输入联系方式" />
		</van-dialog>
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
			areaChoice: false,
			areaStr: null,
			address: '',
			addressShow: false,
			addressTxt: '',
			name: '',
			phone: '',
			nameShow: false,
			phoneShow: false,
			nameTxt: '',
			phoneTxt: '',
			payType: 0
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
	},
	methods: {
		...mapActions({
			setUserInfo: 'users/setUserInfo'
		}),
		//选择地址
		choiceAddress() {
			this.areaChoice = true;
		},
		confirm(data) {
			this.areaStr = '';
			data.forEach(element => {
				this.areaStr += element.name;
			});
			this.areaChoice = false;
		},
		addAddress() {
			this.addressShow = true;
			this.addressTxt = '';
		},
		nameDialog() {
			this.nameShow = true;
			this.nameTxt = '';
		},
		phoneDialog() {
			this.phoneShow = true;
			this.phoneTxt = '';
		},
		addressUpdate() {
			this.address = this.addressTxt;
		},
		nameUpdate() {
			this.name = this.nameTxt;
		},
		phoneUpdate() {
			if (!/^1[3456789]\d{9}$/.test(this.phoneTxt)) {
				this.$toast('手机号码有误');
				return;
			}
			this.phone = this.phoneTxt;
		},
		createOrder() {
			if (
				!this.areaStr ||
				this.areaStr.length === 0 ||
				!this.address ||
				this.address.length === 0 ||
				!this.name ||
				this.name.length === 0 ||
				!this.phone ||
				this.phone.length === 0
			) {
				this.$toast('请完善收货信息');
				return;
			}
			this.$toast.loading();
			try {
				const addressData = {
					name: this.name,
					phone: this.phone,
					address: this.areaStr + this.address
				};
				this.productList.forEach(element => {
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
						if (this.$route.params.isCart) {
							let shoppingList = [];
							shoppingList.push(...this.productList);
							users.deleteShoppingCart(this.userInfo.userId, shoppingList).then(() => {
								this.setUserInfo();
							});
						}
					});
					this.$router.go(-1);
				});
			} catch (error) {
				errors(error);
			}
		}
	}
};
</script>
