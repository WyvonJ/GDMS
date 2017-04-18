'use strict'

const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = _path => {
  //根据定义的模式选择assets目录
  const assetsSubDirectory = process.env.NODE_ENV === 'production' ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory
    //针对POSIX的实现
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = options => {
  options = options || {}
  const generateLoader = loaders => {
    const sourceLoader = loaders.map(loader => {
      let extraParamChar
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?')
        extraParamChar = '&'
      } else {
        loader = loader + '-loader'
        extraParamChar = '?'
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    }).join('!')
  }
  if (options.extract) {
    return ExtractTextPlugin.extract({
      use: sourceLoader,
      fallback: 'vue-style-loader'
    })
  } else {
    return ['vue-style-loader', sourceLoader].join('!')
  }
}

// http://vuejs.github.io/vue-loader/configurations/extract-css.html
return {
  css: generateLoaders(['css']),
  postcss: generateLoaders(['css']),
  less: generateLoaders(['css', 'less']),
  sass: generateLoaders(['css', 'sass?indentedSyntax']),
  scss: generateLoaders(['css', 'sass']),
  stylus: generateLoaders(['css', 'stylus']),
  styl: generateLoaders(['css', 'stylus'])
}
}

exports.styleLoaders = options => {
  const output = []
  const loaders = exports.cssLoaders(options)
  for (const extension of Object.keys(loaders)) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader: loader
    })
  }
  return output
}
