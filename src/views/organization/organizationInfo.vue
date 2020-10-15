<template>
  <div class="container">
    <div v-show="!mapShow">
      <div class="panel__top">
        <div class="panel__top__title">基础信息</div>
        <van-cell-group>
          <van-field
            readonly
            clickable
            input-align="right"
            name="datetimePicker"
            :value="form.foundingDate2"
            label="成立日期"
            placeholder="点击选择时间"
            @click="foundingDateShow = true"
          />
          <van-popup v-model="foundingDateShow" position="bottom">
            <van-datetime-picker
              :min-date="new Date('1940/01/01')"
              type="year-month"
              @confirm="foundingDateConfirm"
              @cancel="foundingDateShow = false"
            />
          </van-popup>
        </van-cell-group>
        <van-cell-group>
          <van-field
            readonly
            input-align="right"
            clickable
            name="picker"
            v-model="form.property"
            label="机构性质"
            placeholder="请输入"
            @click="propertyShow = true"
          />
          <van-popup v-model="propertyShow" position="bottom">
            <van-picker
              show-toolbar
              :columns="propertyColumns"
              @confirm="propertyConfirm"
              @cancel="propertyShow = false"
            />
          </van-popup>
        </van-cell-group>
        <van-cell-group>
          <van-field
            readonly
            input-align="right"
            clickable
            name="picker"
            v-model="form.type"
            label="机构类型"
            placeholder="请输入"
            @click="typeShow = true"
          />
          <van-popup v-model="typeShow" position="bottom">
            <van-picker
              show-toolbar
              :columns="typeColumns"
              @confirm="typeConfirm"
              @cancel="typeShow = false"
            />
          </van-popup>
        </van-cell-group>
        <van-cell-group>
          <van-field
            readonly
            input-align="right"
            clickable
            name="picker"
            v-model="form.payStyle"
            label="付款方式"
            placeholder="请输入"
            @click="payStyleShow = true"
          />
          <van-popup v-model="payStyleShow" position="bottom">
            <van-picker
              show-toolbar
              :columns="payStyleColumns"
              @confirm="payStyleConfirm"
              @cancel="payStyleShow = false"
            />
          </van-popup>
        </van-cell-group>
        <van-cell-group>
          <van-field
            v-model="form.feeMax"
            type="number"
            label="费用上限"
            placeholder="请输入"
            input-align="right"
          />
        </van-cell-group>
        <van-cell-group>
          <van-field
            v-model="form.feeMin"
            type="number"
            label="费用下限"
            placeholder="请输入"
            input-align="right"
            @blur="checkFeeMin"
          />
        </van-cell-group>
        <van-cell-group>
          <van-field
            v-model="form.nurseCnt"
            label="护理人员数量"
            type="digit"
            placeholder="请输入"
            input-align="right"
          />
        </van-cell-group>
        <!-- <van-cell-group>
        <van-field
          v-model="form.isMedicalInsurance"
          label="医保定点"
          placeholder="请输入"
          input-align="right"
        />
      </van-cell-group>

      <van-cell-group>
        <van-field
          v-model="form.medicalService"
          label="医疗服务方式"
          placeholder="请输入"
          input-align="right"
        />
        </van-cell-group>-->
        <van-cell-group>
          <van-field
            readonly
            input-align="right"
            clickable
            name="picker"
            v-model="form.isMedicalInsurance"
            label="医保定点"
            placeholder="请输入"
            @click="isMedicalInsuranceShow = true"
          />
          <van-popup v-model="isMedicalInsuranceShow" position="bottom">
            <van-picker
              show-toolbar
              :columns="isMedicalInsuranceColumns"
              @confirm="isMedicalInsuranceConfirm"
              @cancel="isMedicalInsuranceShow = false"
            />
          </van-popup>
        </van-cell-group>
        <van-cell-group>
          <van-field
            readonly
            input-align="right"
            clickable
            name="picker"
            v-model="form.medicalService"
            label="医疗服务方式"
            placeholder="请输入"
            @click="medicalServiceShow = true"
          />
          <van-popup v-model="medicalServiceShow" position="bottom">
            <van-picker
              show-toolbar
              :columns="medicalServiceColumns"
              @confirm="medicalServiceConfirm"
              @cancel="medicalServiceShow = false"
            />
          </van-popup>
        </van-cell-group>
        <van-cell-group>
          <van-field
            v-model="form.bedspace"
            label="总床位"
            type="digit"
            placeholder="请输入"
            input-align="right"
          />
        </van-cell-group>
        <van-cell-group>
          <van-field
            v-model="form.numberOfVacantBeds"
            label="空闲床位"
            type="digit"
            placeholder="请输入"
            input-align="right"
            @blur="checkNumberOfVacantBeds"
          />
        </van-cell-group>
        <van-cell-group>
          <van-field
            readonly
            input-align="right"
            clickable
            name="picker"
            v-model="form.buildingType"
            label="建筑类型"
            placeholder="请输入"
            @click="buildingTypeShow = true"
          />
          <van-popup v-model="buildingTypeShow" position="bottom">
            <van-picker
              show-toolbar
              :columns="buildingTypeColumns"
              @confirm="buildingTypeConfirm"
              @cancel="buildingTypeShow = false"
            />
          </van-popup>
        </van-cell-group>
        <van-cell-group>
          <van-field
            v-model="form.buildingArea"
            label="建筑面积m2"
            type="digit"
            placeholder="请输入"
            input-align="right"
          />
        </van-cell-group>
        <van-cell-group>
          <van-field
            v-model="form.floors"
            label="楼层数"
            type="digit"
            placeholder="请输入"
            input-align="right"
          />
        </van-cell-group>
        <van-cell-group>
          <van-field
            v-model="form.contactInformation"
            label="联系方式"
            placeholder="请输入"
            input-align="right"
          />
        </van-cell-group>
        <van-cell-group>
          <van-field v-model="form.url" label="机构网站链接" placeholder="请输入" input-align="right"/>
        </van-cell-group>
        <van-cell-group>
          <van-field
            v-model="form.facilitiesAndEquipment"
            label="设施设备"
            placeholder="请输入"
            input-align="right"
          />
        </van-cell-group>
        <van-cell-group>
          <van-field
            readonly
            input-align="right"
            clickable
            name="picker"
            v-model="form.detailedAddress"
            label="机构地址"
            placeholder="请输入"
            @click="addressShow = true"
          />
          <van-popup v-model="addressShow" position="bottom">
            <van-area
              title="选择地址"
              @confirm="addressConfirm"
              :area-list="areaList"
              :columns-placeholder="['请选择']"
              @cancel="addressShow = false;form.detailedAddress=''"
            />
          </van-popup>
        </van-cell-group>
        <van-cell-group>
          <van-field v-model="form.address" label="详细地址" placeholder="请输入" input-align="right"/>
        </van-cell-group>
        <van-cell-group>
          <van-field
            readonly
            input-align="right"
            clickable
            name="picker"
            v-model="form.longitude"
            label="经度"
            placeholder="请输入"
            @click="mapDialog"
          />
        </van-cell-group>
        <van-cell-group>
          <van-field
            readonly
            input-align="right"
            clickable
            name="picker"
            v-model="form.latitude"
            label="纬度"
            placeholder="请输入"
            @click="mapDialog"
          />
        </van-cell-group>
        <van-cell-group>
          <van-field
            v-model="form.intro"
            input-align="right"
            rows="2"
            autosize
            label="机构简介"
            type="textarea"
            placeholder="请输入"
          />
        </van-cell-group>
      </div>
      <div style="margin-top:10px;background:white">
        <div class="panel__top__title">机构照片</div>
        <div style="" class="padding-base font28">
          <span style="font-size:14px;margin:20px;">价格表</span>
          <span style="float:right;color:#919191">已上传{{ form.priceList2.length}}张</span>
        </div>
        <!--           :preview-full-image="false" -->
        <div style="padding:0 10px">
          <van-uploader
            v-model="form.priceList2"
            multiple
            :before-read="beforeRead"
            :after-read="afterRead(1)"
            @delete="delete1"
          />
        </div>
        <div class="padding-base font28">
          <span style="font-size:14px;margin:20px">机构环境</span>
          <span style="float:right;color:#919191">已上传{{form.organizationEnvironment2.length}}张</span>
        </div>
        <div style="padding:0 10px">
          <van-uploader
            v-model="form.organizationEnvironment2"
            multiple
            :before-read="beforeRead"
            :after-read="afterRead(2)"
            @delete="delete2"
          />
        </div>
        <div class="padding-base font28">
          <span style="font-size:14px;margin:20px">荣誉墙</span>
          <span style="float:right;color:#919191">已上传{{form.institutionalHonorWall2.length}}张</span>
        </div>
        <div style="padding:0 10px">
          <van-uploader
            v-model="form.institutionalHonorWall2"
            multiple="multiple"
            :before-read="beforeRead"
            :after-read="afterRead(3)"
            @delete="delete3"
          />
        </div>
      </div>
      <van-row type="flex" justify="center" class="pT20 pR16 pB20 pL16">
        <van-col class="mR20">
          <van-button
            type="default"
            size="small"
            @click="submit(1)"
            :disabled="btnStatus"
            class="submit"
          >保存</van-button>
        </van-col>
        <van-col class="">
          <van-button
            type="default"
            size="small"
            @click="submit(2)"
            :disabled="btnStatus"
            class="submit"
          >提交</van-button>
        </van-col>
      </van-row>
      <!-- <div class="panel__bottom">
      <van-button type="default" @click="submit(1)" class="submit">保 存</van-button>&nbsp;&nbsp;
      <van-button type="default" @click="submit(2)" class="submit">提交</van-button>
      </div>-->
      <!-- <van-dialog v-model="mapShow" title="标题">
			  <div id="allmap"></div>
      </van-dialog>-->
    </div>
    <OrganizationInfoMap v-show="mapShow" @getPoint="getPoint" :key="mapShowKey"></OrganizationInfoMap>
  </div>
