<style lang="less">
@vw: 7.5vw;
.setting_wrap {
	width: 100vw;
	overflow: hidden;
	box-sizing: border-box;
	.set_wrap {
		width: 100%;
		box-sizing: border-box;
		padding: 100 / @vw 40 / @vw 40 / @vw;
	}
	.user_img {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-end;
		align-items: center;
		img {
			box-shadow: 0 0 2 / @vw 2 / @vw rgb(212, 212, 212);
			width: 100 / @vw;
			height: 100 / @vw;
			border-radius: 50%;
			vertical-align: top;
		}
	}
	.van-cell {
		display: flex;
		align-items: center;
	}
	.van-cell__title {
		display: flex;
		align-items: center;
	}
	.set_password {
		margin-top: 50 / @vw;
		width: 100%;
	}
	.update_avatar {
		width: 100%;
		box-sizing: border-box;
		padding: 20 / @vw 40 / @vw;
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
		.upload_img {
			width: 230 / @vw;
			height: 230 / @vw;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			box-shadow: 0 0 2 / @vw 2 / @vw rgb(212, 212, 212);
			overflow: hidden;
			img {
				width: 200 / @vw;
				height: 200 / @vw;
				border-radius: 50%;
				vertical-align: top;
			}
			.icon {
				font-size: 100 / @vw;
				color: rgb(212, 212, 212);
			}
		}
	}
	.update_text {
		padding: 40 / @vw 40 / @vw;
	}
}
</style>
<template>
	<div class="setting_wrap">
		<van-nav-bar title="个人设置" left-text="返回" left-arrow @click-left="onBack" />
		<div class="set_wrap">
			<van-cell title="头像" is-link @click="setAvatarDialog">
				<template>
					<div class="user_img">
						<img :src="userInfo.avatarUrl" alt="" />
					</div>
				</template>
			</van-cell>
			<van-cell title="昵称" :value="userInfo.nickName" is-link @click="updateNickNameDialog" />
			<van-cell title="个人简介" :value="userInfo.descript" is-link @click="updateDescriptDialog" />
			<van-cell title="手机号" :value="userInfo.phone" is-link @click="updatePhoneDialog" />
			<van-button class="set_password" type="info" @click="updatePasswordDialog">修改密码</van-button>
		</div>
		<van-dialog v-model="avatarUpload" title="修改头像" show-cancel-button @confirm="confirmUpdateAvatar">
			<div class="update_avatar">
				<van-uploader :after-read="getFile">
					<div class="upload_img">
						<img :src="avatarUrl" alt="" v-if="avatarUrl" />
						<i class="icon iconfont iconjiahao1" v-else></i>
					</div>
				</van-uploader>
			</div>
		</van-dialog>
		<van-dialog v-model="nickShow" title="修改昵称" show-cancel-button @confirm="updateNickName">
			<van-field class="update_text" v-model.trim="nickName" placeholder="请输入新昵称" label="新昵称" />
		</van-dialog>
		<van-dialog v-model="passwordShow" title="修改密码" show-cancel-button @confirm="updatePassword">
			<van-field
				class="update_text"
				type="password"
				v-model.trim="oldPassword"
				placeholder="请输入旧密码"
				label="旧密码"
			/>
			<van-field
				class="update_text"
				type="password"
				v-model.trim="newPassword"
				placeholder="请输入新密码"
				label="新密码"
			/>
			<van-field
				class="update_text"
				type="password"
				v-model.trim="confirmPassword"
				placeholder="请确认新密码"
				label="确认密码"
			/>
		</van-dialog>
		<van-dialog v-model="desciptShow" title="修改简介" show-cancel-button @confirm="updateDescript">
			<van-field class="update_text" v-model.trim="descript" placeholder="请输入个人简介" label="个人简介" />
		</van-dialog>
		<van-dialog v-model="phoneShow" title="修改手机号" show-cancel-button @confirm="updatePhone">
			<van-field class="update_text" v-model.trim="phone" placeholder="请输入手机号" label="手机号" />
		</van-dialog>
	</div>
</template>
<script>
import { users, errors } from '@/api';
import { mapState, mapActions } from 'vuex';

