const path = require('path');

module.exports = {
    entry: './plugin/src/js/electronic-pen.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'electronic-pen.bundle.js'
    },
    module: {
        rules: [{
            test:/\.(s*)css$/,
            use:['style-loader','css-loader', 'sass-loader']
        }]
    }
};