<template>
  <div class="container">
    <div class="font32 fontC666666">
      <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh"> -->

      <div id="mescroll" class="mescroll">
        <div>
          <van-list v-model="loading" :finished="finished">
            <van-cell v-for="(item,i) in list" :key="i" @click="goDetails(item)">
              <van-row type="flex" justify="space-between" class>
                <van-col>
                  <div class="mT10 font32 fontC000000">用户：{{item.phoneNum}}</div>
                </van-col>
                <van-col>
                  <van-button
                    type="default"
                    size="small"
                    native-type="button"
                    :class="['tip']"
                    @click="read(item.id)"
                    v-if="item.whetherRead=='2'"
                  >未读</van-button>
                  <van-button
                    type="default"
                    size="small"
                    native-type="button"
                    :class="['tip']"
                    v-if="item.whetherRead=='1'"
                  >已读</van-button>
                </van-col>
              </van-row>
              <div class="mT10">{{item.textMessage}}</div>
              <div class="mT10 fontC455a646">{{item.createTime}}</div>
            </van-cell>
          </van-list>
        </div>
      </div>

      <!-- </van-pull-refresh> -->
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import axios from "@/router/axios";
export default {
  name: "",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      // refreshing: false
      //whetherRead 1已读，2未读
      mescroll: "",
      listQuery: {
        pageNumber: 1,
        pageSize: 10,
      },
    };
  },
  mounted() {
    this.getData();

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

      this.getData();
    },

    getData() {
      //type=1&orgId=1, type=1,报错管理  ，2評價管理
      axios({
        method: "get",
        url:
          // "/organization/infoFeedback/list?type=1&orgId=1&pageNumber=" +
          "/organization/infoFeedback/list?type=1&pageNumber=" +
          this.listQuery.pageNumber +
          "&pageSize=" +
          this.listQuery.pageSize,
      }).then((res) => {
        this.loading = false;
        this.finished = true;
        // this.list = res.data.body.records;

        var data = res.data.body.records;
        if (data.length == 0) {
          this.$toast("没有更多了");
          this.mescroll.endErr();
          return;
        }

        data.map((v) => {
          if (v.phoneNum) {
            if (v.phoneNum.length == 11) {
              v.phoneNum = v.phoneNum.replace(
                /(\d{3})\d{4}(\d{4})/,
                "$1****$2"
              );
            }
          }
          this.list.push(v);
          return v;
        });

        this.listQuery.pageNumber++;
        this.mescroll.endSuccess();
      });
    },
    read(id) {
      //measuringPoint/selectMeasuringPointByObjectIdAndLocalType/1
      axios({
        method: "post",
        url: "/organization/infoFeedback/updateRead?id=" + id,
      }).then((res) => {
        this.getData();
      });
    },

    // onLoad() {
    //   setTimeout(() => {
    //     if (this.refreshing) {
    //       this.list = [];
    //       this.refreshing = false;
    //     }

    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1);
    //     }
    //     this.loading = false;

    //     if (this.list.length >= 40) {
    //       this.finished = true;
    //     }
    //   }, 1000);
    // },
    // onRefresh() {
    //   // 清空列表数据
    //   this.finished = false;

    //   // 重新加载数据
    //   // 将 loading 设置为 true，表示处于加载状态
    //   this.loading = true;
    //   this.onLoad();
    // }
    goDetails(item) {
      this.$router.push({
        path: "/errorHandledetails",
        query: {
          id: item.id,
        },
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mescroll {
  margin-top: 30px;
  position: fixed;
  top: 44px;
  bottom: 0;
  height: auto; /*如设置bottom:50px,则需height:auto才能生效*/
}
</style>
