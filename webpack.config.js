//import path from 'path'
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ['babel-polyfill', './src/js/index.js'], 
  output: 
  {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js' 
  },
  //mode: 'development',
  devServer: 
  {
    contentBase: './dist'  // webpack serving file
   },  
   // automatic reload and bundle
   plugins: 
   [
     new HtmlWebpackPlugin({
       filename: 'index.html',  // copy index.html to the dist index.html
       template: './src/index.html'
     })
   ],
   module: 
   {
     rules: [
       {
         test: /\.js$/, // look for all js files
         exclude: /node_modules/,
         use: {
           loader: 'babel-loader'
         }
        }
     ]
   }
}