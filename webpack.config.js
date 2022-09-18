const path = require("path");
// // dist에 popup.html 만들기 위함
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// // 특정 파일 내부 파일 복사 붙 -> public내 모든파일 복사하여 dist에 넣어준다
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");

// eval error -> sourcemap으로 방지

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: {
    popup: path.resolve("./src/popup/popup.tsx"),
    options: path.resolve("./src/options/options.tsx"),
    background: path.resolve("src/background/background.ts")
  },
  module: {
    rules: [
      { use: "ts-loader", test: /\.tsx$/, exclude: /node_modules/ },
      {
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ident: "postcss",
                plugins: [tailwindcss, autoprefixer]
              }
            }
          }
        ],
        test: /\.css$/
      },
      {
        type: "assets/resource",
        test: /\.(png|jpg|jpeg|gif|woff|woff2|tff|eot|svg)$/
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("src/static"),
          to: path.resolve("dist")
        }
      ]
    }),
    ...getHtmlPlugins(["popup", "options"])
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "[name].js"
  },
  // 같이쓰이는 dependencs는 중복 호출 안하게
  optimization: {
    splitChunks: {
      chunks: "all"
    }
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

function getHtmlPlugins(chunks) {
  return chunks.map(
    chunk =>
      new HtmlWebpackPlugin({
        title: "React Extension",
        filename: `${chunk}.html`,
        chunks: [chunk]
      })
  );
}
