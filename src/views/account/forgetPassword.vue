<template>
	<div class="container">
		<div class="van-doc-demo-block__title">忘记密码</div>
		<van-form @submit="onSubmit" ref="form">
			<van-field v-model="form.phone" name="phone" auto-complete="off" center clearable label="手机号" placeholder="请输入手机号"
			 :rules="[{ validator:isPhone}]" @clear="clear()">
				<template #button>
					<van-button size="small" type="default" native-type="button" :class="['basics']" :disabled='disabledCodeBtn'
					 @click="sendSms()">{{smsTipText}}</van-button>
				</template>
			</van-field>
			<van-field v-model="form.smsCode" name="smsCode" auto-complete="off" center clearable label="验证码" placeholder="请输入6位数验证码" maxlength="6"
			 :rules="[{ validator:isSmsCode}]">
			</van-field>
			<van-field v-model="form.password" name="password" type="password" auto-complete="off" center clearable label="设置密码"
			 placeholder="请输入您的密码" :rules="[{ validator:isPassword}]">
			</van-field>
			<van-field v-model="form.password1" name="password1" type="password" auto-complete="off" center clearable label="确认密码"
			 placeholder="请再次确认密码" :rules="[{ validator:isPassword1}]">
			</van-field>
			<div style="margin: 16px;">
				<van-button block type="default" native-type="button" :disabled='disabledSubmitBtn' class="submit" @click="submit()">
					立即修改
				</van-button>
			</div>
		</van-form>
	</div>
</template>

<script>
	import md5 from 'js-md5'
	import {
		sendSms,
		updatePasswordByH5
	} from '@/api/account'
	import {
		getLocalStorage,
	} from '@/utils/auth'
	import {
		isPhone,
		isSmsCode,
		isPassword,
		isPassword1
	} from '@/utils/validate.js'
	export default {
		name: "forgetPassword",
		data() {
			return {
				form: {
					phone: '',
					smsCode: '',
					password: '',
					password1: '',
				},
				errform: {
					phone: false,
					smsCode: false,
					password: false,
					password1: false,
				},
				time: 60,
				disabledCodeBtn: '',
				smsTipText: '获取验证码',
				disabledSubmitBtn: true
			};
		},
		created() {
		},
		mounted() {
		    // 绑定enter事件
		    this.enterKeyup();
		},
		methods: {
			enterKey(event) {
				const componentName = this.$options.name;
				if (componentName == "forgetPassword") {
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
				delete(values.password1);
				values.password=md5(values.password)
				updatePasswordByH5(values,'axios').then(res => {
					if(res.data.resultFlag=="success"){
						this.enterKeyupDestroyed();
						//跳登录页面
						this.$router.push({
							path: '/login'
						})
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
					callType: 2,
					type:'axios'
				})
				console.log(data)
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
			isPassword(value, rule) {
				let data = isPassword(value)
				rule.message = data.errMsg
				this.errform.password = data.flag
				this.isDisabledSubmitBtn()
				return data.flag;
			},
			isPassword1(value, rule) {
				let data = isPassword1(value, {
					password: this.form.password
				})
				rule.message = data.errMsg
				this.errform.password1 = data.flag
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
					if(res.data.resultFlag=="success"){
						this.countDown(this.time)
					}
				}).catch((err) => {
					// this.loading = false
				})
			},
			abc(){
				console.log(123)
				// getLocalStorage('userToken')
				this.$router.push({
					path: '/login'
				})
			}

		},


	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss">


</style>
