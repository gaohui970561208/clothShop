<style lang="less">
.tab_bar_wrap {
	width: 100%;
	.van-tabbar-item--active {
		color: rgb(217, 38, 253);
	}
}
</style>
<template>
	<van-tabbar v-model="active" class="tab_bar_wrap">
		<van-tabbar-item name="home" @click="goto('home')">
			<span>首页</span>
			<template #icon="props">
				<i class="icon iconfont" :class="props.active ? 'iconshouyefill' : 'iconshouye'"></i>
			</template>
		</van-tabbar-item>
		<van-tabbar-item name="shoppingCart" @click="goto('shoppingCart')">
			<span>购物车</span>
			<template #icon="props">
				<i class="icon iconfont icongouwuche" :class="props.active ? 'icongouwuchefill' : ''"></i>
			</template>
		</van-tabbar-item>
		<van-tabbar-item name="center" @click="goto('center')">
			<span>个人中心</span>
			<template #icon="props">
				<i class="icon iconfont" :class="props.active ? 'iconwodefill' : 'iconwode'"></i>
			</template>
		</van-tabbar-item>
	</van-tabbar>
</template>
<script>
export default {
	data() {
		return {
			active: 'home'
		};
	},
	mounted() {
		this.active = this.$route.name;
	},
	watch: {
		$route(newValue) {
			if (newValue.name === this.active) {
				return;
			} else {
				this.active = newValue.name;
			}
		}
	},
	methods: {
		goto(name) {
			this.$router.push({
				name: name
			});
		}
	}
};
</script>
