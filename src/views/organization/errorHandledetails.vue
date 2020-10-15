<template>
	<div class="container">
		<div class="padding-base">
			{{info.textMessage}}
			<van-divider />
			<div class="font28 pB20">相关截图</div>
			<div>
				<span v-for="(item,i) in info.screenshotUrlList" :key="i" class="mR10">
					<van-image width="100" height="100" class="mR10" :src="item.internetUrl" />
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "@/router/axios";
	import {
		infoFeedbackSelectById
	} from '@/api/organization'
	export default {
		name: "",
		data() {
			return {
				info: {},
			};
		},
		mounted() {
			this.urlArr = this.$route.query.url;
			if (this.urlArr) {
				this.urlArr = this.urlArr.split(",");
			}


			this.getData();
			this.read()
		},
		methods: {

			read() {
			//measuringPoint/selectMeasuringPointByObjectIdAndLocalType/1
			axios({
				method: "post",
				url: "/organization/infoFeedback/updateRead?id=" + this.$route.query.id,
			}).then((res) => {
				// this.getData();
			});
			},

			getData() {
				infoFeedbackSelectById(this.$route.query.id).then(response=>{
					if(response.data.resultFlag=="success"){
						this.info=response.data.body
					}
				})
			},
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.audioDiv {
		margin: 20px;
	}

	.audioDiv audio {
		width: 100%;
	}
</style>
