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
  ]
}
