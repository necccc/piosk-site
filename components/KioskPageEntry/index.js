import React from 'react'
import { Button, TextInput,  FormGroup } from 'carbon-components-react'

import styles from './styles.scss'

class KioskPageEntry extends React.Component {

	onSubmit (e) {
		console.log(e);
	
	}

	static getDerivedStateFromProps(props, state) {
		if (state) return state

		return {
			id: props.page.id,
			url: props.page.url,
			time: props.page.time
		}
	}

	onChange(key, $elem) {
		const value = $elem.target.value
		const state = Object.assign({}, this.state)

		state[key] = value

		this.setState(state)
		this.props.onUpdate(state)
	}

	render() {
		const { index } = this.props
		const { id, url, time } = this.state

		return <FormGroup legendText="" >
				<div className="bx--row">
				<div className="bx--col-md-1">
					{index + 1}
					{/*

						<Button
						small
						onClick={() => {}}
						onFocus={() => {}}
						className="some-class"
						kind="ghost"
						>
							Up
						</Button>

						<Button
						small
						onClick={() => {}}
						onFocus={() => {}}
						className="some-class"
						kind="ghost"
						>
							Down
						</Button>

	*/}</div>
					<div className="bx--col-md-6">
						<TextInput
							id={`PageUrl_${id}`}
							required
							labelText="Page Url"
							placeholder="https://"
							onChange={e => this.onChange('url', e)}
							/>
					</div>
					<div className="bx--col-md-3">
						<TextInput
							id={`PageTime_${id}`}
							labelText="Cycle after seconds"
							placeholder="30"
							onChange={e => this.onChange('time', e)}
							type="number"
							 />
					</div>
					<div className="bx--col-md-2">
						<Button
							kind="secondary"
							onClick={() => this.props.onRemove(id)}>
								Remove
						</Button>
					</div>
				</div>
			</FormGroup>
	}
}



export default KioskPageEntry