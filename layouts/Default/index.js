import React from 'react'
import Route from '../../components/Route'
import Header from '../../components/Header'
import routing from '../../routing'

import css from "./styles.scss"

class Layout extends React.Component {

  render () {
    const { children, showHeader = false } = this.props

    return <div>
        <Route.Provider value={routing()}>

          {showHeader ? (
            <Header><h1>Piosk</h1></Header>
          ): ''}

          <main>
            {children}
          </main>
        </Route.Provider>
      </div>
  }
}

export default Layout