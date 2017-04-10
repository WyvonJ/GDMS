'use strict'

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
  //app的入口，如果传入数组则全部执行
  entry: './src/main.js',
  //包含输出Bundle的选项
  output: {
    //绝对路径的输出目录
    path: path.resolve(__dirname, './dist'),
    //按需载入或如图片文件的外部资源的访问路径
    publicPath: '/dist/',
    //输出的Bundle文件名，对于每个entry有对应的静态名
    filename: 'build.js'
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  //模块配置
  module: {
    //一条规则分为条件，结果和嵌套规则
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        preserveWhitespace: false,
        postcss: [
          require('autoprefixer')({
            browsers: ['last 3 versions']
          })
        ],
        loaders: {
          sass: ExtractTextPlugin.extract({
            loader: 'css!sass!',
            fallbackLoader: 'vue-style-loader'
          })
        }
      }
    }, {
      //解析ES6的语法
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      //loader:'vue-style-loader!css-loader',
      use: [{
        loader: "vue-style-loader"
      }, {
        loader: "css-loader"
      }]
    }, {
      test: /\.less$/,
      //loader:'vue-style-loader!css-loader!less-loader'
      use: [{
        loader: "vue-style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "less-loader"
      }]
    }, {
      test: /\.scss$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "sass-loader"
      }]
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]?[hash]'
      }
    }]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new CopyWebpackPlugin([
      { from: './src/assets/img', to: './' }
    ])
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      components: path.join(__dirname, './src/components'),
      'muse-components': 'muse-ui/src'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}

process.traceDeprecation = true
