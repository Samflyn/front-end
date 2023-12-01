const path = require('path'); //importing in nodejs

const cleanPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './app.js', //starting script
  output: {
    filename: '[contenthash].js', //hash file names, for production. As browser caches js and css
    path: path.resolve(__dirname, 'output'),
    publicPath: './output', //by default webpack looks at root dir for other files, to set the path
  },
  mode: 'development',
  //   devServer: {
  //     contentBase: "./",
  //   },
  devtool: 'cheap-eval-source-map', //for debugging options look at sourcemaps in webpack
  plugin: [new cleanPlugin.cleanWebpackPlugin()],
};
