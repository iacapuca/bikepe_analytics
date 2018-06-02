module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: './dist/[name].js'
    },
    devtool: 'source-map', 
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    }
};