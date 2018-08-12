import ReduxComposeFactory, { createState } from '../../store'

const DEFAULT_STATE = {
	name: '',
	pages: []
}

const { action, getState } = createState('kiosk', DEFAULT_STATE)



export default ReduxComposeFactory({  }, getState)