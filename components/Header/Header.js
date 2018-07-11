import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import Link from 'next/link'
import { Button, Dropdown, Menu } from 'semantic-ui-react'

// import { Input } from 'semantic-ui-react'

import HeaderSearch from '../Search/HeaderSearch/HeaderSearch'

import "./Header.less"

class Header extends React.Component {
  state = {
    activeItem: 'home'
  };
  
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { profile } = this.props;
    const { auth, activeItem } = this.state;

    const userIcon = <img src="./static/assets/images/Icons/icon-user.svg" />
    const loginLink = 'http://127.0.0.1/oauth/authorize/?client_id=2&redirect_uri=http://127.0.0.1:3000/token&response_type=code&scope=access-user-account';

    return (
      <Menu color="red" fixed="top" inverted className="SiteHeader">
        <Menu.Item name='logo' active={activeItem === 'logo'} onClick={this.handleItemClick}>
          <i className="icon logo" alt="Kushy logo"></i>
        </Menu.Item>
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
                <Link href={ '/user/' + profile.username }>
                <Dropdown.Item>
                    Dashboard
                </Dropdown.Item>
                </Link>
                  <Link href={ '/logout' }>
                <Dropdown.Item>
                    Logout
                </Dropdown.Item>
                  </Link>
              </Dropdown.Menu>
            </Dropdown>
          : 
            <Menu.Item>
              <Link href={loginLink}>
                <Button primary>Sign Up</Button>
              </Link>
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