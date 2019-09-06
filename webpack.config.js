const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  entry: path.join(__dirname, "examples/src/index.js"),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: './build',
    hot: true
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: "babel-loader",
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: ["style-loader", "css-loader"]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'select-component',
      template: path.join(__dirname, "examples/src/index.html"),
      filename:'./index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
}