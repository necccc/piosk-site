import React from 'react'
import withRedux from './state'
import withAuth, { createClient, setSecret } from '../../store/auth'
import Layout from '../../layouts/Default'
import { Button } from 'carbon-components-react'
import styles from './styles.scss'
import Login from '../../components/Login'
import Register from '../../components/Register'
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

			<Register onSubmit={e => this.onSubmit(e)} />

			<Login onSubmit={e => this.onSubmit(e)} />

		</div>

	</Layout>
	}
}

export default withAuth(withRedux(Index))