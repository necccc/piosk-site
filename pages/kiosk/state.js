import ReduxComposeFactory, { createState } from '../../store'
import { receiveKioskData } from '../client/state'
import Router from 'next/router'
import getConfig from 'next/config'

const { publicRuntimeConfig: { api_url } } = getConfig()

const DEFAULT_STATE = {}

const { action, getState } = createState('kiosk', DEFAULT_STATE)

const normalizeKioskPayload = (kioskData) => {
	const { name, pages } = kioskData
	const data = Object.assign({}, { name, pages })

	// remove the fake ID from the pages payload
	data.pages = data.pages.map(({ url, time }) => ({url, time}))

	return data
}

export const getKioskUrlByID = (id) => (`/v1/kiosk/${id}`)

export const fetchKioskData = async (kioskUrl, token) => {

	return fetch(`${api_url}${kioskUrl}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': token
		}
	})
	.then(response => response.json())
	.catch(e => console.error(e))

}

export const pushKiosk = (kiosk, token) => async (dispatch) => {
	const data = normalizeKioskPayload(kiosk)

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

	Router.push('/client')

}


export const updateKiosk = (kiosk, token) => async (dispatch) => {
	const { kioskId: id } = kiosk
	const data = normalizeKioskPayload(kiosk)

	const kioskData = await fetch(`${api_url}/v1/kiosk/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token
			},
			body: JSON.stringify(data)
		})
		.then(response => response.json())
		.catch(e => console.error(e))

	dispatch(receiveKioskData(kiosk))

	Router.push('/client')
}

export const fetchKioskToken = async (id, authToken) => {
	const clientData = await fetch(`${api_url}/v1/kiosk/${id}/token`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': authToken
			}
		})
		.then(response => response.json())
		.catch(e => console.error(e))

	const { token } = clientData

	return token
}

export const deleteKiosk = async (id, authToken) => {
	const clientData = await fetch(`${api_url}/v1/kiosk/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': authToken
		}
	})
	.then(response => response.status)
	.catch(e => console.error(e))

	return clientData

}

export default ReduxComposeFactory({ pushKiosk, updateKiosk, fetchKioskData }, getState)