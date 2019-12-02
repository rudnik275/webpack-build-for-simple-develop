const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  mode: 'development',
  
  entry: './src/app.js',
  
  output: {
    filename: 'js/index.js',
    path: path.resolve(__dirname, 'dist')
  },
  
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }],
        publicPath: './css'
      })
    }]
  },
  
  plugins: [
    new CleanWebpackPlugin(),
    
    new ExtractTextPlugin('css/index.css'),
    
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true
    })
  ],
  
  devServer: {
    contentBase: './dist',
    open: true,
    clientLogLevel: 'silent'
  },
  
  devtool: 'source-map'
}
