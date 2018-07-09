import React, {Component} from 'react'

import TokenContext from '../context/TokenContext'

export default function withToken(WrappedComponent) {
    return class Authenticated extends Component {
      render() {
        return (
            <TokenContext.Consumer>
                {token => <WrappedComponent {...this.props} token={token} /> }
            </TokenContext.Consumer>
        )
      }
    }
}