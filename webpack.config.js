var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'app/assets/javascripts');
var APP_DIR = path.resolve(__dirname, 'app/assets/jsx');

function buildConfig(env) {
  return {
    entry: APP_DIR + '/app.jsx',
    output: {
      path: BUILD_DIR,
      filename: 'react-dev.js'
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module : {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          include: APP_DIR,
          query: {
            presets: ['es2015', 'react']
          }
        },
        {
          test: /\.json$/,
          loader: 'json'
        }
      ]
    }
  }
}

var env = process.env.NODE_ENV;
module.exports = buildConfig(env);