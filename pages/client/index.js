import React from 'react'
import withRedux, { fetchClient } from './state'
import Layout from '../../layouts/Default'
import Authenticated from '../../auth'
import KioskList from '../../components/KioskList'
import { Button } from 'carbon-components-react'
import Link from '../../components/Link'
import styles from './styles.scss'
import Router from 'next/router';

class Client extends React.Component {

	onSubmit (e) {
		console.log(e);
	}

	componentDidMount() {
		console.log('Client componentDidMount', this.props);

		const  { userId, token } = this.props.auth
		this.props.fetchClientKiosks(userId, token)
	}

	render() {

		const { auth: { userId } , created_at, kiosks } = this.props

		return <Layout showHeader={true}>
			<div className="bx--grid client--page">

				<div className="bx--row">
					<div className="bx--offset-lg-1 bx--col-lg-10 client--page--header">
						<h1>Hello { userId }!</h1>
					</div>
				</div>
				<div className="bx--row">
					<div className="bx--offset-lg-1 bx--col-lg-10 client--page--kiosks">
						<KioskList kiosks={ kiosks } />
					</div>
				</div>
				<div className="bx--row">
					<div className="bx--offset-lg-1 bx--col-lg-10 client--page--create">
						<Link to="newkiosk">
							<Button>Create new kiosk</Button>
						</Link>
					</div>
				</div>
			</div>





		</Layout>
	}

	static getInitialProps({ req, res, store, auth }) {

		if (!auth || !auth.token) {
			if (res) {
				res.writeHead(302, {
				Location: '/'
				})
				res.end()
			} else {
				Router.push('/')
			}
		}

		const { userId, token } = auth

		fetchClient(userId, token)

		return {}
	}

}

export default Authenticated(withRedux(Client))