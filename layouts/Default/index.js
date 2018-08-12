import React from 'react'

import css from "./styles.scss"

class Layout extends React.Component {

  render () {
    const { children } = this.props

    return <div>
          <main className="bx--grid">
            {children}
          </main>
      </div>
  }
}



export default Layout