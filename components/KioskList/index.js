import React from 'react'
import {
	StructuredListWrapper,
	StructuredListHead,
	StructuredListBody,
	StructuredListRow,
	StructuredListCell
} from 'carbon-components-react'
import KioskListItem from '../KioskListItem'
import moment from 'moment'

import styles from './styles.scss'

class KioskList extends React.Component {
	render() {

		const { kiosks } = this.props

		return <StructuredListWrapper>
			<StructuredListHead>
				<StructuredListRow head>
					<StructuredListCell head className="kiosk-list-created">
						Created at
					</StructuredListCell>
					<StructuredListCell head className="kiosk-list-name">
						Name
					</StructuredListCell>
					<StructuredListCell head className="kiosk-list-pages">
						Pages
					</StructuredListCell>
					<StructuredListCell head className="kiosk-list-actions">
						Actions
					</StructuredListCell>
				</StructuredListRow>
			</StructuredListHead>
			<StructuredListBody>
			{kiosks.map(kiosk => <KioskListItem {...kiosk} />)}
			</StructuredListBody>
		</StructuredListWrapper>
	}
}

export default KioskList