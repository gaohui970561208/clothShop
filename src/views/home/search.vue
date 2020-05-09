<style lang="less">
@vw: 7.5vw;
.search_wrap {
	width: 100%;
	box-sizing: border-box;
	padding: 10 / @vw 20 / @vw;
	.history {
		width: 100%;
		margin-top: 20 / @vw;
		box-sizing: border-box;
		padding: 20 / @vw 20 / @vw;
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		.history_item {
			margin: 0 20 / @vw;
			padding: 10 / @vw 30 / @vw;
			background-color: rgba(237, 238, 241, 0.849);
			font-size: 20 / @vw;
			border-radius: 5 / @vw;
		}
	}
}
</style>
<template>
	<div class="search_wrap">
		<van-nav-bar title="搜索" left-text="返回" left-arrow @click-left="back" />
		<van-search
			v-model="searchTxt"
			placeholder="请输入搜索关键词"
			@search="onSearch"
			:autofocus="true"
			input-align="center"
			@clear="clearSearch"
		/>
		<div class="history" v-if="!searchStatus">
			<div class="history_item" v-for="(item, index) in historyList" :key="index" @click="historySearch(item)">
				{{ item }}
			</div>
		</div>
		<div class="list_wrap" v-else>
			<van-empty image="search" description="没有搜索到商品" v-if="!productList || productList.length === 0" />
			<ProductListD :productList="productList" v-else />
		</div>
	</div>
</template>
<script>
import { product, errors } from '@/api';
import ProductListD from '@/components/home/ProductListD';

export default {
	components: {
		ProductListD
	},
	data() {
		return {
			searchTxt: '',
			productList: [],
			historyList: [],
			searchStatus: false
		};
	},
	mounted() {
		this.getHistory();
	},
	methods: {
		async onSearch(val) {
			if (!val || val.length === 0) {
				return;
			}
			try {
				this.productList = [];
				const reData = {
					title: this.searchTxt
				};
				const { data, ok } = await product.searchProducts(reData);
				if (!ok) return;
				this.productList.push(...data.data);
				this.searchStatus = true;
				//搜索成功时将搜索名称填入本地存储
				//在储存时判断当前的搜索记录数量，保持在20个搜索记录
				//判断当前值是否存储过，若是存过，则将原本存在的值删除，将这个记录放在头部
				this.historyList.forEach((element, index) => {
					if (element == val) {
						this.historyList.splice(index, 1);
					}
				});
				if (this.historyList.length >= 20) {
					this.historyList.pop();
				}
				this.historyList.unshift(val);
				localStorage.setItem('SHOPSEARCHHISTORY', JSON.stringify(this.historyList));
			} catch (error) {
				errors(error);
			}
		},
		getHistory() {
			this.historyList = JSON.parse(localStorage.getItem('SHOPSEARCHHISTORY')) || [];
		},
		historySearch(val) {
			this.searchTxt = val;
			this.onSearch(this.searchTxt);
		},
		clearSearch() {
			this.searchTxt = '';
			this.productList = [];
			this.searchStatus = false;
		},
		//返回上一页
		back() {
			this.$router.go(-1);
		}
	}
};
</script>
