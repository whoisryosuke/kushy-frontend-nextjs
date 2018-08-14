import React, {Component} from 'react'
import { getCookie } from 'utils/Cookies'

export default function withCookie(WrappedComponent) {
    return class IsLoggedIn extends Component {

      render() {
        const token = getCookie("kushyFToken");
        const loggedIn = token ? true : false;
        return (
          <WrappedComponent token={token} loggedIn={loggedIn} />
        )
      }
    }
}
