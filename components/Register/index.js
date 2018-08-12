import React from 'react'
import { ModalWrapper, TextInput, Form, FormGroup } from 'carbon-components-react'

import styles from './styles.scss'

class Register extends React.Component {

	onSecret(e) {
		const secret = e.target.value
		this.setState({secret})



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