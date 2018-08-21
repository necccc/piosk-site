import React from 'react'
import Link from '../Link'
import Router from 'next/router'
import GithubLogin from '../../components/GithubLogin'

import styles from './styles.scss'

class Header extends React.Component {

	render() {

		let route = ''
		try {
			route = Router.route.replace('/', '')
		} catch(e) {
			
		}


		return <div className="header--container">
			<div className="bx--grid">
				<div className="bx--row header--row">
    				<div className="bx--offset-lg-1 bx--col-lg-2 header--content">
						<h1>Piosk</h1>
    				</div>
					<div className="bx--col-lg-2 header--content">
						<Link to="client">
							<a className={route === 'client' ? 'active' : ''}>Your kiosks</a>
						</Link>
    				</div>
					<div className="bx--col-lg-2 header--content">
						<Link to="settings">
							<a className={route === 'settings' ? 'active' : ''}>Settings</a>
						</Link>
    				</div>
				</div>
			</div>
		</div>
	}
}

export default Header
