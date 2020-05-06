<style lang="less">
.tab_bar_wrap {
	width: 100%;
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
		<van-tabbar-item name="search" @click="goto('search')">
			<span>搜索</span>
			<template #icon="props">
				<i class="icon iconfont iconsearch1" :class="props.active ? '' : ''"></i>
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
