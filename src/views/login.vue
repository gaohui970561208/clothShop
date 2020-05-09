<style lang="less">
@vw: 7.5vw;
.login_wrap {
	width: 100%;
	height: 100vh;
	.logo_wrap {
		margin: 200 / @vw auto 0;
		width: 500 / @vw;
		img {
			width: 100%;
			height: 100%;
			vertical-align: center;
		}
	}
	.form_wrap {
		margin-top: 100 / @vw;
		width: 100%;
		height: 400 / @vw;
		box-sizing: border-box;
		padding: 0 30 / @vw;
	}
	.form_item {
		padding: 40 / @vw;
	}
	.operate_btn_wrap {
		margin-top: 50 / @vw;
		width: 100%;
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
		.btn {
			margin-left: 100 / @vw;
			padding: 0 100 / @vw;
			background-color: rgb(245, 130, 255);
			border-radius: 10 / @vw;
			color: #ffffff;
			&:first-child {
				margin-left: 0;
			}
		}
	}
}
</style>
<template>
	<div class="login_wrap">
		<div class="logo_wrap">
			<img src="../assets/img/logo.png" alt="" />
		</div>
		<div class="form_wrap">
			<van-cell-group>
				<van-field v-model="username" placeholder="请输入用户名" label="用户名" class="form_item" />
				<van-field v-model="password" type="password" label="密码" placeholder="请输入密码" class="form_item" />
				<van-field
					v-show="!loginShow"
					v-model="phone"
					type="tel"
					label="手机号"
					placeholder="请输入密码"
					class="form_item"
				/>
			</van-cell-group>
		</div>
		<div class="operate_btn_wrap">
			<van-button class="btn" @click="login">{{ loginText }}</van-button>
			<van-button class="btn" @click="regesiter">{{ regeText }}</van-button>
		</div>
	</div>
</template>
<script>
import { users, error } from '@/api';
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
	data() {
		return {
			loginShow: true,
			loginText: '登录',
			regeText: '注册',
			username: '',
			password: '',
			phone: ''
		};
	},
	methods: {
		...mapActions({
			setUserInfo: 'users/setUserInfo'
		}),
		async login() {
			if (this.loginShow) {
				const time = new Date().getTime();
				const userData = {
					username: this.username,
					password: btoa(this.password + '+' + time)
				};
				const { data, ok } = await users.login(userData);
				if (!ok) return;
				this.$toast(data.msg);
				//将信息存入本地
				//因为存在中文，此时将
				const loginData = {
					userId: data.data.userId
				};
				this.setUserInfo(loginData);
				const userDataStr = btoa(unescape(encodeURIComponent(JSON.stringify(loginData) + '&&' + time)));
				localStorage.setItem('WEBSHOPLOGIN', userDataStr);
				this.$router.push({
					name: 'index'
				});
			} else {
				this.loginShow = true;
			}
		},
		async regesiter() {
			if (this.loginShow) {
				this.loginShow = false;
			} else {
				const userData = {
					username: this.username,
					password: this.password,
					phone: this.phone
				};
				const { data, ok } = await users.regesiter(userData);
				console.log(data);
				if (!ok) return;
				this.$message.success(data.msg);
				this.login();
			}
		}
	}
};
</script>
