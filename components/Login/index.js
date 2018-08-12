import React from 'react'
import { ModalWrapper, TextInput, Form, FormGroup } from 'carbon-components-react'

import styles from './styles.scss'

class Login extends React.Component {
	render() {
		return <ModalWrapper
			id="input-modal"
			buttonTriggerText="Access Client"
			triggerButtonKind="secondary"
			modalHeading="Access your client"
			primaryButtonText="Enter"
			handleSubmit={e => this.props.onSubmit(e)}
		>
		<Form className="some-class">
			<FormGroup legendText="">
				<TextInput
					id="User"
					data-modal-primary-focus
					required
					labelText="User ID"
					placeholder="cfa02b8c-9b26-432c-b81c-b93262e8d4da" />
			</FormGroup>
			<FormGroup legendText="">
				<TextInput
					id="Secret"
					type="password"
					required
					labelText="Secret"
					placeholder="Sshhh, it's between us" />
			</FormGroup>
				</Form>
	  </ModalWrapper>
	}
}

export default Login