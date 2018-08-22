import ReduxComposeFactory, { createState } from '../../store'
import { fetchKioskData, fetchKioskToken, deleteKiosk } from '../kiosk/state'
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
		isFetching: false,
	}
})

export const kioskDeleted = action('kioskDeleted', (state, id) => {
	const newKiosks = state.kiosks.slice()

	const removeIndex = newKiosks.findIndex(kiosk => kiosk.id === id)

	newKiosks.splice(removeIndex, 1)

	return {
		...state,
		kiosks: newKiosks,
		isFetching: false,
	}
})

export const receiveKioskToken = action('receiveKioskToken', (state, token) => ({
	...state,
	kioskToken: token,
	isFetching: false,
}))

export const fetchClient = (id, token) => async (dispatch) => {

	dispatch(requestApi())

	console.log('fetchClient');

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
	const kiosk = await fetchKioskData(kioskUrl, token)
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



export const fetchToken = async (id, authToken) => {

	const token = await fetchKioskToken(id, authToken)

	return token
}


export const removeKiosk = (id, authToken) => async (dispatch) => {

	dispatch(requestApi())

	try {
		const status = await deleteKiosk(id, authToken)

		if (status !== 204) throw Error('delete error')

	} catch (e) {
		throw e
	}

	dispatch(kioskDeleted(id))
}


export default ReduxComposeFactory({ fetchClient, fetchClientKiosks, removeKiosk }, getState)