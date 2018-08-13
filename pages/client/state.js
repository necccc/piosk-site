import ReduxComposeFactory, { createState } from '../../store'

const DEFAULT_STATE = {
	kiosks: []
}

const { action, getState } = createState('client', DEFAULT_STATE)

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

console.log(kiosks);

	//dispatch(receiveClientKiosks(kiosks))
}



export const receiveKioskData = action('receiveKioskData', (state, kiosk) => {

	const newKiosks = state.kiosks.slice()

	newKiosks.push(kiosk)

	return {
		...state,
		kiosks: newKiosks,
	}
})


export default ReduxComposeFactory({  }, getState)