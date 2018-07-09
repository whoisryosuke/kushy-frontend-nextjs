import React, {Component} from 'react'
import Router from 'next/router'
import TokenContext from '../context/TokenContext'
import { getCookie } from '../utils/Cookies'

export default function withAuth(AuthComponent) {
    return class Authenticated extends Component {

      static async getInitialProps(ctx) {
        const token = getCookie('kushyFToken', ctx.req)
        // Check if Page has a `getInitialProps`; if so, call it.
        const pageProps = AuthComponent.getInitialProps && await AuthComponent.getInitialProps(ctx);
        // Return props.
        return { ...pageProps, token }
      }

      constructor(props) {
        super(props)
        this.state = {
          isLoading: true
        };
      }

      componentDidMount () {
        if (!this.props.token) {
          Router.push('/')
        }
        this.setState({ isLoading: false })
      }

      render() {
        return (
          <div>
          {this.state.isLoading ? (
              <div>LOADING....</div>
            ) : (
              <TokenContext.Provider value={this.props.token}>
                <AuthComponent {...this.props} />
              </TokenContext.Provider>
            )}
          </div>
        )
      }
    }
}
