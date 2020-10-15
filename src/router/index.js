import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: "hash",
  routes: [


    { path: '/', redirect: '/login' },
    {
      path: '/home',
      name: '养老通后台管理',
      component: () => import('@/views/Home')
    },


    //账号相关
    {
      path: '/login',
      name: '登录',
      component: () => import('@/views/account/login.vue'),
      meta: {notrequireAuth:true}
    },
    {
      path: '/register',
      name: '注册',
      component: () => import('@/views/account/register'),
      meta: { keepAlive: true ,notrequireAuth:true}
    },
    {
      path: '/boundPhone',
      name: '绑定手机号',
      component: () => import('@/views/account/boundPhone'),
	   meta: { nobindStatus:true}
    },
    {
      path: '/boundWexin',
      name: '绑定微信号',
      component: () => import('@/views/account/boundWexin'),
	  meta: { nobindStatus:true}
    },

    {
      path: '/forgetPassword',
      name: '忘记密码',
      component: () => import('@/views/account/forgetPassword'),
	  meta: {notrequireAuth:true}
    },
    {
      path: '/changePassword',
      name: '修改密码',
      component: () => import('@/views/account/changePassword')
    },
    {
      path: '/changePhone',
      name: '更换手机号',
      component: () => import('@/views/account/changePhone')
    },
    {
      path: '/userAgreement',
      name: '用户协议',
      component: () => import('@/views/account/userAgreement')
    },

    {
      path: '/YLTuserAgreement',
      name: '"养老通"软件使用及服务协议',
      component: () => import('@/views/account/YLTuserAgreement')
    },

    {
      path: '/privacyPolicy',
      name: '个人信息保护及隐私政策',
      component: () => import('@/views/account/privacyPolicy')
    },
    {
      path: '/myAccount',
      name: '我的账号',
      component: () => import('@/views/account/myAccount')
    },


    //组织
    //机构信息
    {
      path: '/organizationInfo',
      name: '机构信息',
      component: () => import('@/views/organization/organizationInfo')
    },
    //机构认证
    {
      path: '/organizationAuthentication',
      name: '机构认证',
      component: () => import('@/views/organization/organizationAuthentication')
    },
    //机构动态
    {
      path: '/organizationTrends',
      name: '机构动态',
      component: () => import('@/views/organization/organizationTrends')
    },
    //更多机构动态
    {
      path: '/organizationTrendsMore',
      name: '机构动态',
      component: () => import('@/views/organization/organizationTrendsMore')
    },

    //新增机构动态
    {
      path: '/organizationTrendsAdd',
      name: '机构动态',
      component: () => import('@/views/organization/organizationTrendsAdd')
    },
    //机构推广
    {
      path: '/organizationExtension',
      name: '机构推广',
      component: () => import('@/views/organization/organizationExtension')
    },
    //文章
    {
      path: '/article',
      name: ' ',
      component: () => import('@/views/organization/article')
    },
    //评价管理
    {
      path: '/evaluationManagement',
      name: '评价管理',
      component: () => import('@/views/organization/evaluationManagement')
    },
    //预约管理
    {
      path: '/bookingManageMent',
      name: '预约管理',
      component: () => import('@/views/organization/bookingManageMent')
    },
    //报错处理
    {
      path: '/errorHandle',
      name: '报错处理',
      component: () => import('@/views/organization/errorHandle')
    },
	//报错处理详情
	{
	  path: '/errorHandledetails',
	  name: '报错处理详情',
	  component: () => import('@/views/organization/errorHandledetails')
	},
    //公益管理
    {
      path: '/publicWelfareManagement',
      name: '公益管理',
      component: () => import('@/views/organization/publicWelfareManagement')
    },
    //更多公益管理
    {
      path: '/publicWelfareManagementMore',
      name: '公益管理',
      component: () => import('@/views/organization/publicWelfareManagementMore')
    },

    //新增公益管理
    {
      path: '/publicWelfareManagementAdd',
      name: '公益管理',
      component: () => import('@/views/organization/publicWelfareManagementAdd')
    },

    //操作纪录
    {
      path: '/operationRecord',
      name: '操作纪录',
      component: () => import('@/views/organization/operationRecord')
    },
    //客服配置
    {
      path: '/configurationOfTheService',
      name: '客服配置',
      component: () => import('@/views/organization/configurationOfTheService')
    },
    //平台通知
    {
      path: '/platformNotification',
      name: '平台通知',
      component: () => import('@/views/organization/platformNotification')
    },

  ],

  scrollBehavior(to, from, a) {


	var flag = true;
    if(to.path=="/boundPhone" || from.path=="/boundPhone" || to.path=="/boundWexin"|| from.path=="/boundWexin"|| to.path=="/login"|| from.path=="/login" || to.path=="/register"|| from.path=="/register" || to.path=="/privacyPolicy"|| from.path=="/privacyPolicy"){
      flag =false
    }

    if (window.localStorage.getItem('bindStatus')&&flag) {
      var bindStatus = JSON.parse(window.localStorage.getItem('bindStatus')).value
      if (bindStatus == "0") {
        this.push({
          path: '/boundPhone'
        })
      } else if (bindStatus == "1") {

      } else if (bindStatus == "2") {
        this.push({
          path: '/boundPhone'
        })
      } else if (bindStatus == "3") {
        this.push('/boundWexin')
      }
    }
  }

})