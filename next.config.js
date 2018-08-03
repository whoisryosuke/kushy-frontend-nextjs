const withCSS = require('@zeit/next-css')
const path = require('path')

// To add new modules, nest the function (like a HOC in React)
module.exports = withCSS({
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
        config.resolve.modules.push(path.resolve('./'))

        return config
    }
})