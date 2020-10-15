import axios from 'axios'
import request from '@/router/axios'

export function getOrganizationPopularize() {//获取机构推广信息
  return request({
    url: '/organization/organizationPopularize/getOrganizationPopularize',
    method: 'post',
  })
}

export function updateOrganizationPopularizeById(data) {//机构推广编辑
  return request({
    url: '/organization/organizationPopularize/updateOrganizationPopularizeById',
    method: 'post',
	data: data
  })
}

export function infoFeedbackSelectById(data) {//报错
  return request({
    url: '/organization/infoFeedback/selectById/'+data,
    method: 'get',
  })
}
