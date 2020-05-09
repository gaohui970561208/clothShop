<style lang="less">
@vw: 7.5vw;
.product_detail {
	width: 100%;
	max-height: 100vh;
	overflow-x: hidden;
	overflow-y: auto;
	box-sizing: border-box;
	padding-bottom: 100 / @vw;
	&::-webkit-scrollbar {
		display: none;
	}
	.product_img_wrap {
		width: 100%;
		height: 750 / @vw;
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
		border-bottom: 1 / @vw solid rgb(238, 238, 238);
		img {
			vertical-align: top;
			width: 100%;
			height: 100%;
		}
	}
	.product_info {
		width: 100%;
		box-sizing: border-box;
		padding: 40 / @vw;
		border-bottom: 1 / @vw solid rgb(238, 238, 238);
		.product_name {
			width: 100%;
			font-size: 40 / @vw;
			max-height: 105 / @vw;
			overflow: hidden;
			text-overflow: -o-ellipsis-lastline;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.product_descript {
			margin-top: 30 / @vw;
			width: 100%;
			font-size: 30 / @vw;
			max-height: 85 / @vw;
			overflow: hidden;
			text-overflow: -o-ellipsis-lastline;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			color: #939393;
		}
		.tag_list {
			width: 100%;
		}
		.product_price {
			margin-top: 30 / @vw;
			width: 100%;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			.solt {
				padding-top: 10 / @vw;
				font-size: 30 / @vw;
				color: #ee0a24;
			}
			.price {
				margin-left: 5 / @vw;
				font-size: 50 / @vw;
				color: #ee0a24;
			}
		}
	}
	.product_descript_img_list {
		margin-top: 30 / @vw;
		width: 100%;
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		img {
			vertical-align: top;
			width: 100%;
		}
	}
	.product_category {
		width: 100%;
		height: 800 / @vw;
		box-sizing: border-box;
		padding: 40 / @vw;
		overflow-x: hidden;
		overflow-y: auto;
		&::-webkit-scrollbar {
			display: none;
		}
	}
	.product_sku_wrap {
		border-radius: 10 / @vw 10 / @vw 0 0;
		padding-bottom: 100 / @vw;
	}
	.category_message {
		width: 100%;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		.category_img {
			width: 240 / @vw;
			height: 240 / @vw;
			box-shadow: 0 0 2 / @vw 2 / @vw rgb(238, 238, 238);
			border-radius: 5 / @vw;
			overflow: hidden;
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
			align-items: center;
			img {
				vertical-align: top;
				width: 100%;
				height: 100%;
			}
		}
		.category_content {
			margin-left: 50 / @vw;
			height: 240 / @vw;
			width: 350 / @vw;
		}
		.category_name {
			width: 100%;
			height: 90 / @vw;
			font-size: 30 / @vw;
			color: #636363;
			overflow: hidden;
			text-overflow: -o-ellipsis-lastline;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.category_num {
			width: 100%;
			height: 35 / @vw;
			font-size: 24 / @vw;
			color: #939393;
			overflow: hidden;
		}
		.category_price {
			margin-top: 70 / @vw;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			.slot {
				padding-top: 15 / @vw;
				font-size: 24 / @vw;
				color: #ee0a24;
			}
			.price {
				margin-left: 5 / @vw;
				color: #ee0a24;
				font-size: 40 / @vw;
			}
		}
	}
	.van-cell {
		padding: 0;
	}
	.category_list_wrap {
		margin-top: 40 / @vw;
		width: 100%;
	}
	.category_tag_list {
		padding-top: 40 / @vw;
		width: 100%;
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		.tag {
			margin-right: 20 / @vw;
			padding: 10 / @vw 30 / @vw;
			border-radius: 5 / @vw;
			background-color: rgb(238, 238, 238);
		}
		.active_tag {
			color: #ee0a24;
			background-color: rgba(253, 179, 179, 0.644);
		}
	}
	.product_num {
		margin-top: 30 / @vw;
		width: 100%;
	}
}
</style>
<template>
	<div class="product_detail">
		<van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onBack" />
		<div class="product_img_wrap">
			<img :src="productInfo.productImg" alt="" />
		</div>
		<div class="product_info">
			<div class="product_name">{{ productInfo.productName }}</div>
			<div class="product_descript">{{ productInfo.productDescript }}</div>
			<div class="tag_list" v-if="0"></div>
			<div class="product_price">
				<span class="solt">¥</span>
				<span class="price">{{ productInfo.catePrice | priceFormat }}</span>
			</div>
		</div>
		<div class="product_descript_img_list">
			<img :src="item" v-for="(item, index) in productInfo.productDesList" :key="index" />
		</div>
		<van-goods-action>
			<van-goods-action-icon icon="cart-o" text="购物车" @click="toShoppingCart" />
			<!-- <van-goods-action-button
                type="warning"
                text="加入购物车"
                @click="onAddShoppingCart"
            /> -->
			<van-goods-action-button type="danger" text="选择商品" @click="choiceCategory" />
		</van-goods-action>
		<van-popup v-model="productShow" position="bottom" class="product_sku_wrap">
			<div class="product_category">
				<div class="category_message">
					<div class="category_img">
						<img :src="categoryData.cateImgUrl" alt="" />
					</div>
					<div class="category_content">
						<div class="category_name">{{ categoryData.categoryName }}</div>
						<div class="category_num">剩余 {{ categoryData.cateNum }} 件</div>
						<div class="category_price">
							<span class="slot">¥</span>
							<span class="price">{{ categoryData.catePrice | priceFormat }}</span>
						</div>
					</div>
				</div>
				<div class="category_list_wrap">
					<van-cell :border="false">
						<!-- 使用 title 插槽来自定义标题 -->
						<template #title>
							<span class="custom-title">规格</span>
							<div class="category_tag_list">
								<div
									class="tag"
									v-for="(item, index) in productInfo.categoryList"
									:key="index"
									:class="item.categoryId === categoryData.categoryId ? 'active_tag' : ''"
									@click="updateCategory(item)"
								>
									{{ item.categoryName }}
								</div>
							</div>
						</template>
					</van-cell>
					<van-cell class="product_num" title="选择数量" :border="false">
						<template>
							<van-stepper v-model="productNum" />
						</template>
					</van-cell>
				</div>
			</div>
			<div class="bottom_operate">
				<van-goods-action>
					<van-goods-action-button type="warning" text="加入购物车" @click="addShoppingCart" />
					<van-goods-action-button type="danger" text="立即购买" @click="toBuy" />
				</van-goods-action>
			</div>
		</van-popup>
	</div>
</template>
<script>
import { product, errors } from '@/api';
import { mapState } from 'vuex';

export default {
	filters: {
		priceFormat(val) {
			if (!val) return '0.00';
			return (val / 100).toFixed(2);
		}
	},
	computed: {
		...mapState({
			userInfo: state => state.users.userInfo
		})
	},
	data() {
		return {
			productId: this.$route.params.id,
			productInfo: {},
			productShow: false,
			categoryData: {},
			productNum: 1,
			productData: {}
		};
	},
	mounted() {
		this.getProductInfo();
	},
	methods: {
		async getProductInfo() {
			try {
				const { data, ok } = await product.productInfo(this.productId);
				if (!ok) return;
				this.productInfo = data.data;
				console.log(data);
				this.categoryData.cateImgUrl = this.productInfo.cateImgUrl;
				this.categoryData.cateNum = this.productInfo.cateNum;
				this.categoryData.catePrice = this.productInfo.catePrice;
				this.categoryData.categoryId = this.productInfo.categoryId;
				this.categoryData.categoryName = this.productInfo.categoryName;
			} catch (error) {
				errors(error);
			}
		},
		toShoppingCart() {
			this.$router.push({
				name: 'shoppingCart'
			});
		},
		async addShoppingCart() {
			this.$toast.loading();
			try {
				this.productData.productId = this.productInfo.productId;
				this.productData.productName = this.productInfo.productName;
				this.productData.categoryId = this.categoryData.categoryId;
				this.productData.categoryName = this.categoryData.categoryName;
				this.productData.catePrice = this.categoryData.catePrice;
				this.productData.productNum = this.productNum;
				this.productData.cateImgUrl = this.categoryData.cateImgUrl;
				const { data, ok } = await product.addShopingCart(this.userInfo.userId, this.productData);
				if (!ok) return;
				this.$toast.clear();
				this.$toast(data.msg);
			} catch (error) {
				this.$toast.clear();
				errors(error);
			}
		},
		toBuy() {
			this.productData.shopId = this.productInfo.shopId;
			this.productData.shopName = this.productInfo.shopName;
			this.productData.shopLogo = this.productInfo.shopLogo;
			this.productData.productId = this.productInfo.productId;
			this.productData.productName = this.productInfo.productName;
			this.productData.categoryId = this.categoryData.categoryId;
			this.productData.categoryName = this.categoryData.categoryName;
			this.productData.catePrice = this.categoryData.catePrice;
			this.productData.productNum = this.productNum;
			this.productData.cateImgUrl = this.categoryData.cateImgUrl;
			let productList = [];
			productList.push(this.productData);
			this.$router.push({
				name: 'confirmOrder',
				params: {
					productList: productList
				}
			});
		},
		//选择商品规格
		choiceCategory() {
			this.productShow = true;
		},
		//选择规格数据
		updateCategory(data) {
			this.categoryData = data;
		},
		//返回
		onBack() {
			this.$router.go(-1);
		}
	}
};
</script>
