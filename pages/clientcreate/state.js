import ReduxComposeFactory, { createState } from '../../store'

const DEFAULT_STATE = {
	kiosks: []
}

const { action, getState } = createState('client', DEFAULT_STATE)


export const receiveKioskData = action('receiveKioskData', (state, kiosk) => {

	const newKiosks = state.kiosks.slice()

	newKiosks.push(kiosk)

	return {
		...state,
		kiosks: newKiosks,
	}
})


export default ReduxComposeFactory({  }, getState)