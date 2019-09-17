const path = require('path');
const webpack = require('webpack');

const source = path.resolve(__dirname, 'src');
const public = path.resolve(__dirname, 'public');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: {
        'index': ['@babel/polyfill', './src/index.js'],
        'anotherPage': './src/anotherPage.js'
    },
    output: {
        filename: '[name].js',
        path: public,
        //publicPath: '/demo/'
    },
    devServer: {
        contentBase: './public',
        hot: true,
        host: 'localhost',
        port: 5000,
        compress: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            chunks: ['index'],
            //filename: path.join(public, 'index'),
            template: path.join(source, 'index.html')
        }),
        new HtmlWebpackPlugin({
            inject: true,
            chunks: ['anotherPage'],
            filename: path.join(public, 'anotherPage'),
            template: path.join(source, 'anotherPage.html')
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            }
        ]
    }
};

