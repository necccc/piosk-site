import ReduxComposeFactory, { createState } from '../../store'
import { requestApi } from '../../store/auth'
import { receiveKioskData } from '../client/state'
import getConfig from 'next/config'

const { publicRuntimeConfig: { api_url } } = getConfig()

const DEFAULT_STATE = {
	name: '',
	pages: []
}

const { action, getState } = createState('kiosk', DEFAULT_STATE)

//const normalizeKioskData =


export const pushKiosk = (kiosk, token) => async (dispatch) => {

	dispatch(requestApi())

	const data = Object.assign({}, kiosk)

	data.pages = data.pages.map(({ url, time }) => ({url, time}))

	const kioskData = await fetch(`${api_url}/v1/kiosk`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token
			},
			body: JSON.stringify(data)
		})
		.then(response => response.json())
		.catch(e => console.error(e))

	const { id } = kioskData

	kiosk.id = id

	dispatch(receiveKioskData(kiosk))
}


export default ReduxComposeFactory({ pushKiosk }, getState)