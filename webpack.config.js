const path = require("path");
// // dist에 popup.html 만들기 위함
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// // 특정 파일 내부 파일 복사 붙 -> public내 모든파일 복사하여 dist에 넣어준다
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// eval error -> sourcemap으로 방지

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: {
    popup: path.resolve("./src/popup/popup.tsx")
  },
  module: {
    rules: [
      { use: "ts-loader", test: /\.tsx$/, exclude: /node_modules/ },
      { use: ["style-loader", "css-loader"], test: /\.css$/ }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("src/assets/manifest.json"),
          to: path.resolve("dist")
        },
        { from: path.resolve("src/assets/icon.png"), to: path.resolve("dist") }
      ]
    }),
    new HtmlWebpackPlugin({
      title: "ReactJS BoilerPlate",
      filename: "popup.html",
      chunks: ["popup"]
    })
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "[name].js"
  }
  // entry: {
  //   popup: "./src/popup.jsx",
  //   newtab: "./src/newtab.jsx",
  //   content: "./src/content.js",
  //   background: "./src/content.js"
  // },
  // output: {
  //   path: path.resolve(__dirname, "dist"),
  //   filename: "[name].js"
  // },
  // module: {
  //   rules: [
  //     {
  //       test: /\.(js|jsx)$/,
  //       exclude: /node_modules/,
  //       // es6 사용
  //       type: "javascript/esm",
  //       use: {
  //         loader: "babel-loader",
  //         options: {
  //           presets: ["@babel/preset-env", "@babel/preset-react"]
  //         }
  //       }
  //     }
  //   ]
  // },
  // experiments: { topLevelAwait: true },
};
