<template>
	<div class="container">

		<el-dialog title="编辑问答对" :visible.sync="dialogTableVisible" @close='cancle()'>
			<el-form :model="form" :rules="rules" ref="form" label-width="120px" @submit.native.prevent>
				<el-form-item label="标准问题" prop="question">
					<el-input v-model="form.question" placeholder=""></el-input>
				</el-form-item>
				<el-form-item label="拓展问">
					<el-input v-model="form.expandQ" placeholder="" @keyup.enter.native="addExpandQList"></el-input>
				</el-form-item>
				<el-form-item label="" v-if="form.expandQList.length>0">
					<van-row type="flex" justify="space-between" align="center" class="pR16 pL16 el-delList" v-for='(item,index) in form.expandQList'
					 :key='index'>
						<van-col>
							<div class="">{{item}}</div>
						</van-col>
						<van-col>
							<i class="iconfont icon-shanchu" @click='delExpandQItem(index)'></i>
							<!-- <van-button icon=" " type="default" size="small" class="text"></van-button> -->
						</van-col>
					</van-row>
				</el-form-item>

				<el-form-item label="答案" prop="answer">
					<el-input type="textarea" v-model="form.answer" placeholder=""></el-input>
				</el-form-item>
				<el-form-item label="继续追问线索" prop="askClues">
					<el-select v-model="form.askClues" placeholder="请选择">
						<el-option v-for="item in activeClewList" :key="item.name" :label="item.name" :value="item.id">
						</el-option>
						<el-option label="当前线索信息" value="all"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="追问话术" prop="askLingo" v-if="!(form.askClues=='all'||form.askClues=='')">
					<el-input type="textarea" v-model="form.askLingo" placeholder=""></el-input>
				</el-form-item>

			</el-form>
			<van-row type="flex" justify="center" class="pT20 pR16 pB20 pL16">
				<van-col class='mR20'>
					<van-button type="default" size="small" class="submit wP100" @click="submitForm('form')">保存</van-button>
				</van-col>
				<van-col class=''>
					<van-button type="default" size="small" class="cancle wP100" @click="cancle">取消</van-button>
				</van-col>
			</van-row>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: "configurationOfTheService",
		props: {
			option: {
				required: true
			},
		},
		data() {
			return {
				dialogTableVisible: this.option.isConfigurationOfTheServiceAdd,
				form: {
					question: '',
					answer: '',
					askClues: '',
					askLingo: '',
					expandQList: []
				},
				rules: {
					question: [{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					}],
					answer: [{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					}],
					askClues: [{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					}],
					askLingo: [{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					}],
				},
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


			};
		},
		created() {
			this.detail()
		},
		computed: {

		},
		methods: {
			detail() {
				if (this.option.id) {
					let data = {
						id: 1,
						question: '你们这边是正规机构吗？',
						answer: '我们是正规的营业机构，有相关行业执照和证件，还请您这边放心。',
						askClues: '手机',
						askLingo: '您方便说下短信号码？详细信息稍后通过系统自动给您转过去呢。',
						expandQList: []
					}
					this.form = data
					// TenantDetail({
					// 	'id': this.option.id
					// }).then(res => {
					// 	if (res.code == 20000) {
					// 		console.log(res.data)
					// 		this.form = res.data
					// 	}
					// })
				}
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$notify({
							type: 'success',
							message: "已提交"
						});
						this.dialogTableVisible = true
						this.$emit('cancle')
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			cancle() {
				this.dialogTableVisible = true
				this.$emit('cancle')
			},
			addExpandQList() {
				if (this.form.expandQList.indexOf(this.form.expandQ) == -1) {
					this.form.expandQList.push(this.form.expandQ)
				} else {
					this.$notify({
						type: 'warning',
						message: "拓展词重复"
					});
				}

			},
			delExpandQItem(index) {
				this.form.expandQList.splice(index, 1)
			}
		}


	};
</script>

<style>
</style>
