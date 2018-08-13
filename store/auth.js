import ReduxComposeFactory, { createState } from './index'
import { KJUR } from 'jsrsasign'
import getConfig from 'next/config'

const { publicRuntimeConfig: { api_url } } = getConfig()

const DEFAULT_STATE = {
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

export const decodeToken = (jwt) => {
	const { payloadObj } = KJUR.jws.JWS.parse(jwt)
	return payloadObj
}

export const setToken = action('setToken', ( state, token ) => {
	const payload = decodeToken(token)

	return {
		...state,
		id: payload.sub,
		token,
	}
})

export const requestApi = action('requestApi', (state) => ({
	...state,
	isFetching: true,
}))

export default ReduxComposeFactory({ setToken }, getState)