import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userActions } from '../actions';
import withToken from '../utils/withToken'
import Header from '../components/Header/Header'

class HeaderContainer extends Component {
  
  componentDidMount()
  {
    const { dispatch, token } = this.props
    dispatch(userActions.getUser(token))
  }

  render() {
    return (
      <Header { ...this.props } />
    )
  }
}

function mapStateToProps (state) {
  const { users: { profile } } = state
  return {
      profile
  }
}

export default connect(mapStateToProps)(withToken(HeaderContainer))
