require('dotenv').config()

const withTM = require('@weco/next-plugin-transpile-modules')
const withSass = require('@zeit/next-sass')

module.exports = withTM(withSass({

	port: process.env.APP_PORT,

	transpileModules: [],

	publicRuntimeConfig: {
		asset_url: '',
		api_url: process.env.API_URL
	},

	cssModules: false
}))