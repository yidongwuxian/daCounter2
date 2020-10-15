<template>
  <div class="container">
    <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh"> -->

    <div id="mescroll" class="mescroll">
      <div>
        <van-list v-model="loading" :finished="finished">
          <van-cell v-for="(item,i) in list" :key="i">
            <div>{{item.operationTime}} &nbsp;&nbsp;{{item.phoneNumber}}</div>
            <div>{{item.content}}</div>
          </van-cell>
        </van-list>
      </div>
    </div>
    <!-- </van-pull-refresh> -->
  </div>
</template>

<script>
// import axios from "axios";
import axios from "@/router/axios";
export default {
  name: "login",
  data() {
    return {
      list: [
        // {
        //   content:"修改机构信息",
        //   operationTime:"2020-07-22 14:02:52",
        //   phoneNumber:"18222458559"
        // }
      ],
      loading: false,
      finished: false,
      // refreshing: false,

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
      axios({
        method: "get",
        url: "/organization/operationRecord/list?pageNumber=" +
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
          this.list.push(v);
        });
        this.listQuery.pageNumber++;
        this.mescroll.endSuccess();
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btnStatus {
  float: right;
  /* color: white; */
  width: 60px;
  border: none;
  border-radius: 10px;
  font-size: 14px;
}
.color1 {
  background: #fff2e8;
  color: #ff9900;
}
.color2 {
  background: #ffbe9d;
}
.color3 {
  background: #bebebe;
}

.mescroll {
  margin-top: 30px;
  position: fixed;
  top: 44px;
  bottom: 0;
  height: auto; /*如设置bottom:50px,则需height:auto才能生效*/
}

</style>
