const path = require('path');
// TODO: Export file css ra file riêng
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VENDOR_LIBS = [
    "jquery",
    "react",
    "react-dom",
];
const devServer = {
    port : 8085,
    disableHostCheck : true,
    historyApiFallback : true,
    overlay : true,
    stats : 'minimal',
    inline : true,
    compress : true,
    contentBase : path.resolve(__dirname, 'dist')
};
module.exports = {
    entry: {
        bundle: './src/ReactJsClient/index.js',
        vendor: VENDOR_LIBS
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js',
        //Todo: Sử dụng cho nested route (môi trường dev), mất cả buổi sáng vọc, khổ vlin
        publicPath: 'https://localhost:8085/'
    },
    module: {
        rules: [

            {
                use: 'babel-loader',
                test: /\.js$|\.jsx$/,
                exclude: '/node_modules/'
            },
            // TODO: Load css
            {
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader", options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader", options: {
                        sourceMap: true
                    }
                }],
                test: /\.(s*)css$/
            },
            //Todo: Load các loại file ( font, img...)
            {
                loader: 'file-loader',
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf|\.mp3$|\.wav$/
            }
        ],
    },
    plugins: [
        // TODO: Cấu hình để sử dụng đc jquery
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'windown.$': 'jquery',
            'windown.jQuery': 'jquery'
        }),
        /* TODO: Optimize bundle.js và vendor.js => giảm kích thước file
               Thêm manifest: khi build lại project sẽ chỉ load lại những gói file có sự thay đổi ( thường là bundle.js) */ 
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor','manifest']
        }),
        // TODO: Sinh ra file index.html trong gói bundle
        new HtmlWebpackPlugin({
            template : 'src/ReactJsClient/index.html'
        })
    ],
    //Todo: Trace log
    devtool: '#source-map',
    devServer,
    
}
