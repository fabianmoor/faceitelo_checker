const path = require('path');

module.exports = {
  entry: './renderer.js', // Replace 'renderer.js' with the name of your renderer process entry file
  output: {
    path: path.resolve(__dirname, 'dist'), // Replace 'dist' with the desired output directory
    filename: 'bundle.js' // Replace 'bundle.js' with the desired output file name
  }
};
