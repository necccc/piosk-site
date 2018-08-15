import React from 'react'
import {
	StructuredListRow,
	StructuredListCell,
	Button
} from 'carbon-components-react'
import Link from '../Link'
import moment from 'moment'

import styles from './styles.scss'

class KioskListItem extends React.Component {
	render() {

		const { id, created_at, name, pages } = this.props

		return <StructuredListRow className="kiosk-list-item">
					<StructuredListCell className="kiosk-list-created">
						{moment(created_at * 1000).format("ll")   }
					</StructuredListCell>
					<StructuredListCell className="kiosk-list-name">
						{name}
					</StructuredListCell>
					<StructuredListCell className="kiosk-list-pages">
						{pages.length}
					</StructuredListCell>
					<StructuredListCell className="kiosk-list-actions">
						<Link to="kiosk" id={ id }>
							<a>Edit</a>
						</Link>
						<a>Token</a>
						<a>Delete</a>

					</StructuredListCell>
				</StructuredListRow>
	}
}

export default KioskListItem