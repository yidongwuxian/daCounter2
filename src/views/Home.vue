<template>
	<div class="container">
		<div class="panel__first pR16 pL16">

			<van-row type="flex" justify="space-between" class="font28">
				<van-col>
					<van-row type="flex" justify="space-between" align="center" class="font28">
						<van-col>
							<!-- <van-image round width="1.5rem" height="1.5rem" style="display: block;" src="https://img.yzcdn.cn/vant/cat.jpeg" /> -->
							<van-image round width="1.5rem" height="1.5rem" style="display: block;" :src="userphoto" />
						</van-col>
						<van-col>
							<span class="mL10 font32 fontbold fontCffffff">{{username}}，你好</span>
						</van-col>
					</van-row>
				</van-col>
				<van-col>
					<van-icon name=" iconfont icon-guanji" class="font38 fontCffff80" @click="fedLogOut()" />
				</van-col>
			</van-row>
		</div>
		<div class="panel__second">
			<!--  -->
			<van-grid :border="false" :column-num="4">

				<van-grid-item class="fontC455a646" v-for="(item,i) in iconList" :key="i" @click="gotoGoal(item.goal)" :icon="item.icon" :text="item.text"
				 :badge="item.num" :dot="item.dot">

					<!-- <div style="position:relative">
            <span class="ponit" v-if="item.ponintType=='point'"></span>
            <span class="ponitNum" v-if="item.ponintType=='num'">{{item.num}}</span>
            <van-image :src="item.icon" class="point_img" />
          </div> -->
					<!-- <i class="iconfont icon-renzheng"></i>
          <span style="margin-top:5px;font-size:12px;color: #5e5e5e;">{{item.text}}</span> -->
				</van-grid-item>
			</van-grid>
		</div>
		<div class="panel__third font28">
			<van-row type="flex" justify="space-between" class="pT20 pR16 pB20 pL16 font24">
				<van-col>
					<div class="font28 fontbold">机构数据</div>
				</van-col>
				<van-col><span>更新至{{lastDay}}</span></van-col>
			</van-row>
			<!-- <div class="panel__third__top">
				机构数据
				<span>更新至{{lastDay}}</span>
			</div> -->

			<van-grid :border="false" :column-num="3">
				<van-grid-item>
					<div>{{organizationData.numberOfVisitors}}</div>
					<div class="mT10 van-grid-item__text">访问人数</div>
				</van-grid-item>

				<van-grid-item>
					<div>{{organizationData.pageVisits}}</div>
					<div class="mT10 van-grid-item__text">页面访问量</div>
				</van-grid-item>

				<van-grid-item>
					<div>{{organizationData.amountOfInformation}}</div>
					<div class="mT10 van-grid-item__text">咨询数量</div>
				</van-grid-item>

				<van-grid-item>
					<div>{{organizationData.bookingVolume}}</div>
					<div class="mT10 van-grid-item__text">预约量</div>
				</van-grid-item>

				<van-grid-item>
					<div>{{organizationData.collection}}</div>
					<div class="mT10 van-grid-item__text">收藏量</div>
				</van-grid-item>

				<van-grid-item>
					<div>{{organizationData.subscription}}</div>
					<div class="mT10 van-grid-item__text">订阅量</div>
				</van-grid-item>

				<!-- <van-grid-item></van-grid-item> -->
			</van-grid>
		</div>
		<div class="panel__fourth">
			<van-row type="flex" justify="space-between" class="pT20 pR16 pB20 pL16 font24">
				<van-col>
					<div class="font28 fontbold">机构动态</div>
				</van-col>
				<van-col><span @click="gotoGoal('/organizationTrendsMore')">更多<i class="iconfont icon-gengduo3 font20"></i></span></van-col>
			</van-row>
			<!-- <div class="panel__fourth__top">
				&nbsp;&nbsp;机构动态
				<span @click="gotoGoal('/organizationTrends')">更多>></span>
			</div> -->
			<div class="panel__fourth__bottom">
				<van-card :thumb="item.pictureAccessory.internetUrl" v-for="(item,i) in organizationDynamics" :key="i" @click="gotoArticle(item.id)">
					<template #title>
						<div class="font32">{{item.title}}</div>
					</template>
					<template #desc>
						<div v-html="item.contentValidity" class="font28 mT10" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"></div>
					</template>
					<template #price>
						<span v-if="item.updateTime">{{item.updateTime}}</span>
					</template>
					<!-- <template #num>
						<span>{{item.readCount}}人已读</span>
					</template> -->
				</van-card>
				<!-- <div class="panel__fourth__item" @click="gotoArticle(item.id)" v-for="(item,i) in organizationDynamics" :key="i">
					<div class="fourth__img">
						<img class="fourth__img" v-if="item.pictureAccessory" :src="item.pictureAccessory.internetUrl" alt />
						<img class="fourth__img" :src="item.pictureAccessory.internetUrl" alt />
					</div>
					<div class="fourth__right">
						<div class="fourth__title" style>{{item.title}}</div>
						<div class="fourth__content" v-html="item.content"></div>
						<div style="font-size:20px;color:#CCCCD6">
							<span v-if="item.updateTime">{{item.updateTime}}</span>
							&nbsp; &nbsp;
							<span>{{item.readCount}}人已读</span>
						</div>
					</div>
				</div> -->
			</div>
		</div>
		<div class="panel__fourth">
			<van-row type="flex" justify="space-between" class="pT20 pR16 pB20 pL16 font24">
				<van-col>
					<div class="font28 fontbold">公益服务</div>
				</van-col>
				<van-col><span @click="gotoGoal('/publicWelfareManagementMore')">更多<i class="iconfont icon-gengduo3 font20"></i></span></van-col>
			</van-row>
			<!-- <div class="panel__fourth__top">
				&nbsp;&nbsp;公益服务
				<span @click="gotoGoal('/publicWelfareManagement')">更多>></span>
			</div> -->
			<van-card :thumb="item.pictureAccessory.internetUrl" v-for="(item,i) in organizationDynamics2" :key="i" @click="gotoArticle(item.id)">
				<template #title>
					<div class="font32">{{item.title}}</div>
				</template>
				<template #desc>
					<div v-html="item.contentValidity" class="font28 mT10" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"></div>
				</template>
				<template #price>
					<span v-if="item.updateTime">{{item.updateTime}}</span>
				</template>
				<!-- <template #num>
					<span>{{item.readCount}}人已读</span>
				</template> -->
			</van-card>
			<!-- <div class="panel__fourth__bottom">
				<div class="panel__fourth__item" @click="gotoArticle(item.id)" v-for="(item,i) in organizationDynamics2" :key="i">
					<div class="fourth__img">
						<img class="fourth__img" v-if="item.pictureAccessory" :src="item.pictureAccessory.internetUrl" alt />

						<img class="fourth__img" :src="item.pictureAccessory.internetUrl" alt />
					</div>
					<div class="fourth__right">
						<div class="fourth__title" style>{{item.title}}</div>
						<div class="fourth__content" v-html="item.content"></div>
						<div style="font-size:20px;color:#CCCCD6">
							<span v-if="item.updateTime">{{item.updateTime}}</span>
							&nbsp; &nbsp;
							<span>{{item.readCount}}人已读</span>
						</div>
					</div>
				</div>
			</div> -->
		</div>

		<!-- <div class="panel__fifth"></div> -->
		<van-dialog v-model="show" show-cancel-button @confirm="confirm()">
			<van-row type="flex" justify="center" class="mT50 mB20 font28 fontbold">
				即将退出养老通管理后台
			</van-row>
			<van-row type="flex" justify="center" class="mT10 mB40 font24">
				是否继续退出登录？
			</van-row>
		</van-dialog>
	</div>
