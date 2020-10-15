<template>
	<div class="container">
		<van-tabs v-model="active" sticky>
			<van-tab v-for="(item,index) in tabList" :title="item.name" :name="item.name" :key='index'>
				<div v-if="item.name=='话术设置'">
					<div>
						<van-row type="flex" justify="space-between" class="pT20 pR16 pB20 pL16">
							<van-col>
								<div class="font32 fontbold">咨询:</div>
							</van-col>
						</van-row>
						<div class="mL20">
							<van-row type="flex" justify="space-between" class="pT20 pR16 pB20 pL16">
								<van-col>
									<div class="font28 fontbold">欢迎语</div>
								</van-col>
							</van-row>
							<van-row type="flex" justify="space-between" class="pT20 pR16 pB20 pL16">
								<van-col>
									<div class="font28">咨询对话开启时，系统自动向访客发送的问候语术</div>
								</van-col>
							</van-row>
							<van-field v-model="verbaTrick.consult.start" rows="1" autosize type="textarea" placeholder="请输入留言" />
						</div>
						<div class="mL20">
							<van-row type="flex" justify="space-between" class="pT20 pR16 pB20 pL16">
								<van-col>
									<div class="font28 fontbold">结束语</div>
								</van-col>
							</van-row>
							<van-row type="flex" justify="space-between" class="pT20 pR16 pB20 pL16">
								<van-col>
									<div class="font28">对话结束后，系统自动向访客发送的结束话术</div>
								</van-col>
							</van-row>
							<van-field v-model="verbaTrick.consult.end" rows="1" autosize type="textarea" placeholder="请输入留言" />
						</div>
					</div>
					<div>
						<van-row type="flex" justify="space-between" class="pT20 pR16 pB20 pL16">
							<van-col>
								<div class="font32 fontbold">预约:</div>
							</van-col>
						</van-row>
						<div class="mL20">
							<van-row type="flex" justify="space-between" class="pT20 pR16 pB20 pL16">
								<van-col>
									<div class="font28 fontbold">欢迎语</div>
								</van-col>
							</van-row>
							<van-row type="flex" justify="space-between" class="pT20 pR16 pB20 pL16">
								<van-col>
									<div class="font28">咨询对话开启时，系统自动向访客发送的问候语术</div>
								</van-col>
							</van-row>
							<van-field v-model="verbaTrick.order.start" rows="1" autosize type="textarea" placeholder="请输入留言" />
						</div>
						<div class="mL20">
							<van-row type="flex" justify="space-between" class="pT20 pR16 pB20 pL16">
								<van-col>
									<div class="font28 fontbold">结束语</div>
								</van-col>
							</van-row>
							<van-row type="flex" justify="space-between" class="pT20 pR16 pB20 pL16">
								<van-col>
									<div class="font28">对话结束后，系统自动向访客发送的结束话术</div>
								</van-col>
							</van-row>
							<van-field v-model="verbaTrick.order.end" rows="1" autosize type="textarea" placeholder="请输入留言" />
						</div>
					</div>
					<van-row type="flex" justify="center" class="pT20 pR16 pB20 pL16">
						<van-col class='mR20'>
							<van-button type="default" size="small" class="submit wP100">保存</van-button>
						</van-col>
						<van-col class=''>
							<van-button type="default" size="small" class="cancle wP100">取消</van-button>
						</van-col>
					</van-row>
				</div>
				<div v-if="item.name=='咨询问答'">
					<van-row type="flex" justify="space-between" class="pT20 pR16 pB20 pL16">
						<van-col class='mR20'>
							<van-button type="default" size="small" class="submit wP100" @click='handle("add")'>新建问答</van-button>
						</van-col>
					</van-row>
					<div class="mT20">
						<el-table :data="QandAList" style="width: 100%">
							<el-table-column label="标准问题" min-width="100px">
								<template slot-scope="scope">
									<!-- <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.date"></el-input> -->
									<!-- <span v-show="!scope.row.show">{{scope.row.date}}</span> -->
									{{scope.row.question}}
								</template>
							</el-table-column>
							<el-table-column label="答案" min-width="150px">
								<template slot-scope="scope">
									<!-- <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.name"></el-input> -->
									<!-- <span v-show="!scope.row.show">{{scope.row.name}}</span> -->
									{{scope.row.answer}}
								</template>
							</el-table-column>
							<el-table-column label="继续追问线索" min-width="130px">
								<template slot-scope="scope">
									<!-- <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.address"></el-input> -->
									<!-- <span v-show="!scope.row.show">{{scope.row.address}}</span> -->
									{{scope.row.askClues}}

								</template>
							</el-table-column>
							<el-table-column label="追问术话" min-width="150px">
								<template slot-scope="scope">
									<!-- <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.address"></el-input> -->
									<!-- <span v-show="!scope.row.show">{{scope.row.address}}</span> -->
									{{scope.row.askLingo}}
								</template>
							</el-table-column>
							<el-table-column label="操作" min-width="100px" align="center">
								<template slot-scope="scope">
									<el-button type="text" size="small" @click='handle("update",scope.row.id)'>编辑</el-button>
									<el-button type="text" size="small" @click='handle("del",scope.row.id)'>删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<van-row type="flex" justify="end" class="pT20 pR16 pB20 pL16">
							<van-col class=''>
								<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
								 :page-sizes="[15, 30, 50, 100]" :page-size="pageSize" layout="sizes, prev, pager, next,total" :total="QandAList.length">
								</el-pagination>
							</van-col>
						</van-row>

					</div>
				</div> 
				<div v-if="item.name=='预约设置'">
					<el-tabs v-model="activeClew" class="pT20 pR16 pB20 pL16">
						<el-tab-pane :label="itemclewList.name" :name="itemclewList.id" v-for="(itemclewList,index) in clewList" :key="index">
							<div>
								<div class="">
									<van-row type="flex" justify="space-between" class="pT20 pR16 pB10 pL16">
										<van-col>
											<div class="font32 fontbold borderLeft5 pL16">生效线索信息</div>
										</van-col>
									</van-row>
									<el-table :data="itemclewList.trueClewList" style="width: 100%">
										<el-table-column type="expand">
											<template slot-scope="scope">
												<el-form label-width="80px" class="demo-table-expand">
													<el-form-item label="首问话术">
														<span>
															<van-field v-model="scope.row.clew1" rows="1" autosize type="textarea" placeholder="请输入话术" /></span>
													</el-form-item>
													<el-form-item label="追问话术">
														<span>
															<van-field v-model="scope.row.clew2" rows="1" autosize type="textarea" placeholder="请输入话术" /></span>
													</el-form-item>
													<el-form-item label="追问话术">
														<span>
															<van-field v-model="scope.row.clew3" rows="1" autosize type="textarea" placeholder="请输入话术" /></span>
													</el-form-item>
												</el-form>
											</template>
										</el-table-column>
										<el-table-column label="生效" width="55px">
											<template slot-scope="scope">
												<el-checkbox v-model="scope.row.checked" @change="changeEffect('del',scope.row.checked,scope.$index,scope.row,itemclewList.trueClewList,itemclewList.falseClewList)"></el-checkbox>
											</template>
										</el-table-column>
										<el-table-column label="线索信息" prop="name" min-width="150px">
										</el-table-column>
										<el-table-column label="首问术话/追问术话" min-width="150px">
											<template slot-scope="scope">
												<span class="fontC098AE8 mR10 font32">首</span>{{scope.row.clew1}}
											</template>
										</el-table-column>
										<el-table-column label="操作" min-width="150">
											<template slot-scope="scope">
												<el-button type="text" v-if="scope.$index<itemclewList.trueClewList.length-1" @click='getchangetableData(scope.$index,scope.$index+1,index,itemclewList.trueClewList)'>下移</el-button>
												<el-button type="text" v-if="scope.$index>0" @click='getchangetableData(scope.$index,scope.$index-1,index,itemclewList.trueClewList)'>上移</el-button>
											</template>
										</el-table-column>
										<el-table-column label="访问次数" min-width="150px">
											<template slot-scope="scope">
												<van-stepper v-model="scope.row.num" />
											</template>
										</el-table-column>
									</el-table>
								</div>
								<div class="">
									<van-row type="flex" justify="space-between" class="pT20 pR16 pB10 pL16">
										<van-col>
											<div class="font32 fontbold borderLeft5 pL16">未生效线索信息</div>
										</van-col>
									</van-row>
									<el-table :data="itemclewList.falseClewList" style="width: 100%">
										<el-table-column label="生效" width="55px">
											<template slot-scope="scope">
												<el-checkbox v-model="scope.row.checked" @change="changeEffect('add',scope.row.checked,scope.$index,scope.row,itemclewList.trueClewList,itemclewList.falseClewList)"></el-checkbox>
											</template>
										</el-table-column>
										<el-table-column label="线索信息" prop="name" min-width="150px">
										</el-table-column>
										<el-table-column label="首问术话/追问术话" min-width="150px">
											<template slot-scope="scope">
												<span class="fontC098AE8 mR10 font32">首</span>{{scope.row.clew1}}
											</template>
										</el-table-column>
									</el-table>
								</div>
							</div>
						</el-tab-pane>
					</el-tabs>


					<van-row type="flex" justify="center" class="pT20 pR16 pB20 pL16">
						<van-col class='mR20'>
							<van-button type="default" size="small" class="submit wP100">保存</van-button>
						</van-col>
						<van-col class=''>
							<van-button type="default" size="small" class="cancle wP100">取消</van-button>
						</van-col>
					</van-row>
				</div>
				<div v-if="item.name=='高级设置'">
					<div>
						<van-row type="flex" justify="space-between" class="pT20 pR16 pB10 pL16">
							<van-col>
								<div class="font32 fontbold borderLeft5 pL16">静默超时设置</div>
							</van-col>
						</van-row>
						<div class="mL20 mR20">
							<van-row type="flex" justify="space-between" class="pR16 pB10 pL16">
								<van-col>
									<div class="font28 fontbold fontC666666">当访客超过60s没有回复时，可选择最重要的信息节点作为跳转节点(系统默认当前节点为跳转节点)</div>
								</van-col>
							</van-row>
							<el-select v-model="SilentTimeout" placeholder="请选择">
								<el-option v-for="item in activeClewList" :key="item.name" :label="item.name" :value="item.id">
								</el-option>
								<el-option label="当前线索信息" value="all"></el-option>
							</el-select>
						</div>
					</div>
					<div>
						<van-row type="flex" justify="space-between" class="pT20 pR16 pB10 pL16">
							<van-col>
								<div class="font32 fontbold borderLeft5 pL16">未理解设置</div>
							</van-col>
						</van-row>
						<div class="mL20 mR20">
							<van-row type="flex" justify="space-between" class="pR16 pB20 pL16">
								<van-col>
									<div class="font28 fontbold fontC666666">当访客话术未被系统理解时，可选择最重要的信息节点作为跳转节点(系统默认当前节点为跳转节点)</div>
								</van-col>
							</van-row>
							<el-select v-model="DidNotUnderstand" placeholder="请选择">
								<el-option v-for="item in activeClewList" :key="item.name" :label="item.name" :value="item.id">
								</el-option>
								<el-option label="当前线索信息" value="all"></el-option>
							</el-select>
						</div>
					</div>
					<div>
						<van-row type="flex" class="pT20 pR16 pB10 pL16">
							<van-col>
								<div class="font32 fontbold borderLeft5 pL16">转人工设置
								</div>
							</van-col>
							<van-col class="mL20">
								<van-switch v-model="isSwitchArtificial" size="20px" active-color="#07c160" inactive-color="#999999" />
							</van-col>
						</van-row>
						<div class="mL20 mR20" v-if="isSwitchArtificial">
							<van-row type="flex" justify="space-between" class="pR16 pB20 pL16">
								<van-col>
									<div class="font28 fontbold fontC666666">转人工关键词，当访客话术中包含某些关键词时触发转人工事件</div>
								</van-col>
							</van-row>
							<el-input v-model="artificial" placeholder="" @keyup.enter.native="addArtificialList"></el-input>
							<van-row type="flex" justify="space-between" align="center" class="pR16 pL16 el-delList" v-for='(item,index) in artificialList'
							 :key='index'>
								<van-col>
									<div class="">{{item}}</div>
								</van-col>
								<van-col>
									<i class="iconfont icon-shanchu" @click='delArtificialItem(index)'></i>
									<!-- <van-button icon=" " type="default" size="small" class="text"></van-button> -->
								</van-col>
							</van-row>
						</div>
					</div>
					<van-row type="flex" justify="center" class="pT20 pR16 pB20 pL16">
						<van-col class='mR20'>
							<van-button type="default" size="small" class="submit wP100">保存</van-button>
						</van-col>
						<van-col class=''>
							<van-button type="default" size="small" class="cancle wP100">取消</van-button>
						</van-col>
					</van-row>
				</div>
			</van-tab>
		</van-tabs>
		<ConfigurationOfTheServiceAdd v-if="isConfigurationOfTheServiceAdd" @cancle='cancle' :option='Addoption'></ConfigurationOfTheServiceAdd>
	</div>
