import React from 'react'
import Layout from '../../layouts/Default'
import withRedux, { pushKiosk } from './state'
import Authenticated from '../../components/Authenticated'
import KioskPageEntry from '../../components/KioskPageEntry'
import { TextInput, FormGroup } from 'carbon-components-react'
import { Button } from 'carbon-components-react'

import styles from './styles.scss'

class Kiosk extends React.Component {

	static getEmptyPage(temporaryID) {
		return {
			id: `Kiosk${temporaryID}`,
			url: ' ',
			time: 30
		}
	}

	onNameUpdate($elem) {
		const value = $elem.target.value
		this.setState({name: value})
	}

	addPageEntry() {
		const pages = this.state.pages.slice()
		pages.push(Kiosk.getEmptyPage(pages.length + 1))
		this.setState({pages})
	}

	removePageEntry(id) {
		const pages = this.state.pages.slice()
		const removeIndex = pages.findIndex(page => page.id === id)
		pages.splice(removeIndex,1)
		this.setState({pages})
	}

	onPageUpdate(data) {
		const pages = this.state.pages.slice()
		const index = pages.findIndex(page => page.id === data.id)
		pages[index] = data
		this.setState({pages})
	}

	onSave() {
		console.log(this.state);
		console.log(this.props);

		this.props.pushKiosk(this.state, this.props.token)
	}

	componentDidMount() {
		if (pages.length < 1) {
			pages.push(Kiosk.getEmptyPage(1))
		}
	}

	static getDerivedStateFromProps() {
		return {}
	}

	render() {

		const pages = this.props.pages.slice()


		return <Layout>

			<h1>Kiosk</h1>

			<div className="bx--row">
				<FormGroup legendText="" className="bx--col-md-6">
					<TextInput
						id="Name"
						required
						labelText="Kiosk name"
						placeholder="Office lobby kiosk"
						onChange={e => this.onNameUpdate(e)}
						/>
				</FormGroup>
			</div>

			{pages.map(({ id, url, time }, i) => <KioskPageEntry
				id={id}
				url={url}
				time={time}
				key={`PageEntry_${id}`}
				index={i}
				onUpdate={data => this.onPageUpdate(data)}
				onRemove={id => this.removePageEntry(id)}
			/>)}

			<FormGroup legendText="" >
				<div className="bx--row">
					<Button
						kind="secondary"
						onClick={e => this.addPageEntry()}>
							Add new page
					</Button>
				</div>
			</FormGroup>
			<FormGroup legendText="" >
				<div className="bx--row">
					<Button
						onClick={e => this.onSave()}>
							Save
					</Button>
				</div>
			</FormGroup>

		</Layout>
	}
}

export default Authenticated(withRedux(Kiosk))