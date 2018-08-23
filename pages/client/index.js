import React from 'react'
import Router from 'next/router';
import { Button, Modal, TextArea } from 'carbon-components-react'

import withRedux, { fetchClient, fetchToken, removeKiosk } from './state'
import Layout from '../../layouts/Default'
import Authenticated from '../../auth'
import KioskList from '../../components/KioskList'
import Link from '../../components/Link'
import styles from './styles.scss'

class Client extends React.Component {

	async onShowToken({id, name}) {
		const { token } = this.props.auth
		const kioskToken = await fetchToken(id, token)

		this.setState({
			kioskToken,
			modalTitle: name,
			modalId: id,
			modalOpen: true
		})
	}

	async onRemove({ id }) {
		const { token } = this.props.auth
		this.props.removeKiosk(id, token)
	}

	onModalClick() {
		this.setState({
			modalOpen: false
		})
	}

	componentDidMount() {
		const  { userId, token } = this.props.auth
		this.props.fetchClientKiosks(userId, token)
	}

	render() {
		const { auth: { name } , created_at, kiosks } = this.props
		const { modalOpen = false, modalTitle = '', modalId = '', kioskToken = '' } = this.state || {}

		return <Layout showHeader={true}>
			<div className="bx--grid client--page">

				<div className="bx--row">
					<div className="bx--offset-lg-1 bx--col-lg-10 client--page--header">
						<h1>Hello {(name || '').split(' ')[0]}!</h1>
					</div>
				</div>
				<div className="bx--row">
					<div className="bx--offset-lg-1 bx--col-lg-10 client--page--kiosks">
						<KioskList kiosks={ kiosks } showToken={e => this.onShowToken(e)} onRemove={e => this.onRemove(e) } />
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

			<Modal
			className="some-class"
			open={ modalOpen }
			passiveModal
			modalHeading={ modalTitle }
			modalLabel="Read-only token"
			modalAriaLabel=""
			iconDescription="Close the modal"
			onRequestClose={ e => this.onModalClick()}
			>
				<p className="bx--modal-content__text">
					Use the following access token in the piosk client to load and display your kiosk pages
				</p>
				<TextArea
					className="read-access-token"
					hideLabel={true}
					value={ kioskToken }
					labelText="Text Area label"
					readOnly
					id="PioskToken"
				/>
				<p className="bx--modal-content__text">
					Click anywhere to close this modal.
				</p>
			</Modal>

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

		return { auth }
	}

}

export default Authenticated(withRedux(Client))