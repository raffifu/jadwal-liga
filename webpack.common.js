const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        }]
    },
    plugins: [
        new HtmlPlugin({
            template: "./src/template.html",
            filename: "index.html"
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "./src/img/", to: "img/" },
                { from: "./src/pages/", to: "pages/" },
                { from: "./src/service-worker.js", to: "sw.js" },
                { from: "./src/manifest.json", to: "manifest.json" }
            ]
        })
    ]
}