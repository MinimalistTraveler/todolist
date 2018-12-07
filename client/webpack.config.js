const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "JS/main_bundle.js",
    publicPath: "./"
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    contentBase: "/"
  },
  optimization: {
    minimizer: [
      new TerserPlugin({ parallel: true }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require("cssnano"),
        cssProcessorPluginOptions: {
          preset: ["default", { discardComments: { removeAll: true } }],
          canPrint: true
        }
      }),
      new CopyWebpackPlugin([
        {
          from: "./public/images",
          to: "./public/images/[name].[ext]"
        }
      ])
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "public/", "index.html"),
      minify: true
    }),
    new ExtractCssChunks({
      filename: "CSS/styles.css",
      hot: true,
      orderWarning: true,
      reloadAll: true,
      cssModules: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        enforce: "pre",
        use: [
          "babel-loader",
          {
            loader: "eslint-loader",
            options: {
              fix: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [ExtractCssChunks.loader, "css-loader", "postcss-loader"]
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|otf|eot|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "public/",
              publicPath: "../public"
            }
          }
        ]
      },
      {
        test: /\.styl$/,
        use: [
          ExtractCssChunks.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[name]__[local]___[hash:base64:5]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                require("autoprefixer")({
                  browsers: ["> 1%", "last 2 versions"]
                })
              ]
            }
          },
          "stylus-loader"
        ]
      },
      {
        test: /\.ttf$/,
        use: [
          {
            loader: "ttf-loader",
            options: {
              name: "[name].[ext]"
            }
          }
        ]
      }
    ]
  }
};
