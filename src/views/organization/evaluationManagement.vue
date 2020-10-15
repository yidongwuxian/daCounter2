<template>
  <div class="container">
    <!-- div id="mescroll" class="mescroll" -->

    <div id="mescroll" class="mescroll">
      <div>
        <div class="custom-collapse" v-for="(item,i) in evaluationList" :key="i">
          <div class="pT10 pR16 pB10 pL16 font32 fontC666666">
            <van-row type="flex" justify="space-between" class>
              <van-col>
                <div class="mT10 fontC000000">
                  <span>用户：</span>
                  {{item.phoneNum}}
                </div>
              </van-col>
              <van-col>
                <van-switch
				class="mT10"
                  v-model="item.whetherShow"
                  @click="changeShow(item,i)"
                  size="24px"
                  active-color="#07c160"
                  inactive-color="#999999"
                />
              </van-col>
            </van-row>
            <div class="mT10">
              <span class="fontC000000">评分：</span>
              <van-rate v-model="item.evaluateStar" icon="like" void-icon="like-o" readonly />
            </div>
            <div class="mT10 font28" style="line-height: 1.5;">
              <span class="font32 fontC000000">评语：</span>
				<span v-if="item.evaluateMessage">
					{{(activeNames.indexOf(item.index)==-1)?((item.evaluateMessage.length>49)?item.evaluateMessage.substr(0,49)+'...':item.evaluateMessage):item.evaluateMessage}}
				</span>
            </div>
          </div>
          <van-collapse v-model="activeNames">
            <van-collapse-item :name="item.index">
              <template #title>
                <div class="fontC455a646">{{item.createTime}}</div>
              </template>
              <template #value>
                <div>{{(activeNames.indexOf(item.index)==-1)?'展开':'收起'}}</div>
              </template>
            </van-collapse-item>
          </van-collapse>
        </div>
      </div>
    </div>

    <!-- <el-pagination
      @size-change="paginationSelect"
      @current-change="gotoPage"
      :current-page.sync="listQuery.pageNumber"
      :page-sizes="[10, 30, 50, 100]"
      :page-size="listQuery.pageSize"
      layout="sizes, prev, pager, next,total"
      :total="total"
    ></el-pagination>-->
  </div>
</template>

<script>
// import axios from "axios";
import axios from "@/router/axios";

export default {
  name: "",
  data() {
    return {
      listQuery: {
        pageNumber: 1,
        pageSize: 10,
      },
      total: "",

      activeNames: [],
      evaluationList: [
        // {
        //   index: "1",
        //   phoneNum: "182****0220",
        //   evaluateStar: 3,
        //   checkedIsShow: true,
        //   createTime: "2020-06-08 14:30:00",
        //   evaluateMessage:
        //     "评语：热水用完了总添的不及时，老人不太会用手机不会反馈，希望机构能重视老人的日常饮食起居，组织一些交老人使用电子设备的志愿活动，让大家都参与到其中。热水用完了总添的不及时，老人不太会用手机不会反馈，希望机构能重视老人的日常饮食起居，组织一些交老人使用电子设备的志愿活动，让大家都参与到其中",
        // },
      ],
      value: 2,
      mescroll: "",
    };
  },
  mounted() {
    this.getList();

    setTimeout(() => {
      this.mescroll = new MeScroll("mescroll", {
        up: {
          auto: false, //是否在初始化时以上拉加载的方式自动加载第一页数据; 默认false
          isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
          callback: this.upCallback, //上拉加载的回调
        },
      });
    }, 0);
  },

  methods: {
    upCallback() {
      this.getList();
    },
    // downCallback(){
    //    alert('down')
    //    	this.mescroll.endSuccess();
    // },
    changeShow(item) {
      // if (typeof i != "undefined") {
      //   this.evaluationList = this.evaluationList.map((v, ii) => {
      //     if (i == ii) {
      //       if (v.checkedIsShow == true) {
      //         //  this.activeNames = [];
      //         var pos = this.activeNames.indexOf(v.index);
      //         if (pos > -1) {
      //           this.activeNames.splice(pos, 1);
      //         }
      //       } else {
      //         this.activeNames.push(v.index);
      //       }
      //       v.checkedIsShow = !v.checkedIsShow;
      //     }
      //     return v;
      //   });
      // } else {
      //   item.checkedIsShow = !item.checkedIsShow;
      // }
      //whetherShow,0,false
      //这个值变化慢，

      var whetherShow;
      if (item.whetherShow == true) {
        whetherShow = "2";
      } else {
        whetherShow = "1";
      }
      axios({
        method: "post",
        url:
          "/organization/pensionOrgEvaluate/whetherShow?id=" +
          item.id +
          "&whetherShow=" +
          whetherShow,
      }).then((res) => {});
    },
    getList() {
      //type=1&orgId=1, type=1,报错管理  ，2評價管理
      //infoFeedback/list?type=1&orgId=1
      axios({
        method: "get",
        url:
          "/organization/pensionOrgEvaluate/list?pageNumber=" +
          this.listQuery.pageNumber +
          "&pageSize=" +
          this.listQuery.pageSize,
      }).then((res) => {
        var data = res.data.body.records;
        if (data.length == 0) {
          this.$toast("没有更多了");
          this.mescroll.endErr();
          return;
        }

        data.map((v, k) => {
          v.index = k + 1;
          v.checkedIsShow = false;

          if (v.phoneNum) {
            if (v.phoneNum.length == 11) {
              v.phoneNum = v.phoneNum.replace(
                /(\d{3})\d{4}(\d{4})/,
                "$1****$2"
              );
            }
          }

          //1  展示，2  不展示
          if (v.whetherShow == "2") {
            v.whetherShow = false;
          } else {
            v.whetherShow = true;
          }
          //activeNames.indexOf(item.index)==-1)?false:true
          // v.checkedIsShow = activeNames.indexOf(v.index)==-1?false:true
          v.evaluateStar = parseInt(v.evaluateStar);

          if (v.whetherRead == "2") {
            axios({
              method: "post",
              url: "/organization/pensionOrgEvaluate/setRead?id=" + v.id,
            }).then((res) => {});
          }
          this.evaluationList.push(v);
          return v;
        });
        console.log(this.evaluationList);
        this.listQuery.pageNumber++;
        this.mescroll.endSuccess();
      });
    },

    // leftArrow() {
    //   if (this.listQuery.pageNumber - 1 > 0) {
    //     this.listQuery.pageNumber = this.listQuery.pageNumber - 1;
    //     this.getList();
    //   }
    // },
    // rightArrow() {
    //   // if (this.listQuery.pageNumber + 1 > 0) {
    //   this.listQuery.pageNumber = this.listQuery.pageNumber + 1;
    //   this.getList();
    //   // }
    // },
    // paginationSelect() {
    //   this.getList();
    // },
    // gotoPage() {
    //   this.getList();
    // },

    // handleSizeChange(val) {
    //   this.listQuery.pageSize = val;
    //   this.getList();
    // },
    // // 当前页变化
    // handleCurrentChange(val) {
    //   this.listQuery.pageNumber = val;
    //   this.getList();
    // },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  /* margin: 0;
  padding: 0; */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.mescroll {
  margin-top: 44px;
  position: fixed;
  top: 44px;
  bottom: 0;
  height: auto; /*如设置bottom:50px,则需height:auto才能生效*/
}
</style>
