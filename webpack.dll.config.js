const path = require('path');
const webpack = require('webpack');
const dllEnter = require('./config/dll-config.js');

// console.log( process.env.NODE_ENV );

module.exports = {
  entry: dllEnter,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'lib/[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dist/lib', '[name]-manifest.json'),
      name: '[name]_library'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
};