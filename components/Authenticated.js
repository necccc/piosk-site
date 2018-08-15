import React from 'react'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'
import getConfig from 'next/config'
import { setToken } from '../store/auth'

const { publicRuntimeConfig: { api_url } } = getConfig()

export default function (Component) {

	return class Authenticated extends React.Component {

		static async getInitialProps (ctx) {

			const { req, store } = ctx
			let pageProps = (Component.getInitialProps ? await Component.getInitialProps(ctx) : {})

			if (req && req.cookies && req.cookies.access_token) {

				const tokenResponse = await fetch(`${api_url}/v1/token`, {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ token: req.cookies.access_token })
				}).then(response => response.json())
				.catch(e => {})

				if (tokenResponse.error) {
					return pageProps;
				}

				const { jwt } = tokenResponse
				store.dispatch(setToken(jwt))

				const { auth: { token, id }} = store.getState()
				pageProps = Object.assign({ token, id }, pageProps )
			}

			return pageProps

		}

		componentDidMount () {

			if (!this.props.token && Router.router.route !== '/home') {
				console.log('Authenticated mount', [this.props.token, Router.router.route] );

				//Router.push('/')
			}

			this.setState({ isLoading: false })
		}

		render() {
			//<TokenContext.Provider value={this.props.token}>
			//</TokenContext.Provider>
			return (<Component {...this.props} />)
		  }
	}
}