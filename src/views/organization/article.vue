<template>
  <div class="container">
    <h1 style="text-align:center">{{title}}</h1>
    <div class="audioDiv">
      <audio :src="audio" controls></audio>
    </div>

    <div v-html="content" class="padding-base"></div>
  </div>
</template>

<script>
import axios from "@/router/axios";
export default {
  name: "",
  data() {
    return {
      content: "",
      title: "",
      audio: {},
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios({
        method: "get",
        url:
          "/organization/organizationDynamics/selectSyncById/" +
          this.$route.query.id,
      }).then((res) => {
        let data = res.data.body;
        this.content = data.content;
        this.title = data.title;
        this.introductionToPhonetics = data.introductionToPhonetics;

        axios({
          method: "post",
          url: "/organization/fileOperation/getObjectByIds",
          data: [this.introductionToPhonetics],
        }).then((res) => {
          if (res.data.resultFlag == "success") {
            this.audio = res.data.body[0].internetUrl;
          }
        });
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.audioDiv {

  margin: 20px;

}
.audioDiv audio{
  width: 100%;
}
</style>
