import fetch from 'isomorphic-unfetch'
import { dynamicPropertyConfig } from 'fast-redux'
import ReduxComposeFactory, { createState } from './index'
import { KJUR } from 'jsrsasign'
import getConfig from 'next/config'

const { publicRuntimeConfig: { api_url } } = getConfig()

const DEFAULT_STATE = {
	secret: '',
	token: '',
	id: '',
	isFetching: false,
}

const { action, getState } = createState('auth', DEFAULT_STATE)

const getExpire = () => {
	let num = +new Date()
	num += 1000 * 60 * 5
	return Math.floor(num / 1000)
}

const ascii_to_hexa = (str) => {
	const arr1 = [];
	for (let n = 0, l = str.length; n < l; n ++) {
		const hex = Number(str.charCodeAt(n)).toString(16);
		arr1.push(hex);
	}
	return arr1.join('');
}


const getToken = ({id, secret}) => {
	const header = JSON.stringify({
		alg: "HS256",
		typ: "JWT"
	});
	const payload = JSON.stringify({
		sub: id,
		iss: "piosk",
		exp: getExpire()
	});

	return KJUR.jws.JWS.sign("HS256", header, payload, ascii_to_hexa(secret));
}

export const setSecret = action('setSecret', ( state, secret ) => ({
		...state,
		secret,
	})
)

export const createClient = (secret) => async (dispatch) => {

	dispatch(requestApi())

	const uid = await fetch(`${api_url}/v1/client`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ secret })
		})
		.then(response => response.json())
		.catch(e => console.error(e))

	const { id } = uid

	dispatch(receiveClientId(id))
}

export const requestApi = action('requestClient', (state) => ({
		...state,
		isFetching: true,
	})
)

export const receiveClientId = action('receiveClient', (state, id) => ({
		...state,
		id,
		token: getToken({...state, id}),
		isFetching: false,
	})
)

export const fetchClient = (token) => async (dispatch) => {

	dispatch(requestApi())

	const clientData = await fetch(`${api_url}/v1/client`, {
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
})
)

export default ReduxComposeFactory({ setSecret, createClient, fetchClient }, getState)