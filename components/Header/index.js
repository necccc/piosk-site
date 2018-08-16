import React from 'react'

import GithubLogin from '../../components/GithubLogin'

import styles from './styles.scss'

class Header extends React.Component {

	render() {

		const { children } = this.props

		return <div className="header--container ">
			<div className="bx--grid">
				<div className="bx--row">
    				<div className="bx--offset-lg-1 bx--col-lg-4">
						{ children }
    				</div>
				</div>
			</div>
		</div>
	}
}

export default Header
