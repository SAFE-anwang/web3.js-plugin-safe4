const webpack = require('webpack');

module.exports = {
  entry: "./src/index.ts",
  mode: "production",
  output: {
    path: __dirname + "/dist",
    filename: 'safe4_plugin.min.js',
    library: 'Safe4Plugin',
    libraryExport: 'default',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  module: {
    rules: [
      {test: /\.ts$/, use: {loader: "ts-loader", options: {transpileOnly: true}}}
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      fs: false,
      net: false,
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('readable-stream'),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};