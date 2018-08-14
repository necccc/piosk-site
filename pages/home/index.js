import React from 'react'
import withRedux from './state'
import withAuth, { } from '../../store/auth'
import Layout from '../../layouts/Default'
import styles from './styles.scss'
import GithubLogin from '../../components/GithubLogin'
import Link from '../../components/Link'
import Router from 'next/router'

import Authenticated from '../../components/Authenticated'
class Index extends React.Component {

	render() {

		return <Layout>

		Piosk!

		<div>

		 {(this.props.token) ? (
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


	static getInitialProps({ req, store }) {

		return {}
	}
}

export default Authenticated(withAuth(withRedux(Index)))