import React from 'react'
import { ModalWrapper, TextInput, Form, FormGroup } from 'carbon-components-react'

import styles from './styles.scss'

class Register extends React.Component {

	onSecret(e) {
		const secret = e.target.value
		this.setState({secret})


// scope=read:user
// state=randomscting
//  code in a code parameter as well as the state you provided in the previous step in a state

// /Exchange this code for an access token:
// POST https://github.com/login/oauth/access_token
//https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/

	}

	onSubmit() {
		this.props.onSubmit(this.state)
		return false
	}

	render() {
		return <ModalWrapper
			buttonTriggerText="Create Client"
			triggerButtonKind="primary"
			modalHeading="Create your client"
			primaryButtonText="Create"
			shouldCloseAfterSubmit={ true }
			handleSubmit={() => this.onSubmit()}
		>
			<FormGroup className="some-class" legendText="">
				<TextInput
					id="Secret"
					data-modal-primary-focus
					type="password"
					required
					onChange={e => this.onSecret(e)}
					labelText="Secret"
					placeholder="Provide a secret to access your client" />
			</FormGroup>
	  </ModalWrapper>
	}
}

export default Register