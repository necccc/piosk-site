import ReduxComposeFactory, { createState } from '../../store'
import { fetchKioskData, fetchKioskToken } from '../kiosk/state'
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

export const tokenReseted = action('receiveKioskToken', (state, jwt) => ({
	...state,
	kioskToken: token,
	isFetching: false,
}))

export const resetToken = (id, token) => async (dispatch) => {

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

	console.log(clientData);

	const { jwt } = clientData

	dispatch(tokenReseted(jwt))
}

export default ReduxComposeFactory({ resetToken }, getState)