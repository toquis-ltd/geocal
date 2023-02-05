const path = require('path');

module.exports = {
  entry: './src/index.js',
  watch: true,
  mode: "development",
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          { loader: "style-loader", options: { injectType: "styleTag" }},
          "css-loader",
        ],
      },
    ],
  },
};