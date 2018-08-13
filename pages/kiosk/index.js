import React from 'react'
import Layout from '../../layouts/Default'
import withRedux, { pushKiosk } from './state'
import withAuth from '../../store/auth'
import Authenticated from '../../components/Authenticated'
import KioskPageEntry from '../../components/KioskPageEntry'
import { ModalWrapper, TextInput, Form, FormGroup } from 'carbon-components-react'
import { Button } from 'carbon-components-react'
import styles from './styles.scss'

class Kiosk extends React.Component {

	static getEmptyPage() {
		return {
			id: (~(Math.random() * -100000)).toString(16),
			url: ' ',
			time: 30
		}
	}

	componentDidMount() {
		//this.props.fetchClient(this.props.token)

		return {}
	}

	onNameUpdate($elem) {
		const value = $elem.target.value
		this.setState({name: value})
	}

	addPageEntry() {
		const pages = this.state.pages.slice()
		pages.push(Kiosk.getEmptyPage())
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

	static getDerivedStateFromProps(props, state) {
		console.log('Kiosk, getDerivedStateFromProps', props, state);

		if (state && state.pages) {
			return state
		}

		return {
			name: '',
			pages: [
				Kiosk.getEmptyPage()
			]
		}
	}

	render() {

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

			{this.state.pages.map((page, i) => <KioskPageEntry
				key={`PageEntry_${page.id}`}
				page={page}
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

export default Authenticated(withAuth(withRedux(Kiosk)))