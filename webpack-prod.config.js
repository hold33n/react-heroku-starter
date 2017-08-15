const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, '/static/'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            require.resolve('babel-preset-es2015'),
            require.resolve('babel-preset-react'),
            require.resolve('babel-preset-stage-0')
          ]
        }
      }, {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: "css-loader!postcss-loader!sass-loader"})
      }, {
        test: /\.(png|jpe?g|svg)$/,
        // include: [path.join(__dirname, 'src/img')],
        loader: 'file-loader?name=public/[name].[ext]'
      }, {
        test: /\.(ttf|eot|svg|woff(2)?)$/,
        include: [path.join(__dirname, 'src/assets/fonts')],
        loader: 'file-loader?name=public/[name].[ext]'
      }

    ]
  },
  plugins: [
    new webpack.DefinePlugin({ // <-- key to reducing React's size
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        sequences: true,
        booleans: true,
        loops: true,
        unused: true,
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {discardComments: {removeAll: true}}
    }),
    new ExtractTextPlugin('./main.css'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(js|html|css)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
};
