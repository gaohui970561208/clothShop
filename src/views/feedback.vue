<style lang="less">
@vw: 7.5vw;
.feedback_wrap {
	width: 100vw;
	overflow: hidden;
	box-sizing: border-box;
	padding: 40 / @vw 40 / @vw;
	.title {
		text-align: center;
	}
	.feedback {
		padding-top: 50 / @vw;
		width: 100%;
		.tips {
			font-size: 24 / @vw;
			color: rgb(95, 95, 95);
		}
	}
	.van-cell {
		padding: 0;
	}
	.van-field {
		margin-top: 100 / @vw;
		min-height: 500 / @vw;
		height: 700 / @vw;
		box-shadow: 0 0 3 / @vw 5 / @vw rgba(179, 178, 178, 0.89);
		border-radius: 5 / @vw;
		box-sizing: border-box;
		padding: 20 / @vw 5 / @vw;
		.van-field__body {
			height: 90%;
			align-items: flex-start;
			overflow-x: hidden;
			overflow-y: auto;
			&::-webkit-scrollbar {
				display: none;
			}
		}
	}
	.submit_btn {
		margin-top: 50 / @vw;
		width: 100%;
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
		.van-button--normal {
			width: 100%;
		}
	}
}
</style>
<template>
	<div class="feedback_wrap">
		<div class="title">意见反馈</div>
		<div class="feedback">
			<div class="tips">
				请在下面输入您的意见
			</div>
			<van-field
				v-model.trim="feedbackTxt"
				rows="2"
				autosize
				type="textarea"
				maxlength="1000"
				placeholder="请输入意见反馈"
				show-word-limit
			/>
		</div>
		<div class="submit_btn">
			<van-button type="info" @click="sendFeedback">提交意见反馈</van-button>
		</div>
	</div>
</template>
<script>
import { feedback, errors } from '@/api';
import { mapState } from 'vuex';

export default {
	computed: {
		...mapState({
			userInfo: state => state.users.userInfo
		})
	},
	data() {
		return {
			feedbackTxt: ''
		};
	},
	methods: {
		async sendFeedback() {
			this.$toast.loading();
			if (!this.feedbackTxt || this.feedbackTxt.length === 0) {
				this.$toast.clear();
				this.$toast('请输入内容后在提交');
				return;
			}
			try {
				const reData = {
					feedback: this.feedbackTxt
				};
				const { data, ok } = await feedback.sendFeedback(this.userInfo.userId, reData);
				if (!ok) return;
				this.$toast.clear();
				this.$toast(data.msg);
			} catch (error) {
				errors(error);
			}
		}
	}
};
</script>
