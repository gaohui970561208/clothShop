<style lang="less">
@vw: 7.5vw;
.product_list_double {
	width: 100%;
	max-width: 100vw;
	box-sizing: border-box;
	padding: 0 30 / @vw;
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	.list_item {
		margin-top: 20 / @vw;
		box-shadow: 0 0 2 / @vw 2 / @vw rgba(243, 234, 234, 0.986);
		width: 48%;
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
		align-items: center;
		&:first-child,
		&:nth-of-type(2) {
			margin: 0;
		}
	}
	.list_img_wrap {
		width: 100%;
		height: 300 / @vw;
		box-sizing: border-box;
		padding: 5 / @vw;
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
		border-radius: 5 / @vw;
		border-bottom: 2 / @vw solid rgba(243, 234, 234, 0.986);
		img {
			vertical-align: top;
			width: 280 / @vw;
			object-fit: cover;
		}
	}
	.list_content {
		width: 100%;
		box-sizing: border-box;
		padding: 10 / @vw 20 / @vw;
		.product_name {
			margin-top: 10 / @vw;
			width: 100%;
			height: 50 / @vw;
			font-size: 30 / @vw;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.product_des {
			width: 100%;
			height: 70 / @vw;
			font-size: 20 / @vw;
			color: #939393;
			overflow: hidden;
			text-overflow: -o-ellipsis-lastline;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.tag_wrap {
			margin-top: 10 / @vw;
			width: 100%;
			height: 44 / @vw;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			.tag {
				font-size: 20 / @vw;
				padding: 5 / @vw 10 / @vw;
				border-radius: 5 / @vw;
				color: #ffff;
				background-image: linear-gradient(to top, #ee0a24, #ffcccc);
			}
		}
		.product_price {
			margin-top: 20 / @vw;
			width: 100%;
			display: flex;
			flex-flow: row;
			align-items: center;
			color: #ee0a24;
			.soft {
				padding-top: 8 / @vw;
				font-size: 24 / @vw;
			}
			.price {
				margin-left: 10 / @vw;
				font-size: 40 / @vw;
			}
		}
	}
}
</style>
<template>
	<div class="product_list_double">
		<div class="list_item" v-for="(item, index) in productList" :key="index" @click="productInfo(item)">
			<div class="list_img_wrap">
				<img :src="item.productImg" alt="" />
			</div>
			<div class="list_content">
				<div class="product_name">{{ item.productName }}</div>
				<div class="product_des">{{ item.productDescript }}</div>
				<div class="tag_wrap" v-if="0">
					<!-- <div class="tag">年度销冠</div> -->
				</div>
				<div class="product_price">
					<div class="soft">¥</div>
					<div class="price">{{ item.catePrice | priceForamt }}</div>
				</div>
			</div>
		</div>
		<!-- <van-card
            v-for="(item, index) in productList"
            :key="index"
            :centered="true"
            :price="item.catePrice | priceForamt"
            :desc="item.productDescript"
            :title="item.productName"
            :thumb="item.productImg"
        /> -->
	</div>
</template>
<script>
export default {
	props: {
		productList: {
			type: Array,
			default: () => []
		}
	},
	filters: {
		priceForamt(val) {
			if (!val) return '0.00';
			return (val / 100).toFixed(2);
		}
	},
	methods: {
		productInfo(item) {
			this.$router.push({
				name: 'productDetail',
				params: {
					id: item.productId
				}
			});
		}
	}
};
</script>
