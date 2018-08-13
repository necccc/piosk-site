import React from 'react'
import withRedux from './state'
import Layout from '../../layouts/Default'
import KioskList from '../../components/KioskList'
import withAuth, { fetchClient } from '../../store/auth'
import { Button } from 'carbon-components-react'
import Link from 'next/link'
import styles from './styles.scss'

class Client extends React.Component {

	onSubmit (e) {
		console.log(e);

	}

	componentDidMount() {
		this.props.fetchClient(this.props.token)

		return {}
	}

	render() {

		const { id , created_at, kiosks } = this.props

		return <Layout>

			<h1>Hello {id}!</h1>

			<KioskList kiosks={ kiosks } />

			<Link href="/kiosk">
				<Button>Create new kiosk</Button>
			</Link>

		</Layout>
	}
}



export default withAuth(withRedux(Client))