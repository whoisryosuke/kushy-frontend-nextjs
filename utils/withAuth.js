import React, {Component} from 'react'
import Router from 'next/router'
import TokenContext from '../context/TokenContext'
import { getCookie } from '../utils/Cookies'
import ServerRedirect from 'utils/ServerRedirect'
import KushyApi from 'utils/KushyApi'

export default function withAuth(AuthComponent) {
    return class Authenticated extends Component {

      static async getInitialProps(ctx) {
        const token = getCookie('kushyFToken', ctx.req)

        // If user doesn't have a token, redirect away
        if(!token)
        {
          return ServerRedirect('/', ctx.res)
        }

        const api = new KushyApi();
        // User endpoint requires token, 
        // attach to headers before fetching
        api.setToken(token);
        // Query API for token and get user profile
        let user
        await api.getUser()
          .then((results) => (
            user = results
          ));

        // If token doesn't work, redirect away
        if (!user) {
          return ServerRedirect('/', ctx.res)
        }

        // Check if Page has a `getInitialProps`; if so, call it.
        const pageProps = AuthComponent.getInitialProps && await AuthComponent.getInitialProps(ctx);
        // Return props.
        return { ...pageProps, token, user }
      }

      render() {
        return (
          <TokenContext.Provider value={this.props.token}>
            <AuthComponent {...this.props} />
          </TokenContext.Provider>
        )
      }
    }
}