</template>

<script>
	import ConfigurationOfTheServiceAdd from './configurationOfTheServiceAdd'
	export default {
		name: "configurationOfTheService",
		components: {
			ConfigurationOfTheServiceAdd
		},
		data() {
			return {
				active: '话术设置',
				tabList: [{
						name: '话术设置',
					},
					{
						name: '咨询问答',
					},
					{
						name: '预约设置',
					},
					{
						name: '高级设置',
					}
				],
				verbaTrick: {
					consult: {
						start: '',
						end: ''
					},
					order: {
						start: '',
						end: ''
					}
				},
				isConfigurationOfTheServiceAdd: false,
				QandAList: [{
					id:1,
					question: '你们这边是正规机构吗？',
					answer: '我们是正规的营业机构，有相关行业执照和证件，还请您这边放心。',
					askClues: '手机',
					askLingo: '您方便说下短信号码？详细信息稍后通过系统自动给您转过去呢。',
				}],
				currentPage:1,
				pageSize:30,
				activeClew: '1',
				clewList: [{
						name: '​预约线索模板1',
						id: '1',
						trueClewList: [{
							name: '姓名1-1',
							id: '1',
							clew1: '您这边怎么称呼？',
							clew2: '咨询的用户较多，这边备注下您的姓名？方便后续沟通呢。',
							clew3: '简单记录下您的姓名？这样方便后续业务专家和您深入沟通呢。',
							num: 1,
							checked: true,
						}, {
							name: '姓名1-2',
							id: '2',
							clew1: '您这边怎么称呼？',
							clew2: '咨询的用户较多，这边备注下您的姓名？方便后续沟通呢。',
							clew3: '简单记录下您的姓名？这样方便后续业务专家和您深入沟通呢。',
							num: 12,
							checked: true,
						}, {
							name: '姓名1-3',
							id: '3',
							clew1: '您这边怎么称呼？',
							clew2: '咨询的用户较多，这边备注下您的姓名？方便后续沟通呢。',
							clew3: '简单记录下您的姓名？这样方便后续业务专家和您深入沟通呢。',
							num: 11,
							checked: true,
						}],
						falseClewList: [{
							name: '姓名1-4',
							id: '4',
							clew1: '您这边怎么称呼？',
							clew2: '咨询的用户较多，这边备注下您的姓名？方便后续沟通呢。',
							clew3: '简单记录下您的姓名？这样方便后续业务专家和您深入沟通呢。',
							num: 11,
							checked: false,
						}, {
							name: '姓名1-5',
							id: '5',
							clew1: '您这边怎么称呼？',
							clew2: '咨询的用户较多，这边备注下您的姓名？方便后续沟通呢。',
							clew3: '简单记录下您的姓名？这样方便后续业务专家和您深入沟通呢。',
							num: 11,
							checked: false,
						}]
					},
					{
						name: '预约线索模板2',
						id: '2',
						trueClewList: [{
							name: '姓名2-1',
							id: '1',
							clew1: '您这边怎么称呼？',
							clew2: '咨询的用户较多，这边备注下您的姓名？方便后续沟通呢。',
							clew3: '简单记录下您的姓名？这样方便后续业务专家和您深入沟通呢。',
							num: 11,
							checked: true,
						}, {
							name: '姓名2-2',
							id: '2',
							clew1: '您这边怎么称呼？',
							clew2: '咨询的用户较多，这边备注下您的姓名？方便后续沟通呢。',
							clew3: '简单记录下您的姓名？这样方便后续业务专家和您深入沟通呢。',
							num: 11,
							checked: true,
						}, {
							name: '姓名2-3',
							id: '3',
							clew1: '您这边怎么称呼？',
							clew2: '咨询的用户较多，这边备注下您的姓名？方便后续沟通呢。',
							clew3: '简单记录下您的姓名？这样方便后续业务专家和您深入沟通呢。',
							num: 11,
							checked: true,
						}],
						falseClewList: [{
							name: '姓名2-4',
							id: '4',
							clew1: '您这边怎么称呼？',
							clew2: '咨询的用户较多，这边备注下您的姓名？方便后续沟通呢。',
							clew3: '简单记录下您的姓名？这样方便后续业务专家和您深入沟通呢。',
							num: 11,
							checked: false,
						}, {
							name: '姓名2-5',
							id: '5',
							clew1: '您这边怎么称呼？',
							clew2: '咨询的用户较多，这边备注下您的姓名？方便后续沟通呢。',
							clew3: '简单记录下您的姓名？这样方便后续业务专家和您深入沟通呢。',
							num: 11,
							checked: false,
						}]
					}
				],
				activeClewList: [{
					name: '姓名1-1',
					id: '1',
					clew1: '您这边怎么称呼？',
					clew2: '咨询的用户较多，这边备注下您的姓名？方便后续沟通呢。',
					clew3: '简单记录下您的姓名？这样方便后续业务专家和您深入沟通呢。',
					num: 1,
					checked: true,
				}, {
					name: '姓名1-2',
					id: '2',
					clew1: '您这边怎么称呼？',
					clew2: '咨询的用户较多，这边备注下您的姓名？方便后续沟通呢。',
					clew3: '简单记录下您的姓名？这样方便后续业务专家和您深入沟通呢。',
					num: 12,
					checked: true,
				}, {
					name: '姓名1-3',
					id: '3',
					clew1: '您这边怎么称呼？',
					clew2: '咨询的用户较多，这边备注下您的姓名？方便后续沟通呢。',
					clew3: '简单记录下您的姓名？这样方便后续业务专家和您深入沟通呢。',
					num: 11,
					checked: true,
				}],
				SilentTimeout:'',
				DidNotUnderstand:'',
				isSwitchArtificial: false,
				artificial:'',
				artificialList:[]
			};
		},
		created() {
			this.activeClewList = this.clewList[0].trueClewList
		},
		computed: {

		},
		methods: {
			getchangetableData(index1, index2, index, data) { //上下移动
				let temp1 = data[index1]
				let temp2 = data[index2]
				this.$set(this.clewList[index].trueClewList, index1, temp2)
				this.$set(this.clewList[index].trueClewList, index2, temp1)
			},
			changeEffect(type, checked, index, row, datatrue, datafalse) {
				if (type == 'del') {
					row.checked = false
					datatrue.splice(index, 1)
					datafalse.unshift(row)
				} else if (type == 'add') {
					row.checked = true
					datafalse.splice(index, 1)
					datatrue.push(row)
				}
			},
			handle(type,id) {
				if (type == 'add') {
					this.isConfigurationOfTheServiceAdd = true
					this.Addoption = {
						isConfigurationOfTheServiceAdd:true
					}
				}
				if (type == 'update') {
					this.isConfigurationOfTheServiceAdd = true
					this.Addoption = {
						isConfigurationOfTheServiceAdd:true,
						id:id
					}
				}
				if (type == 'del') {
					alert("删除")
				}
				
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			cancle() {
				this.isConfigurationOfTheServiceAdd = false
			},
			addArtificialList() {
				if (this.artificialList.indexOf(this.artificial) == -1) {
					this.artificialList.push(this.artificial)
				} else {
					this.$notify({
						type: 'warning',
						message: "重复"
					});
				}
			
			},
			delArtificialItem(index) {
				this.artificialList.splice(index, 1)
			}
		}


	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