</template>

<script>
import bus from "../../utils/bus.js";
import axios from "@/router/axios";
import { fomate } from "../../utils/util";
// import area from "../../utils/area.js";
import { Dialog } from "vant";
import BMap from "BMap";
import { amapAreaList } from "@/api/common";
import OrganizationInfoMap from "./organizationInfoMap";

export default {
  name: "",
  data() {
    return {
      myLoading: "",
      form: {
        name: "", //机构名称
        foundingDate2: "", //前端显示
        foundingDate: "",
        property: "",
        type: "",
        payStyle: "",
        institutionalPriceList: "",
        nurseCnt: "",
        medicalService: "",
        bedspace: "",
        numberOfVacantBeds: "",
        address: "",
        detailedAddress: "", //
        intro: "",
        longitude: "", //经度
        latitude: "", //纬度,
        priceList: [],
        priceList2: [],
        priceList3: [],
        organizationEnvironment: [],
        organizationEnvironment2: [],
        organizationEnvironment3: [],
        institutionalHonorWall: [],
        institutionalHonorWall2: [],
        institutionalHonorWall3: [],
        feeMax: "",
        feeMin: "",
        buildingArea: "",
        buildingType: "",
        floors: "",
        payStyle: "",
        contactInformation: "",
        url: "",
        facilitiesAndEquipment: "",
        isMedicalInsurance: "",
        medicalService: ""
      },

      foundingDateShow: false,
      propertyShow: false,
      typeShow: false,
      payStyleShow: false,
      addressShow: false,
      buildingTypeShow: false,
      isMedicalInsuranceShow: false,
      medicalServiceShow: false,

      mapShow: false,
      mapShowKey: "",
      //公办（建），2民营
      propertyMap: [
        {
          key: 1,
          value: "公办"
        },
        {
          key: 2,
          value: "民营"
        }
      ],
      propertyColumns: ["公办", "民营"],
      //机构类型1.护理型，2.自理型，3.综合型，4.医养结合
      typeMap: [
        {
          key: 1,
          value: "护理型"
        },
        {
          key: 2,
          value: "自理型"
        },
        {
          key: 3,
          value: "综合型"
        },
        {
          key: 4,
          value: "医养结合"
        }
      ],
      typeColumns: ["护理型", "自理型", "综合型", "医养结合"],

      //付款方式，1.月付，2.半年付，3.年付，4其他
      payStyleMap: [
        {
          key: 1,
          value: "月付"
        },
        {
          key: 2,
          value: "半年付"
        },
        {
          key: 3,
          value: "年付"
        },
        {
          key: 4,
          value: "其他"
        }
      ],
      payStyleColumns: ["月付", "半年付", "年付", "其他"],

      //1.楼房，2.平房
      buildingTypeMap: [
        {
          key: 1,
          value: "楼房"
        },
        {
          key: 2,
          value: "平房"
        }
      ],
      buildingTypeColumns: ["楼房", "平房"],

      //
      isMedicalInsuranceMap: [
        {
          key: 1,
          value: "是"
        },
        {
          key: 2,
          value: "否"
        }
      ],
      isMedicalInsuranceColumns: ["是", "否"],

      medicalServiceMap: [
        {
          key: 1,
          value: "开展"
        },
        {
          key: 2,
          value: "未开展"
        }
      ],
      medicalServiceColumns: ["开展", "未开展"],

      areaList: {},
      btnStatus: false
    };
  },

  components: {
    [Dialog.Component.name]: Dialog.Component,
    OrganizationInfoMap
  },
  created() {
    this.amapAreaList();
  },
  mounted() {
    this.getData();
  },
  methods: {
    beforeRead(file) {
      this.loading = this.$loading({
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      return file;
    },

    amapAreaList() {
      amapAreaList().then(res => {
        let province_list = res.data.result[0];
        let city_list = res.data.result[1].filter(
          item => item.id.slice(4) == "00"
        );
        let county_list = res.data.result[2].concat(
          res.data.result[1].filter(item => item.id.slice(4) != "00")
        );

        let province_listobj = {};
        province_list.map(item => {
          province_listobj[item.id] = item.fullname;
        });
        this.areaList.province_list = province_listobj;

        let city_listobj = {};
        city_list.map(item => {
          city_listobj[item.id] = item.fullname;
        });
        city_listobj["110100"] = "";
        city_listobj["120100"] = "";
        city_listobj["500100"] = "";
        city_listobj["310100"] = "";
        this.areaList.city_list = city_listobj;

        let county_listobj = {};
        county_list.map(item => {
          county_listobj[item.id] = item.fullname;
        });
        this.areaList.county_list = county_listobj;
      });
    },
    checkFeeMin() {
      if (parseFloat(this.form.feeMin) > parseFloat(this.form.feeMax)) {
        this.$toast("费用下限超过费用上限");
        return false;
      }
    },
    checkNumberOfVacantBeds() {
      if (
        parseInt(this.form.numberOfVacantBeds) > parseInt(this.form.bedspace)
      ) {
        this.$toast("空闲床位超过总床位");
        return false;
      }
    },
    buildingTypeConfirm(val) {
      this.form.buildingType = val;
      this.buildingTypeShow = false;
    },

    foundingDateConfirm(time) {
      this.form.foundingDate2 = fomate("yyyy-mm", new Date(time));

      this.form.foundingDate = fomate("yyyy-mm-dd HH:MM:SS", new Date(time));
      this.foundingDateShow = false;
    },
    propertyConfirm(val) {
      this.form.property = val;
      this.propertyShow = false;
    },
    typeConfirm(val) {
      this.form.type = val;
      this.typeShow = false;
    },
    payStyleConfirm(val) {
      this.form.payStyle = val;
      this.payStyleShow = false;
    },

    isMedicalInsuranceConfirm(val) {
      this.form.isMedicalInsurance = val;
      this.isMedicalInsuranceShow = false;
    },

    medicalServiceConfirm(val) {
      this.form.medicalService = val;
      this.medicalServiceShow = false;
    },

    addressConfirm(val) {
      if (val[0] && val[0].code != "") {
        this.form.provinceCode = val[0].code;
      }
      if (val[1] && val[1].code != "") {
        if (
          val[1].code == "110100" ||
          val[1].code == "120100" ||
          val[1].code == "500100" ||
          val[1].code == "310100"
        ) {
          this.form.cityCode = val[1].code.slice(0, 2) + "0000";
        } else {
          this.form.cityCode = val[1].code;
        }
      }
      if (val[2] && val[2].code != "") {
        this.form.districtCode = val[2].code;
      }

      this.form.detailedAddress = "";
      val.map(v => {
        if (v) {
          this.form.detailedAddress += v.name;
        }
      });

      this.addressShow = false;
    },
    getData() {
      // var id = "1";
      axios({
        method: "get",
        // url: "/organization/organizationInformation/selectById/" + id
        url: "/organization/organizationInformation/selectById"
        // data: this.form
      }).then(res => {
        if (res.data.resultFlag == "success") {
          var data = res.data.body;
          // this.form = res.data.body;
          if (data.priceList) {
            data.priceList = data.priceList.toString().split(",");
            data.priceList2 = data.priceListList;

            data.priceList3 = [];
            data.priceList2 = data.priceList2.map(v => {
              v.url = v.internetUrl;
              data.priceList3.push({
                id: v.id,
                name: v.name
              });

              return v;
            });

          } else {
            data.priceList = [];
            data.priceList2 = [];
            data.priceList3 = [];
          }
          if (data.organizationEnvironment) {
            data.organizationEnvironment = data.organizationEnvironment
              .toString()
              .split(",");
            data.organizationEnvironment2 = data.organizationEnvironmentList;

            data.organizationEnvironment3 = [];
            data.organizationEnvironment2 = data.organizationEnvironment2.map(
              v => {
                v.url = v.internetUrl;
                // data.organizationEnvironment3.push(v.name);
                data.organizationEnvironment3.push({
                  id: v.id,
                  name: v.name
                });

                return v;
              }
            );
          } else {
            data.organizationEnvironment = [];
            data.organizationEnvironment2 = [];
            data.organizationEnvironment3 = [];
          }
          if (data.institutionalHonorWall) {
            data.institutionalHonorWall = data.institutionalHonorWall
              .toString()
              .split(",");
            data.institutionalHonorWall2 = data.institutionalHonorWallList;

            data.institutionalHonorWall3 = [];
            data.institutionalHonorWall2 = data.institutionalHonorWall2.map(
              v => {
                v.url = v.internetUrl;
                // data.institutionalHonorWall3.push(v.name);
                data.institutionalHonorWall3.push({
                  id: v.id,
                  name: v.name
                });

                return v;
              }
            );
          } else {
            data.institutionalHonorWall = [];
            data.institutionalHonorWall2 = [];
            data.institutionalHonorWall3 = [];
          }

          if (data.foundingDate) {
            data.foundingDate2 = fomate(
              "yyyy-mm",
              new Date(data.foundingDate.replace(/-/g, "/"))
            );
          }
          if (data.property) {
            this.propertyMap.map(v => {
              if (v.key == data.property) {
                data.property = v.value;
              }
            });
          }

          if (data.buildingType) {
            this.buildingTypeMap.map(v => {
              if (v.key == data.buildingType) {
                data.buildingType = v.value;
              }
            });
          }

          if (data.type) {
            this.typeMap.map(v => {
              if (v.key == data.type) {
                data.type = v.value;
              }
            });
          }
          if (data.payStyle) {
            this.payStyleMap.map(v => {
              if (v.key == data.payStyle) {
                data.payStyle = v.value;
              }
            });
          }

          if (data.isMedicalInsurance) {
            this.isMedicalInsuranceMap.map(v => {
              if (v.key == data.isMedicalInsurance) {
                data.isMedicalInsurance = v.value;
              }
            });
          }
          if (data.medicalService) {
            this.medicalServiceMap.map(v => {
              if (v.key == data.medicalService) {
                data.medicalService = v.value;
              }
            });
          }

          this.form = data;
        }
      });
    },
    submit(type) {
      if (parseFloat(this.form.feeMin) > parseFloat(this.form.feeMax)) {
        this.$toast("费用下限超过费用上限");
        return false;
      }

      if (
        parseInt(this.form.numberOfVacantBeds) > parseInt(this.form.bedspace)
      ) {
        this.$toast("空闲床位超过总床位");
        return false;
      }

      this.btnStatus = true;

      let url;
      let toastmsg;
      if (type == 1) {
        url = "/organization/organizationInformation/update";
        toastmsg = "保存成功";
      } else if (type == 2) {
        url = "/organization/organizationInformation/submit";
        toastmsg = "提交成功";
      }

      //type =1 暂存，type=2  提交
      if (this.form.property) {
        this.propertyMap.map(v => {
          if (v.value == this.form.property) {
            this.form.property = v.key;
          }
        });
      }
      if (this.form.type) {
        this.typeMap.map(v => {
          if (v.value == this.form.type) {
            this.form.type = v.key;
          }
        });
      }

      if (this.form.buildingType) {
        this.buildingTypeMap.map(v => {
          if (v.value == this.form.buildingType) {
            this.form.buildingType = v.key;
          }
        });
      }

      if (this.form.payStyle) {
        this.payStyleMap.map(v => {
          if (v.value == this.form.payStyle) {
            this.form.payStyle = v.key;
          }
        });
      }

      if (this.form.isMedicalInsurance) {
        this.isMedicalInsuranceMap.map(v => {
          if (v.value == this.form.isMedicalInsurance) {
            this.form.isMedicalInsurance = v.key;
          }
        });
      }

      if (this.form.medicalService) {
        this.medicalServiceMap.map(v => {
          if (v.value == this.form.medicalService) {
            this.form.medicalService = v.key;
          }
        });
      }

      if (this.form.priceList) {
        this.form.priceList = this.form.priceList.join(",");
      }
      if (this.form.organizationEnvironment) {
        this.form.organizationEnvironment = this.form.organizationEnvironment.join(
          ","
        );
      }
      if (this.form.institutionalHonorWall) {
        this.form.institutionalHonorWall = this.form.institutionalHonorWall.join(
          ","
        );
      }

      // this.form.id = "1";

      axios({
        method: "post",
        url: url,
        data: this.form
      }).then(res => {
        this.btnStatus = false;
        if (res.data.resultFlag == "success") {
          this.$toast(toastmsg);
          window.scrollTo(0, 0);
          this.$router.push({
            path: "/home"
          });
        }
      });
    },
    afterRead(belong) {
      var self = this;

      return file => {
        if (file instanceof Array) {
          file.map(v => {
            // this.form.priceList3.push(v.file.name)
            var M = v.file.size / 1024 / 1024;
            if (M > 4) {
            } else {
              M = 1;
            }
            this.compressFile(v.file, this.uploadFn, M, belong);

            // var M = v.file.size / 1024 / 1024;
            // if (v.file.size / 1024 / 1024 > 4) {
            // this.$dialog
            //   .alert({
            //     title: "图片不允许超过4M", //加上标题
            //     message: "压缩后可上传，压缩吗", //改变弹出框的内容
            //     showCancelButton: true, //展示取水按钮
            //   })
            //   .then(() => {
            //     this.compressFile(v.file,this.uploadFn,M/2,belong);
            //   })
            //   .catch(() => {
            //      this.loading.close();
            //   });

            // }else{
            //   this.compressFile(v.file,this.uploadFn,1,belong);
            // }
          });
        } else {
          // this.form.priceList3.push(file.file.name);

          var M = file.file.size / 1024 / 1024;
          if (file.file.size / 1024 / 1024 > 4) {
            this.$dialog
              .alert({
                title: "图片不允许超过4M", //加上标题
                message: "压缩后可上传，压缩吗", //改变弹出框的内容
                showCancelButton: true //展示取水按钮
              })
              .then(() => {
                this.compressFile(file.file, this.uploadFn, M / 2, belong);
              })
              .catch(() => {
                this.loading.close();
                if (belong == 1) {
                  self.form.priceList2.splice(
                    self.form.priceList2.length - 1,
                    1
                  );
                } else if (belong == 2) {
                  self.form.organizationEnvironment2.splice(
                    self.form.organizationEnvironment2.length - 1,
                    1
                  );
                } else if (belong == 3) {
                  self.form.institutionalHonorWall2.splice(
                    self.form.institutionalHonorWall2.length - 1,
                    1
                  );
                }
              });
          } else {
            this.compressFile(file.file, this.uploadFn, 1, belong);
          }
        }
      };
    },

    uploadFn(file, belong) {
      var self = this;
      let formdata = new FormData();
      formdata.append("multipartFile", file);
      axios({
        method: "post",
        url: "/organization/fileOperation/putObject?type=1",
        headers: {
          "Content-Type": "multipart/form-data;charset=UTF-8"
        },
        data: formdata
      }).then(res => {
        if (belong == 1) {
          self.form.priceList3.push({
            id: res.data.body.id,
            name: res.data.body.fileName
          });
        } else if (belong == 2) {
          self.form.organizationEnvironment3.push({
            id: res.data.body.id,
            name: res.data.body.fileName
          });
        } else if (belong == 3) {
          self.form.institutionalHonorWall3.push({
            id: res.data.body.id,
            name: res.data.body.fileName
          });
        }

        axios({
          method: "post",
          url: "/organization/fileOperation/pictureCheck?id=" + res.data.body.id
        }).then(res2 => {
          setTimeout(() => {
            self.loading.close();
          }, 2000);

          if (res2.data.resultFlag == "error") {
            var msg = res2.data.body.split("&")[0];
            var name = res2.data.body.split("&")[1];
            this.$toast(msg);

            if (belong == 1) {
              self.form.priceList2.map((vv, kk) => {
                if (!vv.id) {
                  if (vv.file.name == name) {
                    self.form.priceList2.splice(kk, 1);
                  }
                }
              });

              self.form.priceList3.map((v, k) => {
                if (v.name == name) {
                  self.form.priceList3.splice(k, 1);
                }
              });

            } else if (belong == 2) {
              self.form.organizationEnvironment2.map((vv, kk) => {
                if (!vv.id) {
                  if (vv.file.name == name) {
                    self.form.organizationEnvironment2.splice(kk, 1);
                  }
                }
              });

              self.form.organizationEnvironment3.map((v, k) => {
                if (v.name == name) {
                  self.form.organizationEnvironment3.splice(k, 1);
                }
              });



              // self.form.organizationEnvironment2.splice(
              //   self.form.organizationEnvironment2.length - 1,
              //   1
              // );
            } else if (belong == 3) {
              self.form.institutionalHonorWall2.map((vv, kk) => {
                if (!vv.id) {
                  if (vv.file.name == name) {
                    self.form.institutionalHonorWall2.splice(kk, 1);
                  }
                }
              });

              self.form.institutionalHonorWall3.map((v, k) => {
                if (v.name == name) {
                  self.form.institutionalHonorWall3.splice(k, 1);
                }
              });

              // self.form.institutionalHonorWall2.splice(
              //   self.form.institutionalHonorWall2.length - 1,
              //   1
              // );
            }
          } else {
            if (belong == 1) {
              self.form.priceList.push(res.data.body.id);
            } else if (belong == 2) {
              self.form.organizationEnvironment.push(res.data.body.id);
            } else if (belong == 3) {
              self.form.institutionalHonorWall.push(res.data.body.id);

              axios({
                method: "post",
                url:
                  "/organization/fileOperation/pictureCalculationSize?id=" +
                  res.data.body.id
              }).then(res3 => {});
            }
          }
        });
      });
    },

    //压缩图片
    compressFile(file, callback, raito, belong) {
      var self = this;
      var Orientation;
      EXIF.getData(file, function() {
        EXIF.getAllTags(this);
        Orientation = EXIF.getTag(this, "Orientation");
      });

      let fileObj = file;
      let reader = new FileReader();
      reader.readAsDataURL(fileObj); //转base64
      reader.onload = function(e) {
        var width, height;
        let image = new Image(); //新建一个img标签（还没嵌入DOM节点)
        image.src = e.target.result;
        image.onload = function() {
          var canvas = document.createElement("canvas"), // 新建canvas
            context = canvas.getContext("2d"),
            imageWidth = image.width / raito, //压缩后图片的大小
            imageHeight = image.height / raito,
            data = "";
          canvas.width = imageWidth;
          canvas.height = imageHeight;

          width = image.width / raito;
          height = image.height / raito;

          switch (Orientation) {
            case 6:
            case 8:
              canvas.width = height;
              canvas.height = width;
              break;
          }

          var ver = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
          var iosGo = false;
          if (ver) {
            //13.5不旋转，13.5以下选转
            if (parseInt(ver[2]) < 5) {
              iosGo = true;
            }
          }

          var u = navigator.userAgent;
          var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
          var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
          //android处理，ios不处理
          if (Orientation != "" && Orientation != 1 && (isAndroid || iosGo)) {
            // alert('旋转处理');
            switch (Orientation) {
              case 6:
                //iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
                //需要顺时针（向左）90度旋转
                context.rotate(0.5 * Math.PI);
                context.translate(0, -height);
                break;
              case 8:
                //iphone竖屏拍摄，此时home键在上方
                //需要逆时针（向右）90度旋转
                // alert('需要顺时针（向右）90度旋转');
                context.rotate(-0.5 * Math.PI);
                context.translate(-width, 0);
                break;
              case 3: //需要180度旋转
                //iphone横屏拍摄，此时home键在左侧
                context.translate(width, height);
                context.rotate(Math.PI);
                break;
            }
          }

          context.drawImage(image, 0, 0, imageWidth, imageHeight);
          data = canvas.toDataURL("image/jpeg"); // 输出压缩后的base64

          this.base64Img = canvas.toDataURL("image/jpeg");

          let arr = data.split(","),
            mime = arr[0].match(/:(.*?);/)[1], // 转成blob
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          let files = new window.File(
            [new Blob([u8arr], { type: mime })],
            file.name,
            // "test.jpeg",
            { type: "image/jpeg" }
          ); // 转成file
          callback(files, belong); // 回调
        };
      };
    },

    delete1(val) {
      // console.log("val");
      // console.log(val);
      if (val instanceof Object) {
        if (val.id) {
          val = val.id.toString();
          this.form.priceList = this.form.priceList.filter(v => {
            return v != val.toString();
          });
        } else {
          // var i;
          // console.log(this.form.priceList3);
          // console.log("----------");
          // console.log(this.form.priceList);
          this.form.priceList3.map((vv, ii) => {
            if (vv.name == val.file.name) {
              // i = ii;
              // this.form.priceList.splice(ii, 1);

              this.form.priceList.map((vvv, iii) => {
                if (vv.id == vvv) {
                  this.form.priceList.splice(iii, 1);
                }
              });
            }
          });
          // console.log(this.form.priceList);
        }
      } else {
        this.form.priceList = this.form.priceList.filter(v => {
          return v != val.toString();
        });
      }
    },

    delete2(val) {
      // console.log(val);
      if (val instanceof Object) {
        if (val.id) {
          val = val.id.toString();
          this.form.organizationEnvironment = this.form.organizationEnvironment.filter(
            v => {
              return v != val.toString();
            }
          );
        } else {
          // var i;
          // console.log(this.form.organizationEnvironment3);
          // console.log(this.form.organizationEnvironment);
          this.form.organizationEnvironment3.map((vv, ii) => {
            if (vv.name == val.file.name) {
              this.form.organizationEnvironment.map((vvv, iii) => {
                if (vv.id == vvv) {
                  this.form.organizationEnvironment.splice(iii, 1);
                }
              });

              // this.form.organizationEnvironment.splice(ii, 1);
            }
          });
          // console.log(this.form.organizationEnvironment);
          // this.form.organizationEnvironment3.map((vv, ii) => {
          //   if (vv == val.file.name) {
          //     i = ii;
          //   }
          // });
          // this.form.organizationEnvironment.splice(i, 1);
        }
      } else {
        this.form.organizationEnvironment = this.form.organizationEnvironment.filter(
          v => {
            return v != val.toString();
          }
        );
      }
    },
    delete3(val) {
      // console.log(val);
      if (val instanceof Object) {
        if (val.id) {
          val = val.id.toString();
          this.form.institutionalHonorWall = this.form.institutionalHonorWall.filter(
            v => {
              return v != val.toString();
            }
          );
        } else {
          // console.log(this.form.institutionalHonorWall3);
          // console.log(this.form.institutionalHonorWall);
          this.form.institutionalHonorWall3.map((vv, ii) => {
            if (vv.name == val.file.name) {
              this.form.institutionalHonorWall.map((vvv, iii) => {
                if (vv.id == vvv) {
                  this.form.institutionalHonorWall.splice(iii, 1);
                }
              });

              // this.form.institutionalHonorWall.splice(ii, 1);
            }
          });
          // console.log(this.form.institutionalHonorWall);
          // var i;
          // this.form.institutionalHonorWall3.map((vv, ii) => {
          //   if (vv == val.file.name) {
          //     i = ii;
          //   }
          // });
          // this.form.institutionalHonorWall.splice(i, 1);
        }
      } else {
        this.form.institutionalHonorWall = this.form.institutionalHonorWall.filter(
          v => {
            return v != val.toString();
          }
        );
      }
    },
    mapDialog() {
      bus.$emit("headerShowClose");

      var self = this;
      this.mapShow = true;
      this.mapShowKey = new Date() + ((Math.random() * 1000).toFixed(0) + "");
    },
    getPoint(data) {
      this.mapShow = false;
      this.form.latitude = data.lat;
      this.form.longitude = data.lng;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  background: #f4f4f4;
}
.panel__top {
}
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
