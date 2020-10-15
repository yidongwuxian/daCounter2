<template>
  <div class="container">
    <div class="van-doc-demo-block__title">新用户注册</div>
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="form.username"
        name="username"
        auto-complete="off"
        center
        clearable
        label="账号名称"
        placeholder="请输入您账号"
        :rules="[{ validator: isUsername }]"
      ></van-field>
      <van-field
        v-model="form.password"
        name="password"
        type="password"
        auto-complete="off"
        center
        clearable
        label="设置密码"
        placeholder="请输入您的密码"
        :rules="[{ validator: isPassword }]"
      ></van-field>
      <van-field
        v-model="form.password1"
        name="password1"
        type="password"
        auto-complete="off"
        center
        clearable
        label="确认密码"
        placeholder="请再次确认密码"
        :rules="[{ validator: isPassword1 }]"
      ></van-field>
      <div style="margin: 16px;">
        <van-button
          block
          type="default"
          native-type="button"
          :disabled="disabledSubmitBtn"
          class="submit"
          @click="submit()"
          >立即注册</van-button
        >
      </div>
    </van-form>
    <van-row type="flex" justify="center" class="mT50">
      <div class="font20 fontC455a646">
        <span>登录注册即表示同意</span>
        <span class="fontC098AE8 pointer" @click="userAgreement()"
          >用户协议</span
        >
        <span class="fontC098AE8">、</span>
        <span class="fontC098AE8 pointer" @click="privacyPolicy()"
          >隐私条款</span
        >
      </div>
    </van-row>
  </div>
</template>

<script>
import md5 from "js-md5";
import { userSignUp } from "@/api/account";
import { getLocalStorage } from "@/utils/auth";
import { isUsername, isPassword, isPassword1 } from "@/utils/validate.js";
export default {
  name: "register",
  data() {
    return {
      form: {
        username: "",
        password: "",
        password1: "",
      },
      errform: {
        username: false,
        password: false,
        password1: false,
      },
      disabledSubmitBtn: true,
    };
  },
  mounted() {
    // 绑定enter事件
    this.enterKeyup();
  },
  methods: {
    enterKey(event) {
      const componentName = this.$options.name;
      if (componentName == "register") {
        const code = event.keyCode
          ? event.keyCode
          : event.which
          ? event.which
          : event.charCode;
        console.log(code);
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
      delete values.password1;
      values.password = md5(values.password);
      userSignUp(values)
        .then((res) => {
          if (res.data.resultFlag == "success") {
            this.enterKeyupDestroyed();
            //跳登录页面
            this.$dialog
              .alert({
                message: "注册成功，请登录",
              })
              .then(() => {
                this.$router.push({
                  path: "/login",
                });
              });
          } else {
            this.$notify({
              type: "error",
              message: res.data.body,
            });
          }
        })
        .catch((err) => {
          // this.loading = false
        });
    },
    isDisabledSubmitBtn() {
      Object.keys(this.errform).forEach((key) => {
        this.disabledSubmitBtn = false;
        if (!this.errform[key]) {
          this.disabledSubmitBtn = true;
        }
      });
    },
    async isUsername(value, rule) {
      let data = await isUsername(value, {
        callType: 1,
        type: "axios",
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
    isPassword1(value, rule) {
      let data = isPassword1(value, {
        password: this.form.password,
      });
      rule.message = data.errMsg;
      this.errform.password1 = data.flag;
      this.isDisabledSubmitBtn();
      return data.flag;
    },
    privacyPolicy() {
      this.$router.push({
        path: "/privacyPolicy",
      });
    },
    userAgreement() {
      this.$router.push({
        path: "/userAgreement",
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss"></style>
