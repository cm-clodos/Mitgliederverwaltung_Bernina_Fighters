const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        //server: defineServerConfiguration(),
        //proxy: process.env.VUE_APP_API_URI,
        proxy: {
            // Allgemeine API-Proxy-Regel
            "^/": {
                target: process.env.VUE_APP_API_URI,
                changeOrigin: true,
                ws: false, // Deaktivieren von WebSocket-Proxys
            },
        },
    },
});
