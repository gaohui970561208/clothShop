<style lang="less">
@vw: 7.5vw;
.wrapper {
	width: 100vw;
	max-height: 100vh;
	box-sizing: border-box;
	overflow-x: hidden;
	overflow-y: auto;
	-ms-overflow-style: none;
	position: relative;
	transition: all 0.3s linear;
	&::-webkit-scrollbar {
		display: none;
	}
	.to_top {
		position: fixed;
		bottom: 150 / @vw;
		right: 50 / @vw;
		width: 100 / @vw;
		height: 100 / @vw;
		border-radius: 50%;
		background-color: #ffffff;
		box-shadow: 0 0 2 / @vw 1 / @vw rgb(241, 92, 255);
		display: flex;
		align-items: center;
		justify-content: center;
		.icon {
			font-size: 60 / @vw;
			color: rgb(241, 92, 255);
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>
<template>
	<div class="wrapper" @scroll="scrollTop">
		<router-view />
		<TabBar />
		<div class="to_top" @click="toTop" v-show="topShow">
			<i class="icon iconfont icondingbu"></i>
		</div>
	</div>
</template>
<script>
import TabBar from '@/components/TabBar';
import { mapActions } from 'vuex';

export default {
	components: {
		TabBar
	},
	data() {
		return {
			topShow: false
		};
	},
	mounted() {
		this.getClassifyList();
	},
	methods: {
		...mapActions({
			getClassifyList: 'classify/setClassifyList'
		}),
		login() {
			this.$router.push({
				name: 'login'
			});
		},
		scrollTop(e) {
			if (e.target.scrollTop > 400) {
				this.topShow = true;
			}
		},
		toTop() {
			console.log(this.$el);
			this.$el.scrollTop = 0;
			this.topShow = false;
		}
	}
};
</script>
