const withTM = require('@weco/next-plugin-transpile-modules')
const withSass = require('@zeit/next-sass')
const routing = require('./routing')

module.exports = withSass({

	port: process.env.PORT,
	host: process.env.HOST,

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
	cssModules: false
})