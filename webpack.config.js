const path = require("path");

module.exports = {
  entry: `./src/assets/js/main.js`,
  mode: "development",
  output: {
    path: path.join(__dirname, "dist/assets/js"),
    filename: "bundle.js"
  }
};
