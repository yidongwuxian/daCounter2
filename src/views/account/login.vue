<template>
	<div class="container">
		<van-row type="flex" justify="center" class="mT50 mB40">欢迎登录养老通</van-row>
		<van-form @submit="onSubmit" ref="form">
			<van-field
				v-model="form.username"
				name="username"
				auto-complete="off"
				center
				clearable
				label="账号"
				placeholder="请输入账号"
				:rules="[{ validator:isUsername}]"
			></van-field>
			<van-field
				v-model="form.password"
				name="password"
				type="password"
				auto-complete="off"
				center
				clearable
				label="密码"
				placeholder="请输入您的密码"
				:rules="[{ validator:isPassword}]"
			></van-field>
			<van-row type="flex" justify="space-between" class="mT20 mR30 mB20 mL30 font20">
				<!-- <van-col><span class='fontC098AE8 pointer' @click="changePhone()">手机号已更换</span></van-col> -->
				<van-col>
					<span class="fontC098AE8 pointer" @click="forgetPassword()">忘记密码</span>
				</van-col>
			</van-row>
			<div style="margin: 16px;">
				<van-button
					block
					type="default"
					native-type="button"
					:disabled="disabledSubmitBtn"
					class="submit"
					@click="submit()"
				>立即登录</van-button>
			</div>
		</van-form>
		<van-row type="flex" justify="center" class="mT30">
			<el-checkbox v-model="checked">我已阅读并同意
				<span @click="YLTuserAgreement" style="cursor:pointer">《"养老通"软件使用及服务协议》</span>
			</el-checkbox>
		</van-row>
		<van-row type="flex" justify="center" class="mT50">
			<div class="font20 fontC455a646">
				<span>如果您是新入驻养老机构，请</span>
				<span class="fontC098AE8 pointer" @click="goRegister()">注册</span>
			</div>
		</van-row>
		<!-- <van-row type="flex" justify="center" class="mT30">
			<div class="font20  fontC455a646">
				<span>登录注册即表示同意</span>
				<span class='fontC098AE8 pointer' @click="userAgreement()">用户协议</span>
				<span class='fontC098AE8'>、</span>
				<span class='fontC098AE8 pointer' @click="privacyPolicy()">隐私条款</span>
			</div>
		</van-row>-->
	</div>
</template>

<script>
import md5 from "js-md5";
import { loginByH5 } from "@/api/account";
import { isUsername, isPassword, isPassword1 } from "@/utils/validate.js";
import { setTimeout } from "timers";
export default {
  name: "login",
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      errform: {
        username: false,
        password: false
      },
      time: 60,
      disabledCodeBtn: "",
      smsTipText: "获取验证码",
      disabledSubmitBtn: true,
      checked: false
    };
  },
  created() {},
  mounted() {
    // 绑定enter事件
    this.enterKeyup();
  },
  methods: {
    enterKey(event) {
      const componentName = this.$options.name;
      if (componentName == "login") {
        const code = event.keyCode
          ? event.keyCode
          : event.which
            ? event.which
            : event.charCode;
        // console.log(code);
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
    submit() {


      this.$refs.form.submit();
    },
    onSubmit(values) {

      if (!this.checked) {
        this.$dialog.alert({
          message: '请先勾选《"养老通"软件使用及服务协议》'
        });
        return false;
      }

      values.password = md5(values.password);
      this.$store
        .dispatch("Login", values)
        .then(response => {
          if (response.data.isSuccess == "true") {
            this.enterKeyupDestroyed();
            if (response.data.bindStatus == 0) {
              this.$dialog
                .alert({
                  message: "未绑定手机号和微信号"
                })
                .then(() => {
                  this.$router.push({
                    path: "/boundPhone"
                  });
                });
            }
            if (response.data.bindStatus == 1) {
              this.$router.push({
                path: "/home"
              });
            }
            if (response.data.bindStatus == 2) {
              this.$dialog
                .alert({
                  message: "未绑定手机号"
                })
                .then(() => {
                  this.$router.push({
                    path: "/boundPhone"
                  });
                });
            }
            if (response.data.bindStatus == 3) {
              // this.$router.push({
              // 	path: '/home'
              // })
              this.$dialog
                .alert({
                  message: "未绑定微信号"
                })
                .then(() => {
                  this.$router.push({
                    path: "/boundWexin"
                  });
                });
            }
          } else {
            this.$dialog
              .alert({
                message: response.data.msg
              })
              .then(() => {});
          }
        })
        .catch(err => {
          this.$dialog
            .alert({
              message: "登录失败，请重试"
            })
            .then(() => {});
        });
    },
    isDisabledSubmitBtn() {
      Object.keys(this.errform).forEach(key => {
        this.disabledSubmitBtn = false;
        if (!this.errform[key]) {
          this.disabledSubmitBtn = true;
        }
      });
    },
    async isUsername(value, rule) {
      let data = await isUsername(value, {
        callType: 2,
        type: "axios"
      });
      rule.message = data.errMsg;
      this.errform.username = data.flag;
      this.isDisabledSubmitBtn();
      return data.flag;
    },
    isPassword(value, rule) {
      let data = isPassword(value);
      rule.message = data.errMsg;
      this.errform.password = data.flag;
      this.isDisabledSubmitBtn();
      return data.flag;
    },
    clear() {
      // this.disabledCodeBtn = true
    },
    goRegister() {
      this.$router.push({
        path: "/register"
      });
    },
    privacyPolicy() {
      this.$router.push({
        path: "/privacyPolicy"
      });
    },
    userAgreement() {
      this.$router.push({
        path: "/userAgreement"
      });
    },

    YLTuserAgreement() {
      this.$router.push({
        path: "/YLTuserAgreement"
      });
    },

    changePhone() {
      this.$router.push({
        path: "/changePhone"
      });
    },
    forgetPassword() {
      this.$router.push({
        path: "/forgetPassword"
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss">
</style>
