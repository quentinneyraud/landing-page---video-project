var webpack    = require('webpack');
var production = process.env.NODE_ENV === 'production';

var plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name:      'main', // Move dependencies to our main file
        children:  true, // Look for common dependencies in all children,
        minChunks: 2, // How many times a dependency must come up before being extracted
    }),
];

if (production) {
    plugins = plugins.concat([

        new webpack.optimize.DedupePlugin(),

        new webpack.optimize.OccurenceOrderPlugin(),

        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 51200, // ~50kb
        }),

        new webpack.optimize.UglifyJsPlugin({
            mangle:   true,
            compress: {
                warnings: false, // Suppress uglification warnings
            },
        }),

        new webpack.DefinePlugin({
            __SERVER__:      !production,
            __DEVELOPMENT__: !production,
            __DEVTOOLS__:    !production,
            'process.env':   {
                BABEL_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),

    ]);
}



module.exports = {
    debug:   !production,
    devtool: production ? false : 'eval',
    entry:  './js/source/main.js',
    output: {
        path:     './js',
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test:   /\.js/,
                loader: 'babel',
                include: __dirname + '/js/source',
                query: {
                    presets: ['es2015']
                }
            }
        ],
    },
    plugins: plugins
};