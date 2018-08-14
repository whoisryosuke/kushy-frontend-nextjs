import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import { compose } from "recompose";
import Link from 'next/link'
import Router from 'next/router'
import { Button, Dropdown, Menu } from 'semantic-ui-react'
import config from "config/config"
import withCookie from "utils/withCookie";

// import { Input } from 'semantic-ui-react'

import HeaderSearch from '../Search/HeaderSearch/HeaderSearch'

import "./Header.css"

class Header extends React.Component {
  state = {
    activeItem: "home"
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleLogin = e => Router.push(config.kushyLogin);

  render() {
    const { profile, loggedIn } = this.props;
    const { activeItem } = this.state;

    const userIcon = (
      <img src="http://localhost:3000/static/assets/images/Icons/icon-user.svg" />
    );

    return (
      <Menu color="red" fixed="top" inverted className="SiteHeader">
        <Link href="/" passHref>
          <Menu.Item as="a" name="logo" active={activeItem === "logo"}>
            <i className="icon logo" alt="Kushy logo" />
          </Menu.Item>
        </Link>
        <Menu.Item name="search">
          <div className="HeaderSearch tablet only">
            <HeaderSearch />
          </div>
        </Menu.Item>

        <Menu.Menu position="right">
          {loggedIn ? (
            <Dropdown item trigger={userIcon}>
              <Dropdown.Menu>
                <Link href={"/dashboard/"} passHref>
                  <Dropdown.Item>Dashboard</Dropdown.Item>
                </Link>
                <Link href={"/logout"} passHref>
                  <Dropdown.Item>Logout</Dropdown.Item>
                </Link>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Menu.Item>
              <Button primary onClick={this.handleLogin}>
                Login
              </Button>
            </Menu.Item>
          )}
        </Menu.Menu>
      </Menu>
    );
  }
}

function mapStateToProps (state) {
  const { users: { profile } } = state
  return { profile };
}

export default compose(
  withCookie,
  connect(mapStateToProps)
)(Header);