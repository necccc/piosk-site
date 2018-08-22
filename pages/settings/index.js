import React from 'react'
import Router from 'next/router';
import { Button, Modal, Form, FormGroup } from 'carbon-components-react'

import withRedux, { resetToken } from './state'
import Layout from '../../layouts/Default'
import Authenticated from '../../auth'
import KioskList from '../../components/KioskList'
import Link from '../../components/Link'
import styles from './styles.scss'

class Settings extends React.Component {


	onModalClick() {
		this.setState({
			modalOpen: false
		})
	}


	render() {

		return <Layout showHeader={true}>
			<div className="bx--grid settings--page">
				<div className="bx--row">
					<div className="bx--offset-lg-1 bx--col-lg-10 client--page--header">
						<h1>Settings</h1>
					</div>
				</div>
				<div className="bx--row">
					<div className="bx--offset-lg-1 bx--col-lg-10">
						<Form>
							<FormGroup className="setting--group" legendText="Security">

							<p>
								You can invalidate all your previously generated read-only tokens by clicking the button below.
							</p>

							<Button >Invalidate Read-only Tokens</Button>

							</FormGroup>
						</Form>
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

		return { auth }
	}

}

export default Authenticated(withRedux(Settings))