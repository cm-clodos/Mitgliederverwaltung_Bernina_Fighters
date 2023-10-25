const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    //server: defineServerConfiguration(),
    proxy: process.env.VUE_APP_API_URI,
  },
})
