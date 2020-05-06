<style lang="less">
@vw: 7.5vw;
.product_card {
	width: 100%;
	box-sizing: border-box;
	box-shadow: 0 0 3 / @vw 5 / @vw rgba(231, 231, 231, 0.8);
	border-radius: 5 / @vw;
	padding: 20 / @vw 30 / @vw;
	.shop_wrap {
		width: 100%;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		.icon {
			font-size: 40 / @vw;
			color: #393939;
		}
		.shop_name {
			margin-left: 20 / @vw;
			font-size: 36 / @vw;
			color: #393939;
		}
		.shopLogo {
			margin-left: 20 / @vw;
			width: 50 / @vw;
			height: 50 / @vw;
			border-radius: 3 / @vw;
			overflow: hidden;
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
			align-items: center;
			img {
				vertical-align: top;
				width: 100%;
			}
		}
	}
	.card_wrap {
		width: 100%;
		margin-top: 10 / @vw;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
	}
	.product_img_wrap {
		width: 200 / @vw;
		height: 200 / @vw;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 5 / @vw;
		img {
			width: 100%;
			height: 100%;
			vertical-align: top;
		}
	}
	.product_content {
		width: 360 / @vw;
		margin-left: 40 / @vw;
		height: 200 / @vw;
		.product_name {
			// max-width: 360/@vw;
			height: 42 / @vw;
			font-size: 30 / @vw;
			font-weight: 500;
			color: #393939;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.product_category {
			margin-top: 20 / @vw;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			.category_name {
				padding: 5 / @vw 20 / @vw;
				background-color: rgba(231, 231, 231, 0.8);
				border-radius: 5 / @vw;
				font-size: 24 / @vw;
				color: rgba(138, 138, 138, 0.836);
			}
		}
		.product_attr {
			margin-top: 30 / @vw;
			width: 100%;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;
			.product_price {
				display: flex;
				align-items: center;
				.slot {
					padding-top: 5 / @vw;
					font-size: 30 / @vw;
					color: #ee0a04;
				}
				.price {
					margin-left: 10 / @vw;
					font-size: 40 / @vw;
					color: #ee0a04;
				}
			}
		}
	}
}
</style>
<template>
	<div class="product_card">
		<div class="shop_wrap">
			<i class="icon iconfont icondianpu"></i>
			<div class="shop_name">{{ productInfo.shopName }}</div>
			<div class="shopLogo">
				<img :src="productInfo.shopLogo || null" alt="" />
			</div>
		</div>
		<div class="card_wrap">
			<div class="product_img_wrap" @click="toProductDetail">
				<img :src="productInfo.cateImgUrl" alt="" />
			</div>
			<div class="product_content">
				<div class="product_name">{{ productInfo.productName }}</div>
				<div class="product_category">
					<span class="category_name">{{ productInfo.categoryName }}</span>
				</div>
				<div class="product_attr">
					<div class="product_price">
						<div class="slot">¥</div>
						<div class="price">{{ productInfo.catePrice | priceForamt }}</div>
					</div>
					<div class="price_num">
						<van-stepper v-model="productInfo.productNum" v-if="!isOrder" />
						<span v-else>X {{ productInfo.productNum }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	filters: {
		priceForamt(val) {
			if (!val) return '0.00';
			return (val / 100).toFixed(2);
		}
	},
	props: {
		productInfo: {
			type: Object,
			default: () => {}
		},
		isOrder: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		toProductDetail() {
			this.$router.push({
				name: 'productDetail',
				params: {
					id: this.productInfo.productId
				}
			});
		}
	}
};
</script>
