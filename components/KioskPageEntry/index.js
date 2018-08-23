import React from 'react'
import { Button, TextInput,  FormGroup } from 'carbon-components-react'

import styles from './styles.scss'

class KioskPageEntry extends React.Component {

	onChange(key, $elem) {
		const value = $elem.target.value
		const state = Object.assign({}, this.state)

		state[key] = value

		this.setState(state)
		this.props.onUpdate(state)
	}

	componentDidMount() {

		const state = {
			id: this.props.id,
			url: this.props.url || '',
			time: this.props.time || 30
		}
		this.setState(state)
	}

	render() {
		const { index, id, url, time } = this.props

		return <FormGroup legendText="" >
				<div className="bx--row">
				<div className="bx--offset-lg-1 bx--col-lg-1 ">
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
					<div className="bx--col-md-5">
						<TextInput
							id={`PageUrl_${id}`}
							defaultValue={ url }
							required
							labelText="Page Url"
							placeholder="https://"
							onChange={e => this.onChange('url', e)}
						/>
					</div>
					<div className="bx--col-md-2">
						<TextInput
							className="kiosk--field--time"
							id={`PageTime_${id}`}
							defaultValue={ time }
							labelText="Cycle after seconds"
							placeholder="30"
							onChange={e => this.onChange('time', e)}
							type="number"
						/>
					</div>
					<div className="bx--col-md-1">
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