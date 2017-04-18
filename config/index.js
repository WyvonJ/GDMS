'use strict'

const path = require('path')
const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/',
    productionSourceMap: true,
  },
  dev: {
    env: require('./dev.env'),
    port: process.env.DEV_PORT || 8080,
    autoOpenBrowser: true,
    ssetsSubDirectory: 'assets',
    assetsPublicPath: '/'
  },
  cssSourceMap: false
}
