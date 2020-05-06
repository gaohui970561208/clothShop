<style lang="less">
@vw: 7.5vw;
.wrapper {
	width: 100vw;
	max-height: 100vh;
	box-sizing: border-box;
	padding-bottom: 100 / @vw;
	overflow-x: hidden;
	overflow-y: auto;
	-ms-overflow-style: none;
	&::-webkit-scrollbar {
		display: none;
	}
}
</style>
<template>
	<div class="wrapper">
		<router-view />
		<TabBar />
	</div>
</template>
<script>
import TabBar from '@/components/TabBar';

export default {
	components: {
		TabBar
	},
	methods: {
		login() {
			this.$router.push({
				name: 'login'
			});
		}
	}
};
</script>
