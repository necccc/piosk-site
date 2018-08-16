import React from 'react'
import withRedux, { getKioskUrlByID, fetchKioskData, loadKioskData } from './state'
import Authenticated from '../../auth'

import Layout from '../../layouts/Default'
import KioskPageEntry from '../../components/KioskPageEntry'
import { TextInput, FormGroup } from 'carbon-components-react'
import { Button } from 'carbon-components-react'

import Router from 'next/router'

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

		this.props.pushKiosk(this.state, this.props.auth.token)
	}

	componentDidMount() {


		const state = {
			name: this.props.name,
			pages: this.props.pages
		}
//console.log(this.props);
		this.setState(state)
	}

	render() {
		//console.log(this.props);

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
							value={name}
							required
							labelText="Kiosk name"
							placeholder="Office lobby kiosk"
							type="text"
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
					<FormGroup legendText="" className="bx--offset-lg-1 bx--col-lg-10 ">
						<Button
							onClick={e => this.onSave()}>
								Save
						</Button>
					</FormGroup>
				</div>

			</div>
		</Layout>
	}

	static async getInitialProps({ req, store, auth, query }) {
		let kioskId

		if (req) {
			//kioskId = req.params.id
		} else {
			//kioskId = query.id
		}

		//const kioskData = await fetchKioskData(getKioskUrlByID(kioskId), auth.token)

		//console.log(kioskData);

		return {name: '', pages: []} //kioskData
	}
}

export default Authenticated(withRedux(Kiosk))