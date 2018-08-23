import React from 'react'
import withRedux, { getKioskUrlByID, fetchKioskData, loadKioskData } from './state'
import Authenticated from '../../auth'

import Layout from '../../layouts/Default'
import KioskPageEntry from '../../components/KioskPageEntry'
import { TextInput, FormGroup } from 'carbon-components-react'
import { Button } from 'carbon-components-react'
import Link from '../../components/Link'
import Router from 'next/router'

import styles from './styles.scss'

class Kiosk extends React.Component {

	static getEmptyPage(temporaryID) {
		return {
			id: `Page_${temporaryID}`,
			url: '',
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
		if (this.props.editing) {
			this.props.updateKiosk(this.state, this.props.auth.token)
		} else {
			this.props.pushKiosk(this.state, this.props.auth.token)
		}
	}

	componentDidMount() {
		const state = {
			name: this.props.name,
			pages: this.props.pages
		}

		if (this.props.kioskId) {
			state.kioskId = this.props.kioskId
		}

		this.setState(state)
	}

	render() {
		const { pages = [], name = '' } = this.state || {}

		return <Layout showHeader={true}>

			<div className="bx--grid">

				<div className="bx--row">
    				<div className="bx--offset-lg-1 bx--col-lg-10 kiosk--edit">
						<h1>Set up new Kiosk</h1>
					</div>
				</div>

				<div className="bx--row">
					<FormGroup legendText="" className="bx--offset-lg-1 bx--col-lg-10">
						<TextInput
							id="Name"
							defaultValue={name}
							required
							labelText="Kiosk name"
							placeholder="Office lobby kiosk"
							type="text"
							onChange={ e => this.onNameUpdate(e) }
						/>
					</FormGroup>
				</div>

				{pages.map(({ id, url, time }, i) => <KioskPageEntry
					id={`Page_${i + 1}`}
					url={url}
					time={time}
					key={`PageEntry_${i + 1}`}
					index={i}
					onUpdate={data => this.onPageUpdate(data)}
					onRemove={id => this.removePageEntry(id)}
				/>)}

				<div className="bx--row">
					<FormGroup legendText="" className="bx--offset-lg-1 bx--col-lg-10 ">
						<Button
							kind="secondary"
							onClick={e => this.addPageEntry()}>
								Add new page
						</Button>
					</FormGroup>
				</div>

				<div className="bx--row">
					<FormGroup legendText="" className="bx--offset-lg-1 bx--col-lg-1 ">
						<Button onClick={e => this.onSave()}>
							Save
						</Button>
					</FormGroup>
					<FormGroup legendText="" className="bx--col-lg-1 ">
						<Link to="client">
							<Button kind="secondary">
								Cancel
							</Button>
						</Link>
					</FormGroup>
				</div>

			</div>
		</Layout>
	}

	static async getInitialProps({ req, store, auth, query }) {
		let kioskId

		if (req) {
			kioskId = req.params.id
		} else {
			kioskId = query.id
		}

		const kioskData = await fetchKioskData(getKioskUrlByID(kioskId), auth.token)

		return {
			kioskId,
			editing: !!kioskData.name,
			name: kioskData.name || '',
			pages: kioskData.pages || []
		}
	}
}

export default Authenticated(withRedux(Kiosk))