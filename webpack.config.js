const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        home: './src/home.js',
        search: './src/search.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devServer: {
        static: './dist',
        watchFiles: ['src/*'],
        port: 8081,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'App',
            template: './src/index.html',
            inject: 'head',
        })
    ],
    watch: true,
    module: {
        rules: [{
            test: /\.css$/i,
            use: [
                'style-loader',
                'css-loader',
            ],
        }],
    },
};