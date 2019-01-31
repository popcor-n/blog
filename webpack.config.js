var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: __dirname + '/dist',
    filename: 'app.bundle.js'
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
  })],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
           loader: "style-loader" // 将 JS 字符串生成为 style 节点
          },
          {
           loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
          },
          {
           loader: "sass-loader" // 将 Sass 编译成 CSS
          }
         ]
      },
      {
        test: /\.(htm|html)$/i,
         use:[ 'html-withimg-loader'] 
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                publicPath: "./images/",
                outputPath: "images/"
              }
            }
          ]    
      },
      {
        test: /\.(html)$/,
        use: {
            loader: 'html-loader',
            options: {
                attrs: ['img:src', 'img:data-src', 'audio:src'],
                minimize: true
            }
        }
      }

    ]
  },
  devServer:{
      open:true
  }
};