</template>

<script>
	import axios from "@/router/axios";
	import {
		fomate
	} from "../utils/util";
	export default {
		name: "home",
		data() {
			return {

				show: false,
				iconList: [
					// {
					// 	icon: " iconfont icon-renzheng",
					// 	// icon: require("../assets/organization/u1.png"),
					// 	text: "机构认证",
					// 	goal: "/organizationAuthentication"
					// },
					{
						icon: " iconfont icon-shijijihua-jichuyanjiujigongyijihua",
						// icon: require("@assets/organization/u2.png"),
						text: "机构信息",
						goal: "/organizationInfo"
					},
					{
						icon: " iconfont icon-qrqcode",
						// icon: require("@assets/organization/u3.png"),
						text: "机构推广",
						goal: "/organizationExtension"
					},
					{
						icon: " iconfont icon-news",
						// icon: require("@assets/organization/u4.png"),
						text: "机构动态",
						goal: "/organizationTrends"
					},
					{
						icon: " iconfont icon-evaluate",
						// icon: require("@assets/organization/u5.png"),
						text: "评价管理",
						goal: "/evaluationManagement",
						ponintType: "point"
					},
					{
						icon: " iconfont icon-shitibaocuo",
						// icon: require("@assets/organization/u6.png"),
						text: "报错处理",
						goal: "/errorHandle",
						ponintType: "num",
						num: 0
					},
					// {
					// 	icon: " iconfont icon-yuyue",
					// 	// icon: require("@assets/organization/u7.png"),
					// 	text: "预约管理",
					// 	goal: "/bookingManageMent",
					// 	ponintType: "point"
					// },
					{
						icon: " iconfont icon-gongyihuodonggongyihuodong",
						// icon: require("@assets/organization/u8.png"),
						text: "公益管理",
						goal: "/publicWelfareManagement"
					},
					{
						icon: " iconfont icon-zhanghao",
						// icon: require("@assets/organization/u9.png"),
						text: "账号管理",
						goal: "/myAccount"
					},
					// {
					// 	icon: " iconfont icon-tongzhi",
					// 	// icon: require("@assets/organization/u10.png"),
					// 	text: "平台通知",
					// 	goal: "/platformNotification",
					// 	ponintType: "num",
					// 	num: "3"
					// },
					{
						icon: " iconfont icon-cz-jl",
						// icon: require("@assets/organization/u11.png"),
						text: "操作纪录",
						goal: "/operationRecord"
					},
					// {
					// 	icon: " iconfont icon-weixin",
					// 	text: "客服配置",
					// 	goal: "/configurationOfTheService"
					// }
				],
				organizationData: {
					numberOfVisitors: 0,
					pageVisits: 0,
					amountOfInformation: 0,
					bookingVolume: 0,
					collection: 0,
					subscription: 0
				},
				organizationDynamics: [],
				organizationDynamics2: [],
				infoFeedback: 0, //报错处理
				pensionOrgEvaluate: 0, //评价管理
				lastDay: "",
				username: "",
				userphoto:"",
			};
		},
		mounted() {
			// axios({
			//   method: "post",
			//   // url: "/user/company/getCompanyList1/",
			//   url: "/api/login/sendSms",
			// }).then(res => {
			// });
			this.init();

			this.lastDay = new Date().getTime() - 24 * 3600 * 1000;
			this.lastDay = fomate('yyyy-mm-dd', new Date(this.lastDay))
		},
		methods: {
			init() {
				this.getOrganizationData();
				this.getOrganizationDynamics();
				this.getOrganizationDynamics2();
			},
			gotoArticle(id) {
				this.$router.push({
					path: "/article",
					query: {
						id: id
					}
				});
			},
			gotoGoal(path) {
				this.$router.push({
					path: path
					// query: { id: "1" }
				});
			},
			getOrganizationData() {
				// var id = 1;
				axios({
					method: "get",
					url: "/organization/organizationData/selectByOrgId"
				}).then(res => {
					if (res.data.resultFlag == "success") {
						this.organizationData = res.data.body;
					}
				});

				axios({
					method: "get",
					url: "/organization/organizationData/unreadCount"
				}).then(res => {
					if (res.data.resultFlag == "success") {
						// this.organizationData = res.data.body;
						var data = res.data.body;
						this.iconList = this.iconList.map(v => {
							if (v.text == "评价管理") {
								if (data.pensionOrgEvaluate == 0) {
									v.dot = false
								} else {
									v.dot = true
								}
							}
							if (v.text == "报错处理") {
								v.num = data.infoFeedback;
							}
							return v;
						});

					}
				});

				axios({
					method: "get",
					url: "/user/user/getUserInfo"
				}).then(res => {
					if (res.data.resultFlag == "success") {
						// this.organizationData = res.data.body;
						this.username = res.data.body.sysUser.username;
						this.userphoto = res.data.body.sysUser.accessoryUrl;
					}
				});


			},
			getOrganizationDynamics() {
				// var id = 1;
				axios({
					method: "get",
					url: "/organization/organizationDynamics/syncList?modularType=1"
					// data:{}
				}).then(res => {
					if (res.data.resultFlag == "success") {

						if (res.data.body.records.length > 3) {
							this.organizationDynamics = res.data.body.records.slice(0, 3);
						} else {
							this.organizationDynamics = res.data.body.records;
						}

						this.organizationDynamics = this.organizationDynamics.map(v => {
							if (v.updateTime) {
								v.updateTime = v.updateTime.slice(0,10);
								// v.updateTime = fomate("yyyy-mm-dd", new Date(v.updateTime));
							}
							if(v.pictureAccessory == null){
								v.pictureAccessory={};
								v.pictureAccessory.internetUrl=""
							}
							var regex = /<img.*?>/g;
							v.content = v.content.replace(regex, "")
							return v;
						});

					}
				});
			},

			getOrganizationDynamics2() {
				axios({
					method: "get",
					url: "/organization/organizationDynamics/syncList?modularType=2"
				}).then(res => {
					if (res.data.resultFlag == "success") {


						if (res.data.body.records.length > 3) {
							this.organizationDynamics2 = res.data.body.records.slice(0, 3);
						} else {
							this.organizationDynamics2 = res.data.body.records;
						}

						this.organizationDynamics2 = this.organizationDynamics2.map(v => {
							if (v.updateTime) {
								v.updateTime = v.updateTime.slice(0,10);
								// v.updateTime = fomate("yyyy-mm-dd", new Date(v.updateTime));
							}
							if(v.pictureAccessory == null){
								v.pictureAccessory={};
								v.pictureAccessory.internetUrl=""
							}
							var regex = /<img.*?>/g;
							v.content = v.content.replace(regex, "")
							return v;

						});

					}
				});
			},
			fedLogOut() {
				this.show = true
			},
			confirm() {
				this.$store.dispatch('FedLogOut').then((response) => {
					this.$router.push({
						path: '/login'
					})
				}).catch((err) => {})
			},
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.container {
		background: #f2f2f2;
		height: 100%;
		width: 100%;
	}

	.panel__first {
		height: 120px;
		line-height: 120px;
		background: #ff9900;

	}

	.panel__first>span {
		vertical-align: top;
		height: 120px;
		line-height: 120px;
		margin-left: 15px;
	}

	.first__photo {
		margin-top: 15px;
		width: 90px;
		height: 90px;
		border-radius: 50%;
	}

	/* background: url("../assets/back.png"); */

	/* @media screen and (max-width: 750px) {
		.panel__second {
			background: white;
		}

		.ponit {
			position: absolute;
			background: red;
			display: inline-block;
			top: 0px;
			right: 0px;
			width: 10px;
			height: 10px;
			z-index: 1;
			border-radius: 50%;
		}

		.ponitNum {
			position: absolute;
			background: red;
			display: inline-block;
			top: -5px;
			right: 0px;
			width: 15px;
			height: 15px;
			z-index: 1;
			border-radius: 50%;
			font-size: 10px;
			text-align: center;
			color: white;
		}
	}

	@media screen and (min-width: 750px) {
		.panel__second {
			background: white;
		}

		.ponit {
			position: absolute;
			background: red;
			display: inline-block;
			top: 0px;
			right: 0px;
			width: 10px;
			height: 10px;
			z-index: 1;
			border-radius: 50%;
		}

		.ponitNum {
			position: absolute;
			background: red;
			display: inline-block;
			top: -5px;
			right: 0px;
			width: 20px;
			height: 18px;
			padding-top: 2px;
			z-index: 1;
			border-radius: 50%;
			font-size: 10px;
			text-align: center;
			color: white;
		}
	} */

	.point_img {
		width: 80%;
		/* height: 40px; */
		/* width: 50px; */
	}



	.panel__third {
		margin-top: 10px;
		background: white;
		/* height: 420px; */
		color: #5e5e5e;
	}

	.panel__third__top {
		height: 80px;
		line-height: 80px;
		border-bottom: 1px solid#F2F2F2;
	}

	.panel__third__top span {
		float: right;
		font-size: 22px;
		margin-right: 10px;
	}

	.panel__fourth {
		margin-top: 10px;
		background: white;
		/* height: 300px; */
		color: #5e5e5e;
	}

	.panel__fourth__item {
		display: flex;
		overflow: hidden;
		margin-top: 20px;
	}

	.fourth__right {
		margin-left: 50px;
		margin-top: 15px;
	}

	.fourth__title {
		height: 40px;
		width: 550px;
		overflow: hidden;
		font-weight: bold;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	/* .panel__fourth img {
  margin: 20px;
  width: 120px;
  height: 120px;
} */

	.fourth__img {
		height: 90px;
		width: 100px;
		margin: 10px;
	}

	.fourth__content {
		height: 30px;
		width: 550px;
		overflow: hidden;
		font-size: 26px;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.panel__fourth__top {
		height: 80px;
		line-height: 80px;
		/* border-bottom: 1px solid#F2F2F2; */
	}

	.panel__fourth__top span {
		float: right;
		font-size: 22px;
		margin-right: 10px;
	}


	.container>>>.van-grid {
		background: white;
	}
</style>
