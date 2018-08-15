import React from 'react'
import withRedux, { fetchClient, fetchClientKiosks } from './state'
import Layout from '../../layouts/Default'
import Authenticated from '../../components/Authenticated'
import KioskList from '../../components/KioskList'
import withAuth, { setToken } from '../../store/auth'
import { Button } from 'carbon-components-react'
import Link from '../../components/Link'
import styles from './styles.scss'

class Client extends React.Component {

	onSubmit (e) {
		console.log(e);

	}

	componentDidMount() {
		console.log('Client componentDidMount', this.props);

		const  { id, token } = this.props
		//this.props.fetchClientKiosks(id, token)
	}

	render() {

		const { id , created_at, kiosks } = this.props

		return <Layout>

			<h1>Hello {id}!</h1>

			<KioskList kiosks={ kiosks } />

			<Link to="newkiosk">
				<Button>Create new kiosk</Button>
			</Link>

		</Layout>
	}

	static getInitialProps({ req, store }) {
		if (req && req.query.jwt) {
			//store.dispatch(setToken(req.query.jwt))

			const { auth: { id, token }} = store.getState()

			//fetchClient(id, token)
			//fetchClientKiosks(id, token)
		}

		return {}
	}

}

export default Authenticated(withAuth(withRedux(Client)))