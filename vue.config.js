
const webpack = require('webpack')

const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir);
}
// var baseUrl = "http://118.24.57.72/";
// var baseUrl = "http://192.168.253.1:8004/";
// var baseUrl = "http://192.168.137.169:8004/";


var baseUrl = "http://101.201.66.82:8002";
// var baseUrl = "http://10.1.245.121:8002";
// var baseUrl = "http://192.168.137.1:8002";

module.exports = {
    publicPath: './',
    devServer: {
        disableHostCheck: true,
        port: 80,
        proxy: {
            "/api": {
                target:baseUrl, // 后端接口地址
                changeOrigin: true, // 是否允许跨越
                // secure: false,
                pathRewrite: {
                    "^/api": "/" // 重写,
                }
            },
            "/organization": {
                target: baseUrl,
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    "^/organization": "/organization"
                }
            },
			"/user": {
			    target: baseUrl,
			    changeOrigin: true,
			    secure: false,
			    pathRewrite: {
			        "^/user": "/user"
			    }
			},
            "/v3": {
                target: "https://restapi.amap.com",
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    "^/v3": "/v3"
                }
            },
            "/cgi-bin": {
                target: "https://api.weixin.qq.com/",
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    "^/cgi-bin": "/cgi-bin"
                }
            },
			"/ws": {
			    target: "https://apis.map.qq.com/",
			    changeOrigin: true,
			    secure: false,
			},

            "/baiduAI": {
			    target: "https://aip.baidubce.com",
			    changeOrigin: true,
                secure: false,
                pathRewrite: {
                    "^/baiduAI": "/"
                }
            },

            "/rest": {
			    target: "https://aip.baidubce.com",
			    changeOrigin: true,
                // secure: false,
                pathRewrite: {
                    "^/rest": "/rest"
                }
            },
			"/place/v2": {
			    target: "http://api.map.baidu.com/place/v2",
			    changeOrigin: true,
			    secure: false,
			},


        },
    },

    lintOnSave: false,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({
                        rootValue: 40, // 换算的基数
                        selectorBlackList: ['weui', 'mu', 'van-','el-','icon'], // 忽略转换正则匹配项
                        propList: ['*'],
                    }),
                ]
            }
        }
    },

    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@assets', resolve('src/assets'))
    },
    configureWebpack: {
        entry: {
            app: './src/main.js'
        },
        externals: {
            "BMap": "BMap",
            'BMapLib': 'BMapLib'
        },
    }


}