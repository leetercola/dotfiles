/* global module, __dirname */
const Webpack = require('webpack')
const path = require('path')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const autoprefixer = require('autoprefixer')

require('file-loader')

const IS_DEV = process.env.NODE_ENV === 'development'

const plugins = [
  new Webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': IS_DEV ? '"development"' : '"production"'
    }
  }),
  new ImageminPlugin({
    disable: true, // change to false if you want to compress images even while webpack is in debug mode
    pngquant: {
      quality: '75-90'
    },
    gifsicle: {
      optimizationLevel: 1
    },
    svgo: {},
    plugins: [] // add imagemin-mozjpeg plugin once https://github.com/sindresorhus/execa/issues/61 is available...and prob switch to image-webpack-loader
  }),
  new Webpack.LoaderOptionsPlugin({
    options: {
      postcss: [ autoprefixer ]
    }
  })
]

if (IS_DEV) {
  plugins.push(
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NamedModulesPlugin()
  )
} else {
  plugins.push(
    new Webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new Webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false
      }
    })
  )
}

module.exports = {
  devtool: IS_DEV ? 'inline-source-map' : 'nosources-source-map',
  entry: {
    // 'snitch': './src/cart/common/snitch.js',
    'cart-l': './src/cart/large-view/cart.js',
    'cart-s': './src/cart/small-view/cart.js',
    'cart': './src/next/cart.js',
    'qa-tool': './src/qa-tool/qa-tool.js',
  },
  output: {
    path: path.join(__dirname, 'bin'),
    filename: '[name].bundle.js',
    chunkFilename: '[chunkhash].js'
  },
  plugins,
  externals: {
    'backbone': 'Backbone',
    'eventmanager': 'EventManager',
    'jquery': 'jQuery',
    'dust': 'dust',
    'lodash': '_',
    'underscore': '_',
    'bluebird': 'P',
    'jquery.colorbox': 'jQuery',
    'jquery.cookie': 'jQuery',
    'sinon': 'sinon'
  },
  resolve: {
    alias: {
      'dust.core$': require.resolve('dustjs-linkedin/dist/dust-core.js'),
      'backbone.marionette$': require.resolve('sc-libraries/javascript/backbone/backbone.bby-marionette.js'),
      'marionette$': require.resolve('sc-libraries/javascript/backbone/backbone.bby-marionette.js'),
      'stickit$': require.resolve('sc-libraries/javascript/backbone/backbone.stickit.js'),
      'cookieManager$': require.resolve('sc-libraries/javascript/cookieManager.js'),
      'pikaday$': require.resolve('sc-libraries/javascript/pikaday.js'),
      'moment$': require.resolve('sc-libraries/javascript/moment.js'),
      'moment-timezone$': require.resolve('sc-libraries/javascript/moment-timezone.js'),
      'backbone._marionette$': require.resolve('sc-libraries/javascript/backbone/backbone.marionette'),
      'backbone.radio$': require.resolve('sc-libraries/javascript/backbone/backbone.radio'),
      'backbone.babysitter$': require.resolve('sc-libraries/javascript/backbone/backbone.babysitter'),
      'backbone.marionette-dust$': require.resolve('sc-libraries/javascript/backbone/backbone.marionette-dust'),
      'backbone.marionette-toJSON$': require.resolve('sc-libraries/javascript/backbone/backbone.marionette-toJSON')
    },
    modules: [
      'src',
      'src/next',
      'node_modules'
    ],
    extensions: ['.json', '.js', '.jsx', '.dust']
  },
  module: {
    noParse: [
      /sinon\//
    ],
    rules: [
      {
        test: /\.less$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /bootstrap\/js\//,
        loader: 'imports?jQuery=jquery'
      }, {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      }, {
        test: /\.dust$/,
        loader: 'bby-dust-loader'
      }, {
        test: /\.(jpe?g|png|gif|svg)/,
        loader: 'url-loader',
        query: {
          hash: 'sha512',
          digest: 'hex',
          name: '[name]-[hash].[ext]',
          limit: 32000
        }
      }
    ]
  }
}
