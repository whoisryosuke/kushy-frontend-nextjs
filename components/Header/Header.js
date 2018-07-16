import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import Link from 'next/link'
import Router from 'next/router'
import { Button, Dropdown, Menu } from 'semantic-ui-react'

// import { Input } from 'semantic-ui-react'

import HeaderSearch from '../Search/HeaderSearch/HeaderSearch'

import "./Header.less"

class Header extends React.Component {
  state = {
    activeItem: 'home'
  };
  
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleLogin = (e) => Router.push('http://127.0.0.1/oauth/authorize/?client_id=2&redirect_uri=http://127.0.0.1:3000/token&response_type=code&scope=access-user-account')

  render() {
    const { profile } = this.props;
    const { activeItem } = this.state;
    // console.log(profile);

    const userIcon = <img src="http://localhost:3000/static/assets/images/Icons/icon-user.svg" />

    return (
      <Menu color="red" fixed="top" inverted className="SiteHeader">
        <Link href="/" passHref>
          <Menu.Item as="a" name='logo' active={activeItem === 'logo'}>
            <i className="icon logo" alt="Kushy logo"></i>
          </Menu.Item>
        </Link>
        <Menu.Item
          name='search'
        >
          <div className="HeaderSearch tablet only">
            <HeaderSearch />
          </div>
        </Menu.Item>

        <Menu.Menu position='right'>
          {profile ? 
            <Dropdown item trigger={userIcon}>
              <Dropdown.Menu>
                <Link href={ '/dashboard/' } passHref>
                  <Dropdown.Item>
                      Dashboard
                  </Dropdown.Item>
                </Link>
                  <Link href={ '/logout' } passHref>
                    <Dropdown.Item>
                        Logout
                    </Dropdown.Item>
                  </Link>
              </Dropdown.Menu>
            </Dropdown>
          : 
            <Menu.Item>
                <Button primary onClick={ this.handleLogin }>Login</Button>
            </Menu.Item>}
        </Menu.Menu>
      </Menu>
    );
  }
}

function mapStateToProps (state) {
  const { authentication: { user } } = state
  return { user }
}

export default connect(mapStateToProps)(Header);