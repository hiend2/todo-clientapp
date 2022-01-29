const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        bundle: ['@babel/polyfill', 'whatwg-fetch', './src/index.jsx'],
        style: './static/css/app.css'
    },
    output: {
        path: path.join(__dirname, '../wwwroot'),
        filename: '[name].js',
        publicPath: './'
    },
    devServer: {
        writeToDisk: true,
        contentBase: path.join(__dirname, '../wwwroot'),
        port: 8081,
        compress: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            fallback: 'file-loader',
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        },
                    },
                ]
            },
            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                include: [/src/, /tests/],
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    formatter: require('eslint/lib/cli-engine/formatters/stylish'),     // Fix eslint-loader issue with eslint 6.x (https://github.com/webpack-contrib/eslint-loader/issues/271)
                    emitWarning: false
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            verbose: false
        }),
        new CopyWebpackPlugin([
            { from: 'static/index.html', to: '../wwwroot/index.html' },
            { from: 'static/favicon.ico', to: '../wwwroot/favicon.ico' }
        ])
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    node: {
        fs: "empty"     // Resolve webpack issue - babel transform Module not found: Error: Can't resolve 'fs'
    }
};
