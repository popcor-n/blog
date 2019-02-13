var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:  {home: './src/home/index.js',
    about: './src/about/index.js'},
    output: {
      path: __dirname + '/dist',
      filename: '[name].js'
    },
    plugins: [new HtmlWebpackPlugin({
      filename: 'home/home.html',
      template: './src/home/index.html',
      inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true
        },
        chunks:['home']
      
    }),
    new HtmlWebpackPlugin({
      filename: 'about/about.html',
      template: './src/about/index.html',
      inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true
        },
        chunks:['about']
     
    })
    ],
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
                      outputPath: "about/images/",
                      outputPath:"home/images/"
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
            },
          
          ]
        },
        devServer:{
            
            open:true
}}
