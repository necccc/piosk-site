import ReduxComposeFactory, { createState } from '../../store'
import { fetchKioskData } from '../kiosk/state'
import getConfig from 'next/config'

const { publicRuntimeConfig: { api_url } } = getConfig()

const DEFAULT_STATE = {
	kiosks: []
}

const { action, getState } = createState('client', DEFAULT_STATE)

export const requestApi = action('requestApi', (state) => ({
	...state,
	isFetching: true,
}))

export const receiveClientData = action('receiveClientData', (state, created_at, updated_at) => ({
	...state,
	created_at,
	updated_at,
	isFetching: false,
}))

export const receiveClientKiosks = action('receiveClientKiosks', (state, kiosks) => ({
	...state,
	kiosks,
	isFetching: false,
}))

export const receiveKioskData = action('receiveKioskData', (state, kiosk) => {
	const newKiosks = state.kiosks.slice()
	newKiosks.push(kiosk)

	return {
		...state,
		kiosks: newKiosks,
	}
})


export const fetchClient = (id, token) => async (dispatch) => {

	dispatch(requestApi())

	const clientData = await fetch(`${api_url}/v1/client/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token
			}
		})
		.then(response => response.json())
		.catch(e => console.error(e))

	const { created_at, updated_at } = clientData

	dispatch(receiveClientData(created_at, updated_at))
}



export const fetchKiosk = (kioskUrl, token) => async (dispatch) => {

	console.log('fetch kiosk data', kioskUrl);

	const kiosk = await fetchKioskData(kioskUrl, token)

	console.log(kiosk);

	dispatch(receiveKioskData(kiosk))
}


export const fetchClientKiosks = (id, token) => async (dispatch) => {

	dispatch(requestApi())

	const clientData = await fetch(`${api_url}/v1/client/${id}/kiosks`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token
			}
		})
		.then(response => response.json())
		.catch(e => console.error(e))

	const { kiosks } = clientData

	try {
		const d = kiosks.map(kioskUrl => fetchKioskData(kioskUrl, token))
		const kioskList = await Promise.all(d)
		dispatch(receiveClientKiosks(kioskList))
	} catch (e) {
		console.error(e);
	}
}

export default ReduxComposeFactory({ fetchClient, fetchClientKiosks }, getState)