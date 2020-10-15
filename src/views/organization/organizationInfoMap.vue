<template>
	<div class="container">
		<div id="allmap"></div>
		<van-search v-model="form.query" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" >
			<template #action>
			    <div @click="onSearch">搜索</div>
			  </template>
		</van-search>
		<div ref="list" style="overflow: scroll;">
			<van-list v-model="loading" :finished="finished" finished-text="没有更多了">
				<van-cell v-for="item in list" :key="item.uid" :title="item.name" @click="amapDetail(item.uid)" />
			</van-list>
		</div>

		<van-button block class="fontCe10808" @click="getPoint()">确定</van-button>
	</div>
</template>

<script>
	import bus from "../../utils/bus.js";
	import BMap from "BMap";
	import {
		amapSuggestion,
		amapDetail,
		amapReverse_geocoding,
	} from "@/api/common";
	export default {
		name: "abcde",
		data() {
			return {
				map: "",
				marker: "",
				geoc: "",
				form: {
					query: "",
					location: "",
				},
				list: [],
				loading: false,
				finished: true,
			};
		},
		created() {},
		mounted() {
			// console.log(this.$refs.list)
			this.$refs.list.style.height =
				document.body.clientHeight - 41 - 300 - 54 - 43 + "px";
			this.mapInit();
		},
		methods: {
			mapInit() {
				let self = this;
				self.map = new BMap.Map("allmap", { enableMapClick: false });
				self.map.centerAndZoom(new BMap.Point(116.404, 39.915), 12);
				self.marker = new BMap.Marker(new BMap.Point(116.404, 39.915)); // 创建标注
				self.map.addOverlay(self.marker); // 将标注添加到地图中
				self.geoc = new BMap.Geocoder();
				console.log(self.map.getCenter());
				//单击获取点击的经纬度
				self.map.addEventListener("click", function(e) {
					self.marker.setPosition(new BMap.Point(e.point.lng, e.point.lat));
					self.map.centerAndZoom(new BMap.Point(e.point.lng, e.point.lat), 12);
					self.form.location =
						self.map.getCenter().lat + "," + self.map.getCenter().lng;
				});
				self.map.addEventListener("moveend", function(e) {
					self.form.location =
						self.map.getCenter().lat + "," + self.map.getCenter().lng;
					self.marker.setPosition(self.map.getCenter());
					self.geoc.getLocation(self.map.getCenter(), function(rs) {
						self.form.query = rs.address;
						self.onSearch();
					});
				});
			},
			onSearch(val) {
				this.list = [];
				if (this.form.query) {
					amapSuggestion(this.form).then((res) => {
						this.list = res.data.result;
					});
				}
			},
			onCancel() {},
			amapDetail(uid) {
				amapDetail({
					uid: uid
				}).then((res) => {
					this.form.query = res.data.result.name;
					this.marker.setPosition(
						new BMap.Point(
							res.data.result.location.lng,
							res.data.result.location.lat
						)
					);
					this.map.centerAndZoom(
						new BMap.Point(
							res.data.result.location.lng,
							res.data.result.location.lat
						),
						12
					);
					this.onSearch();
				});
			},
			getPoint() {

      			bus.$emit('headerShowOpen');

				this.$emit("getPoint", {
					lng: this.map.getCenter().lng,
					lat: this.map.getCenter().lat,
				});	
			},
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.container {
		background: #f4f4f4;
	}

	.panel__top {}

	.panel__top__title {
		height: 80px;
		line-height: 80px;
		color: #ff9900;
		border-bottom: 1px solid #e4e4e4;
		background: white;
		padding-left: 20px;
	}

	#allmap {
		width: 100%;
		height: 600px;
		overflow: hidden;
		margin: 0;
		font-family: "微软雅黑";
	}

	.panel__bottom {
		padding: 16px;
		display: flex;
		justify-content: space-between;
		background: white;
	}

	.submit {
		/* width: 30%; */
	}
</style>
