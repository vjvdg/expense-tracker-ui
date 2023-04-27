const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  devServer: {
    port: 3000,
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "blog.js",
    clean: true,
    publicPath: '/'
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/i,
        include: path.resolve(__dirname, 'src/styles'),
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        include: path.resolve(__dirname, 'src/assets'),
        use: ["file-loader"],
      }
    ],
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "public", to: path.join(__dirname, "/dist"), globOptions: { ignore: [ "**/index.html" ] } },
        { from: "icons", to: path.join(__dirname, "/dist/icons") }
      ],
    }),
  ],
};