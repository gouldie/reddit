module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Reddit Clone'
    }
  },
  transpileDependencies: ['vuetify'],
  // chainWebpack: config => {
  //   config.module
  //     .rule('eslint')
  //     .use('eslint-loader')
  //     .options({
  //       fix: true,
  //     })
  // },
  configureWebpack: {
    performance: {
      hints: false
    }
  }
  // lintOnSave: true
}
