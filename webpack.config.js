const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = [
  {
    name: 'server',
    target: 'node',
    externals: [nodeExternals()],
    entry: {
      index: './src/server/index.js',
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'server.bundle.js',
      libraryTarget: 'commonjs2',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
      ],
    },
  },
  {
    name: 'client',
    target: 'node',
    externals: [nodeExternals()],
    entry: {
      index: './src/client/index.js',
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'client.bundle.js',
      libraryTarget: 'commonjs2',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
      ],
    },
  },
];
