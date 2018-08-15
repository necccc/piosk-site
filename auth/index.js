import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import { KJUR } from 'jsrsasign'
import getConfig from 'next/config'

const { publicRuntimeConfig: { api_url } } = getConfig()
const isServer = typeof window === 'undefined';


const decodeToken = (jwt) => {
	const { payloadObj } = KJUR.jws.JWS.parse(jwt)
	return payloadObj
}

const authStore = (auth) => {

	if (isServer) return;

	if (!window['__AUTHSTORE']) {
		window['__AUTHSTORE'] = auth
	}

	return window['__AUTHSTORE']
}

const getToken = async function (access_token) {
	const tokenResponse = await fetch(`${api_url}/v1/token`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ token: access_token })
	}).then(response => response.json())
	.catch(e => ({ error: true, e }))

	if (tokenResponse.error) return {}

	const { jwt: token } = tokenResponse
	const { sub: userId } = decodeToken(token)

	return { token, userId }
}

export const wrapWithAuth = (App) => {

	return class WrappedApp extends Component {

		static getInitialProps = async (app) => {

            if (!app) throw new Error('No app context')
            if (!app.ctx) throw new Error('No page context')

            let initialProps = {}

			if (app.ctx.req) {
				const { ctx: { req }} = app

				console.log('authenticate 1 - get auth from req');

				if (req.cookies && req.cookies.access_token) {
					const auth = await getToken(req.cookies.access_token)
					initialProps.auth = auth
					authStore(auth)
					app.ctx.auth = auth
					console.log('authenticate 2 - has token!');
				}
			}

            if ('getInitialProps' in App) {
				initialProps = Object.assign(initialProps, await App.getInitialProps.call(App, app))
            }

			console.log('authenticate 3 - initialProps', !!initialProps.auth);

            return initialProps
		}

		constructor(props, context) {

            super(props, context);

			let { auth } = props;

            if (!!auth) {
				authStore(auth)
			} else {
				auth = authStore()
			}

			console.log('authenticate 4 - render', !!auth);

            this.auth = auth
        }

		render() {

			let { ...props } = this.props

			console.log('authenticate 5 - render', this.auth );

			return (
				<App {...props} auth={ this.auth } />
			);
		}
	}
}

export const AuthContext = React.createContext({});

export default (Comp) => {

	return class Authenticated extends Component {

		static getInitialProps = async (app) => {

			let initialProps = {}

            if ('getInitialProps' in Comp) {
				initialProps = Object.assign(initialProps, await Comp.getInitialProps.call(Comp, app))
			}

            return initialProps
		}

		render() { return <AuthContext.Consumer>
				{auth => <Comp auth={auth} />}
			</AuthContext.Consumer>
		}

	}

}