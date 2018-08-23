import React from 'react'
import withRedux from './state'
import Authenticated from '../../auth'

import Layout from '../../layouts/Default'
import GithubLogin from '../../components/GithubLogin'
import Link from '../../components/Link'
import Hero from '../../components/Hero'

import styles from './styles.scss'

class Index extends React.Component {

	render() {

		return <Layout showHeader={false}>


			<Hero />

			<div className="bx--grid">
				<div className="bx--row">
					<div className="bx--col-lg-12 home--intro">
						<h3>Remote managed web kiosk for Raspberry Pi<sup>*</sup></h3>
					</div>
				</div>
				<div className="bx--row">
    				<div className="bx--offset-lg-2 bx--col-lg-3 home--col col--create">
						<header className="home--col--header">
							<h2>Create Kiosk</h2>
						</header>

      					<p>
							Log in with your GitHub account, and create your kiosk page collection.
						</p>
    				</div>
					<div className="bx--offset-lg-2 bx--col-lg-3 home--col col--setup">
						<header className="home--col--header">
							<h2>Setup</h2>
						</header>

      					<p>
							Using a read-only token, set up the client on a Raspberry Pi or any other system.
						</p>
    				</div>
  				</div>

				<div className="bx--row">
    				<div className="bx--offset-lg-2 bx--col-lg-3 home--col col--copy">
						<header className="home--col--header">
							<h2>Copy</h2>
						</header>

      					<p>
							Copy the working system to multiple Raspberries using CF cards
						</p>
    				</div>
					<div className="bx--offset-lg-2 bx--col-lg-3 home--col col--display">
						<header className="home--col--header">
							<h2>Display</h2>
						</header>

      					<p>
							Plug them on displays and your kiosks are ready!
						</p>
    				</div>
  				</div>
			</div>

		{/*<div>

		 {(this.props.auth && this.props.auth.token) ? (
			<Link to="client">
				<a>
					See your Kiosks
				</a>
			</Link>
		 ) : (
			<GithubLogin>Login with GitHub</GithubLogin>
		 )}


		</div> */}

	</Layout>
	}


	static getInitialProps({ req, store, auth }) {

		//console.log('state', store.getState());
		//console.log(auth);

		return {}
	}

}


export default Authenticated(withRedux(Index))