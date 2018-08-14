import React, {Component} from 'react'
import { getCookie } from 'utils/Cookies'

export default function withPageCookie(WrappedComponent) {
    return class LoggedIn extends Component {

      static async getInitialProps(ctx) {
        const token = getCookie('kushyFToken', ctx.req)
        const loggedIn = token ? true : false

        // Check if Page has a `getInitialProps`; if so, call it.
        const pageProps = WrappedComponent.getInitialProps && await WrappedComponent.getInitialProps(ctx);
        // Return props.
        return { ...pageProps, loggedIn, token }
      }

      render() {
        return (
          <WrappedComponent {...this.props} />
        )
      }
    }
}
