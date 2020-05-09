<style lang="less">
@vw: 7.5vw;
.shopping_cart_wrap {
	width: 100vw;
	height: 100vh;
	overflow-x: hidden;
	overflow-y: auto;
	box-sizing: border-box;
	padding: 0 0 140 / @vw;
	.title {
		text-align: center;
	}
	.submit_bar {
		width: 100%;
		display: flex;
	}
	.van-submit-bar {
		box-shadow: 0 -2 / @vw 2 / @vw 2 / @vw rgba(236, 236, 236, 0.856);
	}
	.cart_list_wrap {
		width: 100%;
		margin-top: 50 / @vw;
		box-sizing: border-box;
		padding: 0 40/@vw;
	}
	.card_wrap {
		margin-top: 40 / @vw;
		width: 100%;
		position: relative;
		&:first-child {
			margin-top: 0;
		}
		.check_product {
			position: absolute;
			top: 20 / @vw;
			right: 20 / @vw;
		}
	}
}
</style>
<template>
	<div class="shopping_cart_wrap">
		<van-nav-bar
		title="购物车"
		left-text="返回"
		left-arrow
		@click-left="onBack"
		/>
		<div class="cart_list_wrap">
			<van-empty
				description="空荡荡的，赶快去添加宝贝吧"
				v-if="!shoppingCartList || !Array.isArray(shoppingCartList) || shoppingCartList.length === 0"
			/>
			<van-checkbox-group v-model="checkProductList" ref="productGroup" @change="checkProduct">
				<div class="card_wrap" v-for="(item, index) in shoppingCartList" :key="index">
					<van-checkbox :name="item" class="check_product" />
					<ProductCard :productInfo="item" />
				</div>
			</van-checkbox-group>
		</div>
		<van-submit-bar :price="allPrice" button-text="提交订单" @submit="onSubmit">
			<van-checkbox v-model="allChecked" @change="checkAll">全选</van-checkbox>
		</van-submit-bar>
	</div>
</template>
<script>
import ProductCard from '@/components/ProductCard';
import { users, product, errors } from '@/api';
import { mapState } from 'vuex';

export default {
	components: {
		ProductCard
	},
	computed: {
		...mapState({
			userInfo: state => state.users.userInfo
		}),
		allPrice() {
			if (!this.checkProductList || this.checkProductList.length === 0) {
				return 0;
			} else {
				let price = 0;
				this.checkProductList.forEach(element => {
					price += element.catePrice * element.productNum;
				});
				return price;
			}
		}
	},
	data() {
		return {
			shoppingCartList: [],
			checkProductList: [],
			allChecked: false
		};
	},
	mounted() {
		console.log(this.userInfo);
		this.getShoppingCart();
	},
	methods: {
		async getShoppingCart() {
			try {
				const { data, ok } = await users.getCartList(this.userInfo.userId);
				if (!ok) return;
				console.log(data);
				if(data.data && Array.isArray(data.data)) {
					this.shoppingCartList.push(...data.data);
				}
			} catch (error) {
				errors(error);
			}
		},
		//提交订单
		onSubmit() {
			this.$router.push({
				name: 'confirmOrder',
				params: {
					productList: this.checkProductList,
					isCart: true
				}
			});
		},
		//全选
		checkAll(val) {
			if (val) {
				this.$refs.productGroup.toggleAll(true);
			} else {
				this.$refs.productGroup.toggleAll(false);
			}
		},
		//选择商品
		checkProduct(val) {
			if (val.length === this.shoppingCartList.length) {
				this.allChecked = true;
			} else {
				this.allChecked = false;
			}
		},
		//返回
		onBack() {
			this.$router.go(-1);
		}
	}
};
</script>
