<style lang="less">
@vw: 7.5vw;
.home_wrap {
	width: 100%;
	max-width: 100%;
	height: 100%;
	.list_to_product {
		width: 100%;
	}
	.list_wrap {
		margin-top: 50 / @vw;
		width: 100vw;
	}
	.list_to_no_paroduct {
		width: 100%;
	}
}
</style>
<template>
	<div class="home_wrap">
		<van-tabs v-model="classifyId" color="#1989fa" title-active-color="#1989fa" @change="tabChange">
			<van-tab title="热门" :name="0"></van-tab>
			<van-tab :title="item.classifyName" v-for="(item, index) in classifyList" :key="index"></van-tab>
		</van-tabs>
		<div class="list_to_no_paroduct" v-if="!productList || productList.length === 0">
			<van-empty description="暂无此类商品" />
		</div>
		<div class="list_to_product" v-else>
			<div class="list_wrap" v-if="classifyId === 0">
				<ProductList :productList="productList" />
			</div>
			<div class="list_wrap" v-else>
				<ProductListD :productList="productList" />
			</div>
		</div>
	</div>
</template>
<script>
import { product, errors } from '@/api';
import { mapState } from 'vuex';
import ProductList from '@/components/home/ProductList';
import ProductListD from '@/components/home/ProductListD';

export default {
	components: {
		ProductList,
		ProductListD
	},
	data() {
		return {
			classifyId: 0,
			classifyList: [],
			productList: []
		};
	},
	mounted() {
		this.getClassifyList();
	},
	methods: {
		async getClassifyList() {
			try {
				const { data, ok } = await product.getClassifyList();
				if (!ok) return;
				this.classifyList.push(...data.data);
				//检查是否存在上次浏览类型
				if (sessionStorage.getItem('CLASSIFY') || parseInt(sessionStorage.getItem('CLASSIFY')) === 0) {
					this.classifyId = parseInt(sessionStorage.getItem('CLASSIFY'));
				}
				this.getProductList();
			} catch (error) {
				errors(error);
			}
		},
		//将浏览类型存入session中，防止刷新返回热门
		tabChange(name, title) {
			if (name === parseInt(sessionStorage.getItem('CLASSIFY'))) {
				return;
			} else {
				sessionStorage.setItem('CLASSIFY', name);
				this.getProductList();
			}
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
		}
	}
};
</script>
