module.exports = {
    publicPath: "/",
    devServer: {
        proxy: {
            "^/api": {
                target: "https://hbookstore.herokuapp.com/",
                ws: true,
                changeOrigin: true,
                logLevel: "debug"
            },
        },
    }
}