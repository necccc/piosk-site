import React from 'react'
import withRedux from './state'
import Authenticated from '../../auth'

import Layout from '../../layouts/Default'
import GithubLogin from '../../components/GithubLogin'
import Link from '../../components/Link'

import styles from './styles.scss'

class Index extends React.Component {

	render() {

		console.log(this.props);

		return <Layout>

		Piosk!

		<div>

		 {(this.props.auth && this.props.auth.token) ? (
			<Link to="client">
				<a>
					See your Kiosks
				</a>
			</Link>
		 ) : (
			<GithubLogin>Login with GitHub</GithubLogin>
		 )}


		</div>

	</Layout>
	}


	static getInitialProps({ req, store, auth }) {

		console.log('state', store.getState());
		console.log(auth);

		return {}
	}

}


export default Authenticated(withRedux(Index))