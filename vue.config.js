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
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 240000
      }
    },
    performance: {
      maxEntrypointSize: 1512000,
      maxAssetSize: 512000
    }
  }

}
