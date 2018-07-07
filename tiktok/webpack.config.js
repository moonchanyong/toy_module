var path = require('path');
const pkg = require("./package.json");

module.exports = {
  entry: './src/TikTok.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: [pkg.namespace.cy, "Tiktok"],
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  // module: {
  //   rules: [{
  //     test: /\.css$/,
  //     // use: ['style-loader', 'css-loader']
  //     use: ExtractTextPlugin.extract({
  //       fallback: "style-loader",
  //       use: "css-loader"
  //     })
  //   }]
  // },
  plugins: [
  ]
}
