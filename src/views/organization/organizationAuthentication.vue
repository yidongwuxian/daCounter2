<template>
  <div class="container">
    <div class="panel__top">
      <div class="panel__top__title">
        认证信息
        <span v-if="state==2" class="state_span state2">待审核</span>
        <span v-if="state==3" class="state_span state3">审核通过</span>
        <span v-if="state==4" class="state_span state4">审核不通过</span>
      </div>

      <div v-if="state==3" class="state_bottom">审核人：北京民政-许凯 15900886622</div>
      <div v-if="state==4" class="state_bottom">
        审核不通过原因：
        1. 身份证照片不是法人代表本人身份证；
        2. 营业执照不清晰
        <br>
        审核人：北京民政-许凯 15900886622
      </div>

      <van-form>
        <van-cell-group>
          <van-field
            v-model="form.name"
            :rules="rulues.name"
            label="机构名称"
            placeholder="请输入"
            input-align="right"
            :disabled="disabledBool"
            clearable
          />
        </van-cell-group>
        <van-cell-group>
          <van-field
            value
            label="机构编码"
            placeholder="请输入"
            input-align="right"
            :disabled="disabledBool"
          />
        </van-cell-group>
        <van-cell-group>
          <van-field
            value
            label="法人姓名"
            placeholder="请输入"
            input-align="right"
            :disabled="disabledBool"
          />
        </van-cell-group>
        <van-cell-group>
          <van-field
            value
            label="法人身份证"
            placeholder="请输入"
            input-align="right"
            :disabled="disabledBool"
          />
        </van-cell-group>
        <van-cell-group>
          <van-field
            value
            label="组织机构代码"
            placeholder="请输入"
            input-align="right"
            :disabled="disabledBool"
          />
        </van-cell-group>
        <van-cell-group>
          <van-field
            value
            label="联系电话"
            placeholder="请输入"
            input-align="right"
            :disabled="disabledBool"
          />
        </van-cell-group>

        <!-- <van-button round block type="info" native-type="submit">
      提交
        </van-button>-->
      </van-form>
    </div>

    <div>
      <div class="panel__top__title">认证证件</div>
      <div class="padding-base font28">
        营业执照
        <span style="float:right;color:#919191">已上传{{fileList.length}}张</span>
      </div>
      <div style="padding:10px" class="padding-base">
        <van-uploader v-model="fileList" multiple :after-read="afterRead" />
      </div>

      <div class="padding-base font28">
        法人身份证
        <span style="float:right;color:#919191">已上传{{fileList2.length}}张</span>
      </div>
      <div style="padding:10px" class="padding-base">
        <van-uploader v-model="fileList2" multiple :after-read="afterRead2" />
      </div>
    </div>
	<van-row type="flex" justify="center" class="pT20 pR16 pB20 pL16" v-if="state==1">
		<van-col class='mR20'>
			<van-button type="default" size="small" @click="submit" class="submit">保存</van-button>
		</van-col>
		<van-col class=''>
			<van-button type="default" size="small" class="submit">提交审核</van-button>
		</van-col>
	</van-row>
   <!-- <div class="panel__bottom">
      <van-button plain type="info" @click="submit">&nbsp;&nbsp;保 存&nbsp;&nbsp;</van-button>&nbsp;&nbsp;
      <van-button plain type="info">提交审核</van-button>
    </div> -->
  </div>
</template>

<script>
//
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      form: {
        username: ""
      },
      rulues: {
        username: [{ required: true }, { pattern: /\d/, message: "不符合要求" }]
      },

      fileList: [
        { url: "https://img.yzcdn.cn/vant/leaf.jpg" },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        { url: "https://cloud-image", isImage: true }
      ],
      fileList2: [],
      disabledBool: false,
      state: "1" //1申请，2待审核，3通过，4不通过
    };
  },
  mounted() {
    getState();
  },
  methods: {
    getState() {},
    submit() {
      console.log(this.form);
    },
    afterRead(file) {
      console.log(file);
    },
    afterRead2(file) {
      console.log(file);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  background: #f4f4f4;
}
.panel__top {
}
.panel__top__title {
  height: 100px;
  line-height: 100px;
  color: #ff9900;
  border-bottom: 1px solid #e4e4e4;
  background: white;
  padding-left: 20px;
}
.panel__bottom {
  text-align: center;
}

.state_span {
  display: inline-block;
  text-align: center;
  width: 200px;
  height: 60px;
  line-height: 60px;
  font-size: 18px;
}
.state2 {
  background: #FFEEDD;
  color: #FF9900;
}
.state3 {
  background: #D7F7EF;
  color: #00CC99;
}
.state4 {
  background: #FFEEDD;
  color:#FF9900
}
.state_bottom{
  background:#F2F2F2;
  padding: 10px 20px;
  font-size: 18px;
}
</style>
