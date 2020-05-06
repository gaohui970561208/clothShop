<style lang="less">
@vw: 7.5vw;
.center_wrap {
	width: 100%;
	background-image: linear-gradient(to top, #ffffff, #99ccff);
	.user_message_wrap {
		padding-top: 100 / @vw;
		width: 100%;
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
		.img_wrap {
			width: 300 / @vw;
			height: 300 / @vw;
			box-shadow: 0 0 2 / @vw 3 / @vw #ffffff;
			border-radius: 50%;
			overflow: hidden;
			img {
				width: 100%;
				height: 100%;
				vertical-align: top;
			}
		}
		.user_name {
			padding-top: 50 / @vw;
		}
		.user_descript {
			color: rgb(114, 114, 114);
			padding-top: 40 / @vw;
		}
	}
	.operate_card_wrap {
		margin-top: 50 / @vw;
		width: 100%;
		box-sizing: border-box;
		padding: 50 / @vw 20 / @vw 0;
		.operate_card {
			width: 100%;
			box-shadow: 0 0 3 / @vw 5 / @vw rgb(238, 238, 238);
		}
	}
	.help_wrap {
		width: 100%;
		height: 100vh;
		box-sizing: border-box;
		padding: 150 / @vw 40 / @vw;
		position: relative;
		.help_text {
			font-size: 50 / @vw;
			color: rgb(99, 99, 99);
		}
		.close_btn {
			position: absolute;
			top: 40 / @vw;
			right: 40 / @vw;
			.icon {
				display: flex;
				flex-flow: row nowrap;
				justify-content: center;
				align-items: center;
				color: rgb(99, 99, 99);
				font-size: 50 / @vw;
			}
		}
	}
}
</style>
<template>
	<div class="center_wrap">
		<div class="user_message_wrap">
			<div class="img_wrap">
				<img :src="userInfo.avatarUrl" alt="" />
			</div>
			<div class="user_name">{{ userInfo.nickName || userInfo.userName || '默认昵称' }}</div>
			<div class="user_descript">{{ userInfo.descript || '什么都没有' }}</div>
		</div>
		<div class="operate_card_wrap">
			<div class="operate_card">
				<van-cell title="我的订单" is-link @click="goto('orders')" />
				<van-cell title="购物车" is-link @click="goto('shoppingCart')" />
				<van-cell title="意见反馈" is-link @click="goto('feedback')" />
				<van-cell title="帮助中心" is-link @click="show = true" />
				<van-cell title="设置" is-link @click="goto('setting')" />
			</div>
		</div>
		<van-popup v-model="show" position="bottom">
			<div class="help_wrap">
				<div class="help_text">
					本系统为娱乐购物系统，所有物品以及价格均为虚拟，不具有任何商业价值，如有雷同，纯属巧合。最终解释权归作者所有
				</div>
				<div class="close_btn">
					<i class="icon iconfont iconguanbi1" @click="show = false"></i>
				</div>
			</div>
		</van-popup>
	</div>
</template>
<script>
import { mapState } from 'vuex';
import { users, errors } from '@/api';

export default {
	computed: {
		...mapState({
			userInfo: state => state.users.userInfo
		})
	},
	data() {
		return {
			show: false
		};
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
