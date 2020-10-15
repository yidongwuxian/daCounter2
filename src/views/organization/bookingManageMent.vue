<template>
  <div class="container">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in list" :key="item">
          <div>
            张女士 15900889966
            <span>
              <button v-if="btnStatus==1" class="btnStatus color1">确认</button>
              <button v-if="btnStatus==2" class="btnStatus color2">已确认</button>
              <button v-if="btnStatus==3" class="btnStatus color3">已过期</button>
            </span>
          </div>
          <div>预约时间：2020年8月2日</div>
          <div>备注说明：希望有单独的护工看护</div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      btnStatus: 1 //1确认，2已确认，3已过期
    };
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;

        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btnStatus {
  float: right;
  color: white;
  width: 100px;
  border: none;
  border-radius: 10px;
}
.color1 {
  background: #00cc99;
}
.color2 {
  background: #FFBE9D;
}
.color3 {
  background: #BEBEBE;
}
</style>
