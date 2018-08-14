import React from 'react'
import Route from '../../components/Route'
import routing from '../../routing'

import css from "./styles.scss"

class Layout extends React.Component {

  render () {
    const { children } = this.props

    return <div>
        <Route.Provider value={routing()}>
          <main className="bx--grid">
            {children}
          </main>
        </Route.Provider>
      </div>
  }
}

export default Layout