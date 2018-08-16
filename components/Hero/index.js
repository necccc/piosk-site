import React from 'react'

import GithubLogin from '../../components/GithubLogin'

import styles from './styles.scss'

class Hero extends React.Component {
	render() {


		return <div className="hero--container">
			<div className="hero--container-inner">
				<h1 className="">Piosk</h1>
				<h2>Remote managed web kiosk for Raspberry Pi<sup>*</sup></h2>
				<GithubLogin>Login with GitHub</GithubLogin>
			</div>
		</div>
	}
}

export default Hero
