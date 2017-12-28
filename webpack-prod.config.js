const path = require('path')
const resolve = require('path').resolve
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  entry: [
    'babel-polyfill',
    './src/index'
  ],
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
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'react-hot-loader/webpack!awesome-typescript-loader',
      }, {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader'})
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
    new FaviconsWebpackPlugin({
      // Your source logo
      logo: './src/assets/favicon/favicon.svg',
      // The prefix for all image files (might be a folder or a name)
      prefix: 'favicon/',
      // Emit all stats of the generated icons
      emitStats: true,
      // The name of the json containing all favicon information
      statsFilename: 'iconstats.json',
      // Generate a cache file with control hashes and
      // don't rebuild the favicons until those hashes change
      persistentCache: false,
      // Inject the html into the html-webpack-plugin
      inject: true,
      // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
      background: '#bca460',
      // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
      title: 'Lanp co',

      // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: true,
        yandex: true,
        windows: true
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //     beautify: false,
    //     comments: false,
    //     compress: {
    //         sequences     : true,
    //         booleans      : true,
    //         loops         : true,
    //         unused      : true,
    //         warnings    : false,
    //         drop_console: true,
    //         unsafe      : true
    //     }
    // }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: { discardComments: { removeAll: true } }
    }),
    new ExtractTextPlugin('./main.css'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|html|css)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
};
