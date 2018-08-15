import React from 'react'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import { wrapWithStore } from '../store'

import { AuthContext, wrapWithAuth } from '../auth'


class MyApp extends App {

	static async getInitialProps ({Component, ctx}) {
	  return {
			pageProps: (Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
	  }
	}

	render () {

		const {Component, pageProps, store, auth} = this.props

	  return <Container>
			<AuthContext.Provider value={ auth }>
				<Provider store={store}>
					<Component {...pageProps} />
				</Provider>
			</AuthContext.Provider>
	  </Container>
	}

}

export default wrapWithAuth(wrapWithStore(MyApp))