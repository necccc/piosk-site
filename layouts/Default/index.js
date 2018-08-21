import React from 'react'
import Route from '../../components/Route'
import Header from '../../components/Header'
import routing from '../../routing'
import Head from 'next/head'
import css from "./styles.scss"

class Layout extends React.Component {

  render () {
    const { children, showHeader = false } = this.props

    return <div>
        <Head>
          <title>Piosk</title>
          <meta charSet='utf-8' />
          <meta description='Remote managed web kiosk for Raspberry Pi' />
        </Head>
        <Route.Provider value={routing()}>

          {showHeader ? (
            <Header />
          ): ''}

          <main>
            {children}
          </main>
        </Route.Provider>
      </div>
  }
}

export default Layout