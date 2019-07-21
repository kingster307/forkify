const   path                 = require('path'),
        htmlWebpackPlugin    = require('html-webpack-plugin');

module.exports = {
    entry: ["babel-polyfill", "./src/js/index.js"],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    // mode: 'development'

    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: "index.html",
            template: './src/index.html'
        })
    ],
    module: {
        rules: [
            {   //using regex
                //files that end in .js aka all JS files --> all JS files will use the babel loader
                test: /\.js$/,
                //we dont want babel to convert node_modules
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }

};