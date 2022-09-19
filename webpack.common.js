const path = require("path");
// // dist에 popup.html 만들기 위함
const CopyPlugin = require("copy-webpack-plugin");
// // 특정 파일 내부 파일 복사 붙 -> public내 모든파일 복사하여 dist에 넣어준다
const HtmlPlugin = require("html-webpack-plugin");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// eval error -> sourcemap으로 방지
module.exports = {
  entry: {
    popup: path.resolve("src/popup/index.tsx"),
    options: path.resolve("src/options/options.tsx"),
    background: path.resolve("src/background/background.ts"),
    contentScript: path.resolve("src/contentScript/contentScript.ts"),
    newTab: path.resolve("src/tabs/index.tsx")
  },
  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.tsx?$/,
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ident: "postcss",
                plugins: [tailwindcss, autoprefixer]
              }
            }
          }
        ]
      },
      {
        type: "assets/resource",
        test: /\.(png|jpg|jpeg|gif|woff|woff2|tff|eot|svg)$/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("src/static"),
          to: path.resolve("dist")
        }
      ]
    }),
    ...getHtmlPlugins(["popup", "options", "newTab"])
  ],
  resolve: {
    extensions: [".tsx", ".js", ".ts"]
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist")
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
};

function getHtmlPlugins(chunks) {
  return chunks.map(
    chunk =>
      new HtmlPlugin({
        title: "React Extension",
        filename: `${chunk}.html`,
        chunks: [chunk]
      })
  );
}
