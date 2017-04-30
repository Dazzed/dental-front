// Important modules this config uses
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const extractVendorCSS = new ExtractTextPlugin('[name].lib.[hash].css');
const extractAppCSS = new ExtractTextPlugin('[name].[hash].css');

// PostCSS plugins
const assets = require('postcss-assets');
const cssnext = require('postcss-cssnext');
const postcssReporter = require('postcss-reporter');
const precss = require('precss');

module.exports = require('./webpack.base.babel')({
  // In production, we skip all hot-reloading stuff
  entry: [
    path.join(process.cwd(), 'app/app.js'),
  ],

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },

  babelQuery: {
    plugins: [ 'transform-decorators-legacy' ],
  },

  // We use ExtractTextPlugin so we get a seperate CSS file instead
  // of the CSS being in the JS and injected as a style tag
  cssLoaders: extractAppCSS.extract(
    'style-loader',
    'css-loader?modules&-autoprefixer&importLoaders=1!postcss-loader'
  ),

  vendorCssLoaders: extractVendorCSS.extract(
    'style-loader',
    'css-loader'
  ),

  // In production, we minify our CSS with cssnano
  postcssPlugins: [
    precss(),
    cssnext({
      browsers: [ 'last 2 versions', 'IE > 10' ],
    }),
    postcssReporter({
      clearMessages: true,
    }),
    assets({
      basePath: path.join(process.cwd(), 'app'),
      loadPaths: [
      ],
    }),
  ],
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      children: true,
      minChunks: 2,
      async: true,
    }),

    // OccurrenceOrderPlugin is needed for long-term caching to work properly.
    // See http://mxs.is/googmv
    new webpack.optimize.OccurrenceOrderPlugin(true),

    // Merge all duplicate modules
    new webpack.optimize.DedupePlugin(),

    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      inject: true,
    }),

    // Extract the CSS into a seperate file
    extractVendorCSS,
    extractAppCSS,
  ],
});
