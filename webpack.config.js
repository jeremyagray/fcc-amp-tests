'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  'devServer': {
    'contentBase': './dist',
    'headers': {
      'Access-Control-Allow-Origin': '*'
    }
  },
  'entry': './src/index.js',
  'module': {
    'rules': [
      {
        'test': /\.css$/,
        'use': [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  'output': {
    'filename': 'main.js',
    'path': path.resolve(__dirname, 'dist'),
  },
  'plugins': [
    // fix "process is not defined" error:
    // (do "npm install process" before running the build)
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
  ],
  'resolve': {
    'fallback': {
      'Buffer': require.resolve('buffer/'),
      'stream': require.resolve('stream-browserify/'),
      'url': require.resolve('url/'),
      'util': require.resolve('util/')
    }
  }
};
