//webpack 是node写出来的  node的写法
let path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');//导入  在内存中自动生成 index 页面的插件
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
let uglifyjs = require('uglifyjs-webpack-plugin');

console.log(path.resolve('dist'))
module.exports = {
    optimization: {//优化项
        minimizer: [
            new uglifyjs({
                cache:true,
                parallel:true,
                sourceMap:true
            }),
            new optimizeCssAssetsWebpackPlugin()
        ]
    },
    devServer: {//开发服务器的配置
        port:9999,
        progress:true,
        contentBase:'./dist',
        compress:true
    },
    mode:'development',//模式 默认两种 production development
    entry:'./src/index.js',//入口
    output:{
        filename: "bundle.[hash:8].js",//打包后的文件名
        path:path.resolve(__dirname,'dist'),//路径必须是一个绝对路径  __dirname当前目录下产生一个目录
    },
    plugins:[//数组 放着所有的webpack插件
        new htmlWebpackPlugin({
            template: "./src/index.html",//源文件
            filename: "index.html",//生成的内存中首页的名称
            minify:{
                removeAttributeQuotes:true,
                collapseWhitespace:true
            },
            hash:true
        }),
        new MiniCssExtractPlugin({
            filename:'main.css'
        })
    ],
    module:{//模块
       //loader
        rules:[
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options: {//用babel-loader 需要吧es6-es5
                        presets:[
                            '@babel/preset-env'
                        ],
                        plugins:[
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose" : true }]
                        ]
                    }
                }
            },
            //规则 css-loader 解析 @import这种语法的
            //style-loader 他是把css插入到head的标签中
            //loader的特点 希望单一
            //loader的用法 字符串只用一个loader
            //多个loader需要[]
            //loader的顺序 默认从右向左执行 从下到上执行
            //loader还可以写成对象方式
            {
                //可以处理less文件
                test:/\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ]
            },
            {
                //可以处理less文件  sass   node-sass sass-loader
                // stylus stylus-loader
                test:/\.less$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',//@import 解析路径
                    'postcss-loader',
                    'less-loader'//把less->css
                ]
            }
        ]
    }
}
