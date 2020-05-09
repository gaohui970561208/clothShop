<style lang="less">
@vw: 7.5vw;
.address_list_wrap {
	width: 100%;
	height: 100vh;
	overflow-x: hidden;
	overflow-y: auto;
	box-sizing: border-box;
	.address_list {
		width: 100%;
		box-sizing: border-box;
		padding: 30 / @vw 30 / @vw 120 / @vw;
	}
	.add_btn_wrap {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		box-sizing: border-box;
		padding: 20 / @vw 40 / @vw;
		.add_btn {
			width: 100%;
			box-sizing: border-box;
			padding: 20 / @vw 0;
			border-radius: 40 / @vw;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #ffffff;
			cursor: pointer;
			background-image: linear-gradient(to top, rgb(247, 157, 255), rgb(215, 39, 231));
		}
	}
	.add_address {
		top: 0;
		box-sizing: border-box;
		padding: 40 / @vw 20 / @vw;
	}
	.address_btn_wrap {
		margin-top: 50 / @vw;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-around;
		align-items: center;
		.btn {
			padding: 0 50 / @vw;
		}
	}
	.address_content {
		margin-left: 30 / @vw;
		width: 500 / @vw;
		box-sizing: border-box;
		display: flex;
		flex-flow: column;
		position: relative;
		.address_top {
			display: flex;
			flex-flow: row nowrap;
			justify-content: flex-start;
			align-items: center;
			.address_name {
				font-size: 30 / @vw;
			}
			.address_phone {
				margin-left: 40 / @vw;
				font-size: 28 / @vw;
			}
		}
		.address_address {
			margin-top: 30 / @vw;
			.address_area {
				font-size: 28 / @vw;
			}
			.address_text {
				margin-top: 10 / @vw;
				font-size: 24 / @vw;
			}
		}
		.edit_icon {
			position: absolute;
			top: 50%;
			right: 0;
			transform: translateY(-50%);
			width: 50 / @vw;
			height: 50 / @vw;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			.icon {
				font-size: 45 / @vw;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
	.van-radio {
		box-sizing: border-box;
		padding: 10 / @vw 30 / @vw;
		border-radius: 8 / @vw;
		border: 2 / @vw solid rgb(247, 157, 255);
	}
}
</style>
<template>
	<div class="address_list_wrap">
		<van-nav-bar title="地址管理" left-text="返回" left-arrow @click-left="onBack" />
		<div class="address_list">
			<van-radio-group v-model="addressItem">
				<van-radio v-for="(item, index) in addressList" :key="index" :name="item">
					<div class="address_content">
						<div class="address_top">
							<div class="address_name">{{ item.name }}</div>
							<div class="address_phone">{{ item.phone }}</div>
						</div>
						<div class="address_address">
							<div class="address_area">{{ item.area }}</div>
							<div class="address_text">{{ item.address }}</div>
						</div>
						<div class="edit_icon" @click="editAddress(item, index)">
							<div class="icon iconfont iconbianji"></div>
						</div>
					</div>
				</van-radio>
			</van-radio-group>
		</div>
		<div class="add_btn_wrap">
			<div class="add_btn" @click="addAddressShow">
				<span>新增地址</span>
			</div>
		</div>
		<van-popup v-model="addressDataShow" position="bottom" class="add_address">
			<van-cell title="姓名" is-link :value="addressData.name" @click="nameDialog" />
			<van-cell title="联系方式" is-link :value="addressData.phone" @click="phoneDialog" />
			<van-cell title="目标省市" is-link :value="addressData.area" @click="choiceAddress" />
			<van-cell title="具体地址" is-link :value="addressData.address" @click="addAddress" />
			<van-cell title="设为默认">
				<van-switch v-model="addressData.isDefault" />
			</van-cell>
			<div class="address_btn_wrap">
				<van-button class="btn" @click="add">确认</van-button>

				<van-button class="btn" @click="cancelAddress">取消</van-button>
			</div>
		</van-popup>
		<van-popup v-model="areaChoice" position="bottom">
			<van-area
				:area-list="areaList"
				:columns-placeholder="['请选择', '请选择', '请选择']"
				@confirm="confirm"
				@cancel="cancel"
			/>
		</van-popup>
		<van-dialog v-model="addressShow" title="标题" show-cancel-button @confirm="addressUpdate">
			<van-field v-model="addressTxt" placeholder="请输入详细地址" />
		</van-dialog>
		<van-dialog v-model="nameShow" title="标题" show-cancel-button @confirm="nameUpdate">
			<van-field v-model="nameTxt" placeholder="请输入联系人姓名" />
		</van-dialog>
		<van-dialog v-model="phoneShow" title="标题" show-cancel-button @confirm="phoneUpdate">
			<van-field v-model="phoneTxt" placeholder="请输入联系方式" />
		</van-dialog>
	</div>
</template>
<script>
import { mapState } from 'vuex';
import { users, error } from '@/api';
import areaList from '@/plugins/areaList';

export default {
	computed: {
		...mapState({
			userInfo: state => state.users.userInfo
		})
	},
	data() {
		return {
			areaList,
			addressList: [],
			addressData: {
				name: null,
				phone: null,
				area: null,
				address: null,
				isDefault: false
			},
			areaChoice: false,
			addressDataShow: false,
			addressShow: false,
			nameShow: false,
			phoneShow: false,
			addStatus: true,
			editIndex: 0,
			addressTxt: '',
			nameTxt: '',
			phoneTxt: '',
			addressItem: {}
		};
	},
	mounted() {
		this.getAddressList();
	},
	methods: {
		async getAddressList() {
			try {
				this.addressList = [];
				const params = {
					userId: this.userInfo.userId
				};
				const { data, ok } = await users.getAddressList(params);
				if (!ok) return;
				console.log(data);
				if (data.data && Array.isArray(data.data) && data.data.length > 0) {
					data.data.forEach(element => {
						if (element.isDefault) {
							this.addressItem = element;
						}
						this.addressList.push(element);
					});
					if (data.data.length === 1) {
						this.addressItem = data.data[0];
					}
				} else {
					return;
				}
			} catch (error) {
				errors(error);
			}
		},
		async updateAddress() {
			try {
				const params = {
					userId: this.userInfo.userId
				};
				const reData = {
					addressList: this.addressList
				};
				const { data, ok } = await users.updateAddressList(params, reData);
				if (!ok) return;
				this.getAddressList();
			} catch (error) {
				errors(error);
			}
		},
		addAddressShow() {
			this.addStatus = true;
			this.addressDataShow = true;
		},
		//选择地址
		choiceAddress() {
			this.areaChoice = true;
		},
		confirm(data) {
			this.addressData.area = '';
			data.forEach(element => {
				this.addressData.area += element.name;
			});
			this.areaChoice = false;
		},
		cancel() {
			this.areaChoice = false;
		},
		addAddress() {
			this.addressShow = true;
			this.addressTxt = '';
		},
		nameDialog() {
			this.nameShow = true;
			this.nameTxt = '';
		},
		phoneDialog() {
			this.phoneShow = true;
			this.phoneTxt = '';
		},
		addressUpdate() {
			this.addressData.address = this.addressTxt;
		},
		nameUpdate() {
			this.addressData.name = this.nameTxt;
		},
		phoneUpdate() {
			if (!/^1[3456789]\d{9}$/.test(this.phoneTxt)) {
				this.$toast('手机号码有误');
				return;
			}
			this.addressData.phone = this.phoneTxt;
		},
		cancelAddress() {
			this.addressDataShow = false;
			this.addressData = {
				name: null,
				phone: null,
				area: null,
				address: null
			};
		},
		add() {
			if (this.addressData.name && this.addressData.phone && this.addressData.area && this.addressData.address) {
				if (this.addStatus) {
					if (this.addressData.isDefault) {
						this.addressList.forEach(element => {
							element.isDefault = false;
						});
					}
					if (!this.addressList || this.addressList.length === 0) {
						this.addressData.isDefault = true;
					}
					this.addressList.push(this.addressData);
					this.updateAddress();
				} else {
					if (this.addressData.isDefault) {
						this.addressList.forEach(element => {
							element.isDefault = false;
						});
					}
					this.addressList.splice(this.editIndex, 1, this.addressData);
					this.updateAddress();
				}
				this.addStatus = true;
				this.addressDataShow = false;
			} else {
				this.$toast('请完善收货地址');
			}
		},
		editAddress(item, index) {
			this.addressData = JSON.parse(JSON.stringify(item));
			this.editIndex = index;
			this.addStatus = false;
			this.addressDataShow = true;
		},
		onBack() {
			this.$router.go(-1);
		}
	}
};
</script>
