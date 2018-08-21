import React from 'react'
import PioskLogo from '../PioskLogo'
import GithubLogin from '../GithubLogin'

import styles from './styles.scss'

class Hero extends React.Component {
	render() {


		return <div className="hero--container">
			<div className="hero--container-inner">
				<PioskLogo className="piosk--logo__hero" />
				<h1 className="">Piosk</h1>
				<GithubLogin>Login with GitHub</GithubLogin>
			</div>
		</div>
	}
}

export default Hero
