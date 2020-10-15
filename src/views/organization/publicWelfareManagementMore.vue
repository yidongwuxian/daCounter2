<template>
	<div class="container">
		<div class="published_box">
			<div id="mescroll" class="mescroll">
				<div>
					<van-list v-model="loading2" :finished="finished2">
						<van-card
							:thumb="item.url"
							v-for="item in publishedList"
							:key="item.id"
							@click="gotoArticle(item.id)"
						>
							<template #title>
								<div class="font32">{{item.title}}</div>
							</template>
							<template #desc>
								<div class="font28 fontC455a646 mT10" v-if="item.contentValidity">{{item.contentValidity}}</div>
							</template>
							<template #price>
								<div class="font28 fontC455a646 mT10" v-if="item.updateTime">{{item.updateTime.slice(0,10)}}</div>
							</template>
							<!-- <template #num>
						<span>{{item.readCount}}人已读</span>
							</template>-->
						</van-card>
					</van-list>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "@/router/axios";
export default {
  name: "",
  data() {
    return {
      draftList: [],
      publishedList: [],
      loading1: false,
      finished1: false,
      // refreshing1: false,
      //已发布
      loading2: false,
      finished2: false,
      // refreshing2: false
      listQuery: {
        pageNumber: 1,
        pageSize: 10
      },
      mescroll: ""
    };
  },
  mounted() {
    this.getData();
    setTimeout(() => {
      this.mescroll = new MeScroll("mescroll", {
        up: {
          auto: false, //是否在初始化时以上拉加载的方式自动加载第一页数据; 默认false
          isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
          callback: this.upCallback //上拉加载的回调
        }
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
        url:
          "/organization/organizationDynamics/syncList?modularType=2&pageSize=" +
          //   (Math.pow(2, 24) - 1),
          this.listQuery.pageSize +
          "&pageNumber=" +
          this.listQuery.pageNumber,

        data: this.form
      }).then(res => {
        let data = res.data.body.records;

        if (data.length == 0) {
          this.$toast("没有更多了");
          this.mescroll.endErr();
          return;
        }

        // this.draftList = [];
        // this.publishedList = [];

        data.map(v => {
          if (v.pictureAccessory) {
            v.url = v.pictureAccessory.internetUrl;
          } else {
            v.url = "";
          }

          if (v.type == "0") {
            this.draftList.push(v);
          } else if (v.type == "1") {
            this.publishedList.push(v);
          }
        });
        this.loading1 = false;
        this.loading2 = false;
        this.finished1 = true;
        this.finished2 = true;

        this.listQuery.pageNumber++;
        this.mescroll.endSuccess();
      });
    },
    gotoArticle(id) {
      this.$router.push({
        path: "/article",
        query: {
          id: id
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  background: #f2f2f2;
}

.draft_box {
  background: white;
}

.draft_box__title {
  height: 60px;
  line-height: 60px;
}

.draft_box__title__left {
  font-weight: bold;
  padding: 10px;
  height: 70px;
  line-height: 70px;
  font-size: 30px;
}

.draft_box__title__right {
  /* font-size: 14px; */
  color: #989898;
}

.published_box {
  background: white;
  /* margin: 10px; */
  margin-top: 30px;
}

.item {
  display: flex;
  padding: 10px;
}

.item__right {
  margin: 20px 20px;
  height: 70px;
}

.item__title {
  font-weight: bold;
  font-size: 36px;
}

.item__time {
  color: #acacac;
  font-size: 20px;
}

.item__deit {
  color: #fc946e;
  font-size: 24px;
  vertical-align: top;
}

.item__delete {
  color: #118ee9;
  font-size: 24px;
  vertical-align: top;
}

.mescroll {
  margin-top: 30px;
  position: fixed;
  top: 44px;
  bottom: 0;
  height: auto; /*如设置bottom:50px,则需height:auto才能生效*/
}

</style>