export default {
	computed: {
		...mapState({
			userInfo: state => state.users.userInfo
		})
	},
	data() {
		return {
			info: {},
			avatarUpload: false,
			avatarUrl: null,
			nickShow: false,
			nickName: null,
			passwordShow: false,
			oldPassword: '',
			newPassword: '',
			confirmPassword: '',
			desciptShow: false,
			descript: null,
			phoneShow: false,
			phone: null
		};
	},
	mounted() {
		this.info = this.userInfo;
		console.log(this.info);
	},
	methods: {
		...mapActions({
			setUserInfo: 'users/setUserInfo'
		}),
		setAvatarDialog() {
			this.avatarUrl = null;
			this.avatarUpload = true;
		},
		getFile(file) {
			this.$toast.loading();
			const _this = this;
			let reader = new FileReader();
			let baseStr = '';
			reader.readAsDataURL(file.file);
			reader.onload = function(e) {
				baseStr = this.result;
				_this.avatarUrl = baseStr;
				_this.$toast.clear();
			};
		},
		async confirmUpdateAvatar() {
			this.$toast.loading();
			if (!this.avatarUrl || this.avatarUrl.length === 0) {
				this.avatarUpload = false;
				this.$toast.clear();
				return;
			}
			try {
				const userData = {
					userId: this.userInfo.userId
				};
				const reData = {
					avatarUrl: this.avatarUrl
				};
				const { data, ok } = await users.userAvatarUpdate(this.userInfo.userId, reData);
				if (!ok) return;
				this.$toast.clear();
				this.$toast(data.msg);
				this.setUserInfo(userData);
			} catch (error) {
				errors(error);
			}
		},
		updateNickNameDialog() {
			this.nickName = null;
			this.nickShow = true;
		},
		async updateNickName() {
			this.$toast.loading();
			if (!this.nickName || this.nickName.length === 0) {
				this.$toast.clear();
				this.$toast('请输入新昵称');
				return;
			}
			try {
				const userData = {
					userId: this.userInfo.userId
				};
				const reData = {
					nickName: this.nickName
				};
				const { data, ok } = await users.userNickNameUpdate(this.userInfo.userId, reData);
				if (!ok) return;
				this.$toast.clear();
				this.$toast(data.msg);
				this.setUserInfo(userData);
			} catch (error) {
				errors(error);
			}
		},
		updatePasswordDialog() {
			this.oldPassword = null;
			this.newPassword = null;
			this.confirmPassword = null;
			this.passwordShow = true;
		},
		async updatePassword() {
			this.$toast.loading();
			if (this.oldPassword !== this.userInfo.password) {
				this.$toast.clear();
				this.$toast('密码错误，请输入正确密码');
				return;
			}
			if (!this.newPassword || this.newPassword.length === 0) {
				this.$toast.clear();
				this.$toast('新密码不能为空');
				return;
			}
			if (this.newPassword !== this.confirmPassword) {
				this.$toast.clear();
				this.$toast('密码确认错误，请检查两次密码是否一致');
				return;
			}
			if (this.newPassword === this.userInfo.password) {
				this.$toast.clear();
				this.$toast('新密码与旧密码不能一致');
				return;
			}
			if (this.newPassword === this.userInfo.userName) {
				this.$toast.clear();
				this.$toast('新密码与用户名不能一致');
				return;
			}
			try {
				const time = new Date().getTime();
				const userData = {
					userId: this.userInfo.userId
				};
				const reData = {
					password: btoa(this.newPassword + '+' + time)
				};
				const { data, ok } = await users.updatePassword(userData, reData);
				if (!ok) return;
				this.$toast.clear();
				this.$toast(data.msg);
				localStorage.removeItem('WEBSHOPLOGIN');
				this.$router.push({
					name: 'login'
				});
			} catch (error) {
				errors(error);
			}
		},
		//修改简介
		updateDescriptDialog() {
			this.descript = null;
			this.desciptShow = true;
		},
		async updateDescript() {
			this.$toast.loading();
			try {
				const userData = {
					userId: this.userInfo.userId
				};
				const reData = {
					descript: this.descript
				};
				const { data, ok } = await users.userDescriptUpdate(this.userInfo.userId, reData);
				if (!ok) return;
				this.$toast.clear();
				this.$toast(data.msg);
				this.setUserInfo(userData);
			} catch (error) {
				errors(error);
			}
		},
		//修改手机号
		updatePhoneDialog() {
			this.phone = null;
			this.phoneShow = true;
		},
		async updatePhone() {
			this.$toast.loading();
			if (!/^1[3456789]\d{9}$/.test(this.phone)) {
				this.$toast.clear();
				this.$toast('手机号码有误');
				return;
			}
			try {
				const userData = {
					userId: this.userInfo.userId
				};
				const reData = {
					phone: this.phone
				};
				const { data, ok } = await users.userPhoneUpdate(this.userInfo.userId, reData);
				if (!ok) return;
				this.$toast.clear();
				this.$toast(data.msg);
				this.setUserInfo(userData);
			} catch (error) {
				errors(error);
			}
		},
		onBack() {
			this.$router.go(-1);
		}
	}
};
</script>
