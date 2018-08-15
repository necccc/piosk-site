
import { Context } from './index'

export default function (Component) {
	return (<Context.Consumer>
		{auth => <Component auth={auth} />}
	</Context.Consumer>)
}