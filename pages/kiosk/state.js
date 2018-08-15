import ReduxComposeFactory, { createState } from '../../store'
import { receiveKioskData } from '../client/state'
import Router from 'next/router'
import getConfig from 'next/config'

const { publicRuntimeConfig: { api_url } } = getConfig()

const DEFAULT_STATE = {
	
}

const { action, getState } = createState('kiosk', DEFAULT_STATE)





export const getKioskUrlByID = (id) => (`/v1/kiosk/${id}`)

export const fetchKioskData = async (kioskUrl, token) => {

	console.log('fetch kiosk data', kioskUrl);

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

	//dispatch(requestApi())

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

	Router.push('/client')

}



export default ReduxComposeFactory({ pushKiosk, fetchKioskData }, getState)