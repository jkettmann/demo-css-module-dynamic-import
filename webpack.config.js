const path = require('path')
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const FlushCssChunksPlugin = require('flush-css-chunks-webpack-plugin')

const extractCssChunks = new ExtractCssChunksPlugin({
  filename: '[name].bundle.css',
  ignoreOrder: true
})

module.exports = {
  entry: {
    main: './src/app.js'
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: ''
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: extractCssChunks.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]--[hash:base64:5]'
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    extractCssChunks,
    new FlushCssChunksPlugin({ entryOnly: true }),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin()
  ]
}
