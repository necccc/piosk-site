import ReduxComposeFactory, { createState } from '../../store'

const DEFAULT_STATE = {

}

const { action, getState } = createState('client', DEFAULT_STATE)



export default ReduxComposeFactory({  }, getState)