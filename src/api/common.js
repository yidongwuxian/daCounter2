import axios from 'axios'
import request from '@/router/axios'

export function putObject(data) {//上传文件
  return request({
    url: '/organization/fileOperation/putObject?type=2',
	headers: {
	  'content-type': 'multipart/form-data'
	},
    method: 'post',
	data: data
  })
}
export function amapAreaList(data) {//amapAreaList
  return axios({
    url: '/ws/district/v1/list',
    method: 'get',
	params: {
		'key':'PHKBZ-LIVCD-RR34Q-HMILJ-BQS7J-XYB4L'
	}
  })
}

export function amapSuggestion(data) {//amapSuggestion
	return axios({
		url: '/place/v2/suggestion',
		method: 'get',
		params: {
			'query': data.query,
			'location': data.location,
			'region': '全国',
			'output': 'json',
			'ak': 'h1zx8Q7NoYlD1cD8oeRDkSOGYSLCxsG9'
		}
	})
}

export function amapDetail(data) {//amapDetail
	return axios({
		url: '/place/v2/detail',
		method: 'get',
		params: {
			'uid': data.uid,
			'scope': 2,
			'output': 'json',
			'ak': 'h1zx8Q7NoYlD1cD8oeRDkSOGYSLCxsG9'
		}
	})
}

export function amapReverse_geocoding(data) {//amapReverse_geocoding
	return axios({
		url: 'baidu/reverse_geocoding/v3',
		method: 'get',
		params: {
			'location': data.location,
			'output': 'json',
			'ak': 'h1zx8Q7NoYlD1cD8oeRDkSOGYSLCxsG9'
		}
	})
}
