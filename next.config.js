const withLess = require('@zeit/next-less')
const withCSS = require('@zeit/next-css')

// To add new modules, nest the function (like a HOC in React)
module.exports = withCSS(withLess({
    webpack(config, options) {
        config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000
                }
            }
        })

        return config
    }
}))