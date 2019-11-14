const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const local = 'http://localhost:8080';

module.exports = {
  entry: './src/main/front/index.js',
  output: {
    path: path.resolve(__dirname, 'src/main/resources/static'),
    filename: 'min.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(eot|woff|woff2|ttf|ico|svg)([\?]?.*)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpg|svg|ico|gif)/,
        use: ['file-loader?name=[name].[ext]']
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(c|le)ss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true
            }
          }
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true,
    port: 3000,
    proxy: {
      '/api': {
        target: local,
        changeOrigin: true,
        secure: false
      }
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: 'src/main/front/index.html'
    })
  ]
};