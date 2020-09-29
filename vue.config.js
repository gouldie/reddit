module.exports = {
  devServer: {
    port: 3000,
    proxy: 'http://localhost:8080'
  },
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Reddit Clone'
    }
  },
  transpileDependencies: [
    'vuetify'
  ],
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
