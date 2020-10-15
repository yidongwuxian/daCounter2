<template>
	<div class="container">
		<div class="van-doc-demo-block__title">绑定手机号</div>
		<van-form @submit="onSubmit" ref="form">
			<van-field v-model="form.phone" name="phone" auto-complete="off" center clearable label="手机号" placeholder="请输入手机号"
			 :rules="[{ validator:isPhone}]" @clear="clear()">
				<template #button>
					<van-button size="small" type="default" native-type="button" :class="['basics']" :disabled='disabledCodeBtn'
					 @click="sendSms()">{{smsTipText}}</van-button>
				</template>
			</van-field>
			<van-field v-model="form.smsCode" name="smsCode" auto-complete="off" center clearable label="验证码" maxlength="6" placeholder="请输入6位数验证码"
			 :rules="[{ validator:isSmsCode}]">
			</van-field>
			<div style="margin: 16px;">
				<van-button block type="default" native-type="button" :disabled='disabledSubmitBtn' class="submit" @click="submit()">
					立即绑定
				</van-button>
			</div>
		</van-form>
	</div>
</template>

<script>
	import {
		sendSms,
		updatePhoneByH5
	} from '@/api/account'
	import {
		getLocalStorage,
	} from '@/utils/auth'
	import {
		isPhone,
		isSmsCode,
	} from '@/utils/validate.js'
	export default {
		name: "boundPhone",
		data() {
			return {
				form: {
					phone: '',
					smsCode: '',
				},
				errform: {
					phone: false,
					smsCode: false,
				},
				time: 60,
				disabledCodeBtn: '',
				smsTipText: '获取验证码',
				disabledSubmitBtn: true
			};
		},
		created() {
			// document.onkeydown = (e)=>{
			// 	var key = window.event.keyCode;
			// 	if (key == 13) {
			// 		if(this.$refs.form){
			// 			this.submit()
			// 		}
			// 	}
			// }
		},
		mounted() {
		    // 绑定enter事件
		    this.enterKeyup();
		},
		methods: {
			enterKey(event) {
				const componentName = this.$options.name;
				if (componentName == "boundPhone") {
					const code = event.keyCode ?
						event.keyCode :
						event.which ?
						event.which :
						event.charCode;
						console.log(code)
					if (code == 13) {
						this.submit();
					}
				}
			},
			enterKeyupDestroyed() {
				document.removeEventListener("keyup", this.enterKey);
			},
			enterKeyup() {
				document.addEventListener("keyup", this.enterKey);
			},
			submit(){
				this.$refs.form.submit()
			},
			onSubmit(values) {
				updatePhoneByH5(values).then(res => {
					if (res.data.resultFlag == "success") {
						this.enterKeyupDestroyed();
						if(res.data.body==0){
							this.$dialog.alert({
								message: '未绑定手机号和微信号',
							}).then(() => {
								this.$router.push({
									path: '/boundPhone'
								})
							});
						}
						if(res.data.body==1){
							this.$router.push({
								path: '/home'
							})
						}
						if(res.data.body==2){
							this.$dialog.alert({
								message: '未绑定手机号',
							}).then(() => {
								this.$router.push({
									path: '/boundPhone'
								})
							});
						}
						if(res.data.body==3){
							// this.$router.push({
							// 	path: '/home'
							// })
							this.$dialog.alert({
								message: '未绑定微信号',
							}).then(() => {
								this.$router.push({
									path: '/boundWexin'
								})
							});
						}
					}else{
						this.$notify({
							type: 'error',
							message: res.data.body
						});
					}
				}).catch((err) => {
					// this.loading = false
				})
			},
			isDisabledSubmitBtn() {
				Object.keys(this.errform).forEach(key => {
					this.disabledSubmitBtn = false
					if (!this.errform[key]) {
						this.disabledSubmitBtn = true
					}
				})
			},
			async isPhone(value, rule) {
				let data = await isPhone(value, {
					callType: 1,
					type:'axios'
				})
				if (this.time == 60) {
					this.disabledCodeBtn = !data.flag
				}
				rule.message = data.errMsg
				this.errform.phone = data.flag
				this.isDisabledSubmitBtn()
				return data.flag;
			},
			isSmsCode(value, rule) {
				let data = isSmsCode(value, {
					phone: this.form.phone
				})
				rule.message = data.errMsg
				this.errform.smsCode = data.flag
				this.isDisabledSubmitBtn()
				return data.flag;
			},
			clear() {
				console.log(12312)
				// this.form.phone = ''
				this.disabledCodeBtn = true
			},
			countDown(time) { // / 倒计时方法
				if (time === 0) {
					this.disabledCodeBtn = false
					this.smsTipText = "获取验证码"
					this.time = 60
					return
				} else {
					this.disabledCodeBtn = true;
					this.smsTipText = '获取验证码（' + time + 's）'
					this.time = time
					time--
				}
				setTimeout(() => {
					this.countDown(time)
				}, 1000)
			},
			sendSms() {
				sendSms({
					"phone": this.form.phone
				}).then(res => {
					if (res.data.resultFlag == "success") {
						this.countDown(this.time)
					}
				}).catch((err) => {
					// this.loading = false
				})
			},
		},


	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss">


</style>
