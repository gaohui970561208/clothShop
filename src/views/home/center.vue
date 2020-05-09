<style lang="less">
@vw: 7.5vw;
.center_wrap {
	width: 100%;
	min-height: 100vh;
	background-image: linear-gradient(to top, rgb(241, 187, 255), rgb(251, 219, 255));
	.user_message_wrap {
		width: 100%;
		box-sizing: border-box;
		padding: 100 / @vw 80 / @vw 0;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		.img_wrap {
			flex-shrink: 0;
			width: 150 / @vw;
			height: 150 / @vw;
			box-shadow: 0 0 2 / @vw 3 / @vw #ffffff;
			border-radius: 50%;
			overflow: hidden;
			img {
				width: 100%;
				height: 100%;
				vertical-align: top;
			}
		}
		.user_meg {
			margin-left: 100 / @vw;
		}
		.user_descript {
			max-width: 340 / @vw;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			color: rgb(114, 114, 114);
			padding-top: 40 / @vw;
		}
	}
	.order_wrap {
		margin-top: 50 / @vw;
		width: 100%;
		box-sizing: border-box;
		padding: 20 / @vw;
		.order_title {
			font-size: 30 / @vw;
		}
		.order_type_list {
			margin-top: 20 / @vw;
			width: 100%;
			border-radius: 10 / @vw;
			overflow: hidden;
			background-color: #ffffff;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;
		}
		.order_item {
			width: 20%;
			height: 120 / @vw;
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			justify-content: center;
			background-color: rgb(255, 238, 254);
			.icon {
				font-size: 60 / @vw;
				color: rgb(110, 65, 65);
			}
			.order_status_text {
				font-size: 20 / @vw;
			}
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
			<div class="user_meg">
				<div class="user_name">{{ userInfo.nickName || userInfo.userName || '默认昵称' }}</div>
				<div class="user_descript">{{ userInfo.descript || '未留下个性签名' }}</div>
			</div>
		</div>
		<div class="order_wrap">
			<div class="order_title">我的订单</div>
			<div class="order_type_list">
				<div class="order_item" @click="toOrder(-1)">
					<i class="icon iconfont icondingdan"></i>
					<span class="order_status_text">全部</span>
				</div>
				<div class="order_item" @click="toOrder(1)">
					<i class="icon iconfont iconwuliu"></i>
					<span class="order_status_text">待发货</span>
				</div>
				<div class="order_item" @click="toOrder(2)">
					<i class="icon iconfont icondaishouhuo"></i>
					<span class="order_status_text">待收货</span>
				</div>
				<div class="order_item" @click="toOrder(4)">
					<i class="icon iconfont iconyiwancheng"></i>
					<span class="order_status_text">已完成</span>
				</div>
				<div class="order_item" @click="toOrder(5)">
					<i class="icon iconfont icontishi"></i>
					<span class="order_status_text">已取消</span>
				</div>
			</div>
		</div>
		<div class="operate_card_wrap">
			<div class="operate_card">
				<van-cell title="地址管理" is-link @click="goto('address')" />
				<van-cell title="账号与安全" is-link @click="goto('setting')" />
				<van-cell title="意见反馈" is-link @click="goto('feedback')" />
				<van-cell title="帮助中心" is-link @click="show = true" />
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
		},
		toOrder(status) {
			this.$router.push({
				name: 'orders',
				params: {
					status: status
				}
			});
		}
	}
};
</script>
