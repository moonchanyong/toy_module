var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'delta.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  devtool: 'eval-source-map',
  plugins: [
  ]
}
