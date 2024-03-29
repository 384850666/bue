const path = require('path');

module.exports = {
    // 基本路径
    publicPath: '/',
    // 输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    pages: {
        index: {
            // page 的入口
            entry: 'src/modules/client/client.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '客户端入口',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        manage: {
            entry: 'src/modules/manage/manage.js',
            template: 'public/manage.html',
            filename: 'manage.html',
            title: '后台管理入口',
            chunks: ['chunk-vendors', 'chunk-common', 'manage']
        }
    },
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: () => {
    },
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            config.mode = 'production';
            config.externals = {
                'vue': 'Vue',
                'element-ui': 'ELEMENT'
            }
        } else {
            // 为开发环境修改配置...
            config.mode = 'development';
        }

        Object.assign(config, {
            // 开发生产共同配置
            resolve: {
                extensions: ['.js', '.vue', '.json'],
                alias: {
                    '@': path.resolve(__dirname, './src'),
                    '@c': path.resolve(__dirname, './src/components')
                }
                /*externals: {
                    'vue': 'Vue',
                    'element-ui': 'ELEMENT'
                }*/

            }
        });
    },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        // extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        /*proxy: 'https://easy-mock.com/mock/5cacb4a2d55c5f6c3b16ada9/allowance'*/
        proxy: {
            // 设置代理
            // proxy all requests starting with /api to jsonplaceholder
            '/api/v1': {
                target: 'https://easy-mock.com/mock/5cb838d699757c224ec96441/bue', //真实请求的目标地址
                changeOrigin: true,
                pathRewrite: {
                    '^/api/v1': ''   //重写接口
                }
            }
        },
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
    }
};