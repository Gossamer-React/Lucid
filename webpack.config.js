const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/devtools.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'webpack-bundle.js',
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|__tests__)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/react', ['@babel/env', { modules: false }]]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]_[local]_[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                autoprefixer({
                  browsers: ['last 2 versions']
                })
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'devtools.html',
      template: 'devtools.html',
      chunksSortMode: 'dependency',
      inject: 'body'
    })
  ],
  optimization: {
    minimizer: [new TerserPlugin()],
    nodeEnv: 'production'
  }
}
