<style lang="less">
@vw: 7.5vw;
.home_wrap {
	width: 100%;
	max-width: 100%;
	height: 100%;
	padding-bottom: 120 / @vw;
	background-color: rgba(255, 169, 251, 0.226);
	.list_to_product {
		margin-top: 20 / @vw;
		width: 100%;
		.list_title {
			padding: 0 40 / @vw;
			font-size: 40 / @vw;
			color: rgb(3, 2, 3);
		}
	}
	.list_wrap {
		margin-top: 20 / @vw;
		width: 100vw;
	}
	.list_to_no_paroduct {
		width: 100%;
	}
	.search_wrap {
		width: 100%;
		box-sizing: border-box;
		padding: 20 / @vw 50 / @vw;
		background-image: linear-gradient(to top, rgb(244, 125, 255), rgb(228, 28, 255));
		.icon {
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.search_content {
			width: 100%;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			background-color: #ffffff;
			padding: 10 / @vw 30 / @vw;
			box-sizing: border-box;
			border-radius: 40 / @vw;
		}
		.search_txt {
			width: 70%;
			font-size: 30 / @vw;
		}
	}
	.swiper_wrap {
		margin-top: 20 / @vw;
		width: 100%;
		box-sizing: border-box;
		padding: 20 / @vw 30 / @vw;
		border-radius: 10 / @vw;
		.swiper_content {
			box-sizing: border-box;
			border: 10 / @vw solid #ffffff;
			border-radius: 10 / @vw;
		}
		.product_img_wrap {
			width: 100%;
			height: 400 / @vw;
			display: flex;
			align-items: center;
			justify-content: center;
			img {
				width: 100%;
				vertical-align: top;
				object-fit: cover;
			}
		}
	}
	.tab_nav_wrap {
		margin-top: 20 / @vw;
		width: 100%;
		box-sizing: border-box;
		padding: 10 / @vw 40 / @vw;
		.tab_nav {
			width: 100%;
			border-radius: 10 / @vw;
			overflow: hidden;
		}
	}
}
</style>
<template>
	<div class="home_wrap">
		<div class="search_wrap">
			<div class="search_content" @click="toSearch">
				<i class="icon iconfont iconsousuo"></i>
				<div class="search_txt">请输入关键字搜索</div>
			</div>
		</div>
		<div class="swiper_wrap" v-if="swiperList && Array.isArray(swiperList) && swiperList.length > 0">
			<div class="swiper_content">
				<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
					<van-swipe-item v-for="(item, index) in swiperList" :key="index" @click="toDetail(item)">
						<div class="product_img_wrap">
							<img :src="item.productImg" alt="" />
						</div>
					</van-swipe-item>
				</van-swipe>
			</div>
		</div>
		<div class="tab_nav_wrap">
			<div class="tab_nav">
				<van-tabs v-model="classifyId" @change="tabChange">
					<van-tab title="热门推荐" :name="0"></van-tab>
					<van-tab
						:title="item.classifyName"
						:name="item.classifyId"
						v-for="(item, index) in classifyList"
						:key="index"
					></van-tab>
				</van-tabs>
			</div>
		</div>
		<div class="list_to_no_paroduct" v-if="!productList || productList.length === 0">
			<van-empty description="暂无此类商品" />
		</div>
		<div class="list_to_product" v-else>
			<div class="list_title">{{ classifyName }}</div>
			<div class="list_wrap">
				<ProductList :productList="productList" />
			</div>
		</div>
	</div>
</template>
<script>
import { product, errors } from '@/api';
import { mapState } from 'vuex';
import ProductList from '@/components/home/ProductList';

export default {
	components: {
		ProductList
	},
	computed: {
		...mapState({
			classifyList: state => state.classify.classifyList
		})
	},
	data() {
		return {
			classifyId: 0,
			productList: [],
			classifyName: '热门推荐',
			swiperList: []
		};
	},
	mounted() {
		this.getSwiper();
		this.getProductList();
	},
	methods: {
		tabChange(name, title) {
			this.classifyId = name;
			this.classifyName = title;
			this.getProductList();
		},
		//获取商品列表
		async getProductList() {
			this.productList = [];
			try {
				const params = {
					classifyId: this.classifyId
				};
				const { data, ok } = await product.list(params);
				if (!ok) return;
				console.log(data);
				this.productList.push(...data.data);
			} catch (error) {
				errors(error);
			}
		},
		//获取轮播内容，为热门前五个商品的图片展示
		async getSwiper() {
			try {
				const params = {
					classifyId: this.classifyId
				};
				const { data, ok } = await product.list(params);
				if (!ok) return;
				if (data.data && Array.isArray(data.data)) {
					data.data.forEach((element, index) => {
						if (index < 5) {
							this.swiperList.push(element);
						}
					});
				}
			} catch (error) {
				errors(error);
			}
		},
		//搜索
		toSearch() {
			this.$router.push({
				name: 'search'
			});
		},
		//查看商品详情
		toDetail(item) {
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
