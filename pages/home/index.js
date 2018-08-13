import React from 'react'
import withRedux from './state'
import withAuth, { createClient, setSecret } from '../../store/auth'
import Layout from '../../layouts/Default'
import styles from './styles.scss'
import GithubLogin from '../../components/GithubLogin'
import Router from 'next/router'

class Index extends React.Component {
	async onSubmit (e) {

		console.log(this.props);

		this.props.setSecret(e.secret)

		await this.props.createClient(e.secret)

		Router.push({
			pathname: '/client'
		})

	}

	render() {
		return <Layout>

		Piosk!

		<div>

			<GithubLogin>Login with GitHub</GithubLogin>

		</div>

	</Layout>
	}
}

export default withAuth(withRedux(Index))