const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

// get file paths from authored css files
const filePaths = glob.sync('./src/*.css');
// get the filename from each path
const fileNames = filePaths.map(f => f.split('./src/').pop());
// build up an object setting keys to the filename, and values the file path
const files = Object.assign(
  ...fileNames.map((key, index) => ({ [key]: filePaths[index] }))
);

module.exports = {
  entry: files,

  output: {
    filename: '[name]',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1, url: false },
            },
            {
              loader: 'postcss-loader',
            },
          ],
        }),
      },
    ],
  },

  stats: {
    children: false,
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextWebpackPlugin({ filename: '[name]' }),
  ],
};
