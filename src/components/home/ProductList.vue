<style lang="less">
@vw: 7.5vw;
.product_list {
	width: 100%;
	max-width: 100vw;
	box-sizing: border-box;
	padding: 0 30 / @vw;
	.list_item {
		margin-top: 20 / @vw;
		border-top: 2 / @vw solid rgb(238, 243, 240);
		width: 100%;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		&:first-child {
			margin: 0;
			border: 0;
		}
	}
	.list_img_wrap {
		width: 300 / @vw;
		height: 300 / @vw;
		box-sizing: border-box;
		padding: 5 / @vw;
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
		border-radius: 5 / @vw;
		img {
			vertical-align: top;
			width: 280 / @vw;
			object-fit: cover;
		}
	}
	.list_content {
		width: 360 / @vw;
		height: 300 / @vw;
		.product_name {
			margin-top: 10 / @vw;
			width: 100%;
			height: 100 / @vw;
			font-size: 36 / @vw;
			overflow: hidden;
			text-overflow: -o-ellipsis-lastline;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
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
	<div class="product_list">
		<div class="list_item" v-for="(item, index) in productList" :key="index" @click="productInfo(item)">
			<div class="list_img_wrap">
				<img :src="item.productImg" alt="" />
			</div>
			<div class="list_content">
				<div class="product_name">{{ item.productName }}</div>
				<div class="product_des">{{ item.productDescript }}</div>
				<div class="tag_wrap">
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
