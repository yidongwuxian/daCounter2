<template>
	<div class="container">
		<div class="draft_box">
			<van-row type="flex" justify="space-between" class="pT20 pR16 pB20 pL16 font24">
				<van-col>
					<span class="draft_box__title__left" v-if="draftList.length">草稿箱 ({{draftList.length}})</span>
					<span class="draft_box__title__left" v-else>草稿箱 (x)</span>
					<span class="draft_box__title__right">已保存，未发布</span>
				</van-col>
			</van-row>
			<!-- <div class="draft_box__title">
        <span class="draft_box__title__left" v-if="draftList.length">草稿箱 ({{draftList.length}})</span>
        <span class="draft_box__title__left" v-else>草稿箱 (x)</span>
        <span class="draft_box__title__right">已保存，未发布</span>
      </div> -->
			<!-- <van-pull-refresh v-model="refreshing1" @refresh="onRefresh1"> -->
			<van-list v-model="loading1" :finished="finished1">
				<!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
				<!-- <div class="item" v-for="item in draftList" :key="item.id">
					<div style="height:70px;width:100px;margin:5px">
						<img :src="item.img" style="height:70px;width:100px;margin:5px" alt />
					</div>
					<div class="item__right">
						<div class="item__title">{{item.title}}</div>
						<div class="item__time">{{item.time}}</div>
						<div>
							<span @click="editItem(item.id)">
								<van-icon name="edit" />
								<span class="item__deit">编辑</span>
							</span>
							<span @click="deleteItem(item.id)" style="margin-left:30px">
								<van-icon name="delete" />
								<span class="item__delete">删除</span>
							</span>
						</div>
					</div>
				</div> -->
				<van-card :thumb="item.url" v-for="item in draftList" :key="item.id">
					<template #title>
						<div class="font32">{{item.title}}</div>
					</template>
					<template #desc>
						<div class="font28 fontC455a646 mT10" v-if="item.updateTime">{{item.updateTime.slice(0,10)}}</div>
					</template>
					<template #price>
						<van-button icon="edit" type="default" class="text fontCe10808" @click="editItem(item.id)">编辑</van-button>
						<van-button icon="delete" type="default" class="text fontC098AE8 mL20" @click="deleteItem(item.id)">删除</van-button>
					</template>
				</van-card>
			</van-list>
			<!-- </van-pull-refresh> -->
		</div>

		<div class="published_box">
			<van-row type="flex" justify="space-between" class="pT20 pR16 pB20 pL16 font24">
				<van-col>
					<span class="draft_box__title__left" v-if="publishedList.length">已发布 ({{publishedList.length}})</span>
					<span class="draft_box__title__left" v-else>已发布 (0)</span>
				</van-col>
			</van-row>
			<!-- <div class="draft_box__title">
        <span
          class="draft_box__title__left"
          v-if="publishedList.length"
        >已发布 ({{publishedList.length}})</span>
        <span class="draft_box__title__left" v-else>已发布 (0)</span>
      </div> -->
			<!-- <van-pull-refresh v-model="refreshing2" @refresh="onRefresh2"> -->
			<van-list v-model="loading2" :finished="finished2">
				<!-- <div class="item" v-for="item in publishedList" :key="item.id">
					<div style="height:70px;width:100px;margin:5px">
						<img :src="item.url" style="height:70px;width:100px;margin:5px" alt />
					</div>
					<div class="item__right">
						<div class="item__title">{{item.title}}</div>
						<div class="item__time">{{item.time}}</div>
						<div>
							<span @click="editItem(item.id)">
								<van-icon name="edit" />
								<span class="item__deit">编辑</span>
							</span>
							<span @click="deleteItem(item.id)" style="margin-left:30px">
								<van-icon name="delete" />
								<span class="item__delete">删除</span>
							</span>
						</div>
					</div>
				</div> -->
				<van-card :thumb="item.url" v-for="item in publishedList" :key="item.id">
					<template #title>
						<div class="font32">{{item.title}}</div>
					</template>
					<template #desc>
						<div class="font28 fontC455a646 mT10" v-if="item.updateTime">{{item.updateTime.slice(0,10)}}</div>
					</template>
					<template #price>
						<van-button icon="edit" type="default" class="text fontCe10808" @click="editItem(item.id)">编辑</van-button>
						<van-button icon="delete" type="default" class="text fontC098AE8 mL20" @click="deleteItem(item.id)">删除</van-button>
					</template>
				</van-card>
			</van-list>
			<!-- </van-pull-refresh> -->
		</div>

		<div style="margin-top:10px">
			<van-button type="primary" size="large" @click="goto" class="van-button--default.basics">新增公益动态</van-button>
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
				//草稿箱
				loading1: false,
				finished1: false,
				// refreshing1: false,
				//已发布
				loading2: false,
				finished2: false,
				// refreshing2: false
			};
		},
		mounted() {
			this.getData();
		},
		methods: {
			getData() {
				axios({
					method: "get",
					url: "/organization/organizationDynamics/list?modularType=2&pageSize="+(Math.pow(2, 24)-1),
					data: this.form
				}).then(res => {
					let data = res.data.body.records;

					this.draftList = [];
					this.publishedList = [];
					data.map(v => {
						// v.url = v.pictureAccessory.internetUrl;
						if (v.pictureAccessory) {
							v.url = v.pictureAccessory.internetUrl;
						}
						// if (v.modular_type == "2") {
						if (v.type == "0") {
							this.draftList.push(v);
						} else if (v.type == "1") {
							this.publishedList.push(v);
						}
						// }
					});
					this.loading1 = false;
					this.loading2 = false;
					this.finished1 = true;
					this.finished2 = true;

				});
			},
			// onRefresh1() {
			//   // 清空列表数据
			//   this.finished1 = false;
			//   // 重新加载数据
			//   // 将 loading 设置为 true，表示处于加载状态
			//   this.loading1 = true;
			//   this.onLoad1();
			// },
			// onRefresh2() {
			//   // 清空列表数据
			//   this.finished2 = false;
			//   // 重新加载数据
			//   // 将 loading 设置为 true，表示处于加载状态
			//   this.loading2 = true;
			//   this.onLoad2();
			// },

			// onLoad1() {
			//   if (this.refreshing1) {
			//     this.draftList = [];
			//     this.refreshing1 = false;
			//   }

			//   this.loading1 = false;
			//   this.getData();
			// },
			// onLoad2() {
			//   if (this.refreshing2) {
			//     this.publishedList = [];
			//     this.refreshing2 = false;
			//   }

			//   this.loading2 = false;
			//   this.getData();
			// },
			goto() {
				this.$router.push({
					path: "/publicWelfareManagementAdd"
				});
			},
			editItem(id) {
				this.$router.push({
					path: "/publicWelfareManagementAdd",
					query: {
						id: id
					}
				});
			},
			deleteItem(id) {
				axios({
					method: "post",
					url: "/organization/organizationDynamics/delete/" + id
				}).then(res => {
					this.getData();
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
</style>
