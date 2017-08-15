const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = {
  devtool: 'eval',
  entry: {
    'app': [
      'react-hot-loader/patch',
      './index'
    ]
  },
  output: {
    path: path.join(__dirname, '/static/'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    // match the output path
    historyApiFallback: true,
    publicPath: '/static/'
    // match the output `publicPath`
  },
  context: path.join(__dirname, 'src'),
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ]
      }, {
        test: /\.sass$/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader'
      }, {
        test: /\.(png|jpe?g|svg)$/,
        // include: [path.join(__dirname, 'src/img'), path.join(__dirname, 'src/components/Chat')],
        loader: 'file-loader?name=public/[name].[ext]'
      }, {
        test: /\.(ttf|eot|svg|woff(2)?)$/,
        include: [path.join(__dirname, 'src/assets/fonts')],
        loader: 'file-loader?name=public/[name].[ext]'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('./main.css'),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   beautify: false,
    //   comments: true,
    //   minimize: true,
    //   compress: {
    //       sequences     : true,
    //       booleans      : true,
    //       loops         : true,
    //       unused      : true,
    //       warnings    : false,
    //       drop_console: true,
    //       unsafe      : true
    //   }
    // }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.min\.css$/,
      cssProcessorOptions: { discardComments: { removeAll: true } }
    }),
    new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
    })
  ],
  watch: true
};
