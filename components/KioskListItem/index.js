import React from 'react'
import {
	StructuredListRow,
	StructuredListCell
} from 'carbon-components-react'
import Link from 'next/link'
import moment from 'moment'

import styles from './styles.scss'

class KioskListItem extends React.Component {
	render() {

		const { id, created_at, name, pages } = this.props

		return <StructuredListRow key={id} className="kiosk-list-item">
					<StructuredListCell className="kiosk-list-created">
						{moment(created_at).format("ll")   }
					</StructuredListCell>
					<StructuredListCell className="kiosk-list-name">
						{name}
					</StructuredListCell>
					<StructuredListCell className="kiosk-list-pages">
						{pages.length}
					</StructuredListCell>
					<StructuredListCell className="kiosk-list-actions">
						<Link>
							<a>Edit</a>
						</Link>
						<Link>
							<a>Token</a>
						</Link>
						<Link>
							<a>Delete</a>
						</Link>
					</StructuredListCell>
				</StructuredListRow>
	}
}

export default KioskListItem