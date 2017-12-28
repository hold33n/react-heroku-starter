const path = require('path')
const resolve = require('path').resolve
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')


module.exports = {
  devtool: 'inline-source-map',
  entry: {
    'app': [
      'babel-polyfill',
      'react-hot-loader/patch',
      './index.tsx'
    ]
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.json', '.scss', '.css'],
    modules: ['node_modules'],
    alias: {
      '_ducks': resolve(__dirname, 'src/ducks/*'),
      '_pages': resolve(__dirname, 'src/view/pages'),
      '_decorators': resolve(__dirname, 'src/view/decorators'),
      '_components': resolve(__dirname, 'src/view/components'),
      '_sections': resolve(__dirname, 'src/view/sections'),
    }
  },
  devServer: {
    hot: true,
    inline: true,
    contentBase: path.join(__dirname, 'public'),
    // match the output path
    historyApiFallback: true,
    publicPath: '/dist/'
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
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'react-hot-loader/webpack!awesome-typescript-loader',
      }, {
        test: /\.sass$/,
        loader: 'style-loader!css-loader!sass-loader'
      }, {
        test: /\.(png|jpe?g|svg)$/,
        // include: [path.join(__dirname, 'src/img'), path.join(__dirname, 'src/view/Chat')],
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
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  watch: true
}
