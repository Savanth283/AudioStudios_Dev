/** @type {import('next').NextConfig} */
const webpack = require('webpack');
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {

    config.plugins.push(new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
    }))
    
    // Important: return the modified config
    return config;
  },
  images: {
    domains: ['127.0.0.1','dev-idiosys.s3.ap-southeast-1.amazonaws.com','audiostudios.s3.ap-southeast-1.amazonaws.com']
  }

}

module.exports = nextConfig
