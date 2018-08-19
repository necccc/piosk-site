import React from 'react'
import Router from 'next/router';
import { Button, Modal } from 'carbon-components-react'

import withRedux, { fetchClient } from './state'
import Layout from '../../layouts/Default'
import Authenticated from '../../auth'
import KioskList from '../../components/KioskList'
import Link from '../../components/Link'
import styles from './styles.scss'

class Client extends React.Component {

	onSubmit(e) {
		console.log(e);
	}

	onShowToken(id, name) {
		console.log(id, name);

	}

	onModalClick() {
		console.log('modal click');

		this.setState({
			modalOpen: false
		})
	}

	componentDidMount() {
		console.log('Client componentDidMount', this.props);

		const  { userId, token } = this.props.auth
		this.props.fetchClientKiosks(userId, token)


	}

	render() {
console.log(this.props.auth);

		const { auth: { name } , created_at, kiosks } = this.props
		const { modalOpen = false, modalTitle = '' } = this.state || {}

		return <Layout showHeader={true}>
			<div className="bx--grid client--page">

				<div className="bx--row">
					<div className="bx--offset-lg-1 bx--col-lg-10 client--page--header">
						<h1>Hello {/* name.split(' ')[0] */}!</h1>
					</div>
				</div>
				<div className="bx--row">
					<div className="bx--offset-lg-1 bx--col-lg-10 client--page--kiosks">
						<KioskList kiosks={ kiosks } showToken={e => this.onShowToken(e)} />
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
  open={modalOpen}
  passiveModal
  modalHeading={modalTitle}
  modalLabel="Read-only token"
  modalAriaLabel=""
  iconDescription="Close the modal"
  onRequestClose={e => this.onModalClick()}
>
<p className="bx--modal-content__text">
	Please see ModalWrapper for more examples and demo of the functionality.
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