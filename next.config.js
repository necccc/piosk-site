const withTM = require('@weco/next-plugin-transpile-modules')
const sass = require('@zeit/next-sass')
const routing = require('./routing')
const optimizedImages = require('next-optimized-images');
const withPlugins = require('next-compose-plugins');

const nextConfig = {

	port: process.env.PORT || 3000,
	host: process.env.HOST || "0.0.0.0",

	//transpileModules: [],

	publicRuntimeConfig: {
		asset_url: '',
		gh_scope: 'user:read',
		gh_client_id: process.env.GH_OAUTH_CLIENT_ID,
		gh_redirect_uri: process.env.GH_REDIRECT_URI,
		api_url: process.env.API_URL,
		nonce_state: process.env.PIOSK_NONCE
	},

	exportPathMap: routing,
	useFileSystemPublicRoutes: false,

}

const sassConfig = {
	cssModules: false,
	cssLoaderOptions: {
		importLoaders: 1,
		localIdentName: '[local]___[name]___[hash:base64:5]'
	}
}

const optimizedImagesConfig = {
	inlineImageLimit: 8192,
	imagesFolder: 'images',
	imagesName: '[name]-[hash].[ext]',
	optimizeImagesInDev: false,
	mozjpeg: {
		quality: 80
	},
	optipng: {
		optimizationLevel: 3
	},
	pngquant: false,
	gifsicle: {
		interlaced: true,
		optimizationLevel: 3
	},
	svgo: {
		  // enable/disable svgo plugins here
	},
	webp: {
		preset: 'default',
		quality: 75
	}
}

module.exports = withPlugins([
	[sass, sassConfig],
	[optimizedImages, optimizedImagesConfig],
  ], nextConfig);