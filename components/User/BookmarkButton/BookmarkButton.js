import React, { Component } from 'react'
import PropTypes from "prop-types";
import { getCookie } from "utils/Cookies";
import KushyApi from "utils/KushyApi";

export default class BookmarkButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bookmark: false,
      loading: false,
      disabled: false
    }  
    this.checkBookmark();
  }

  /**
   * Check if user has bookmarked the item
   * and save the bookmark ID to state (to use for deleting)
   */
  checkBookmark = () => {
    this.setState({ loading: true, disabled: true });

    const api = new KushyApi();
    // User endpoint requires token,
    // attach to headers before fetching
    const token = getCookie("kushyFToken", null);
    api.setToken(token);
    // Query API with token and submit account settings from state
    if(token) {
      api
        .checkBookmark(this.props.user.id, this.props.id)
        .then(results => {
          return results;
        })
        .then(results => {
          if (results.data.length > 0) {
            // Save the bookmark ID to the state for use later
            this.setState({ bookmark: results.data[0].id });
          }
          this.setState({ loading: false, disabled: false });
        });
    }
  }

  
  postBookmark = (e) => {
    e.preventDefault()
    // Change form to loading
    this.setState({ loading: true, disabled: true });

    const api = new KushyApi();
    // User endpoint requires token, 
    // attach to headers before fetching
    const token = getCookie('kushyFToken', null)
    api.setToken(token);
    console.log(this.props.user.id, this.props.id)
    // Query API with token and submit account settings from state
    api.createBookmark(this.props.user.id, this.props.id)
      .then((results) => {
        return results
      })
      .then((results) => {

        this.setState({ loading: false, disabled: false });
        if ('id' in results.data) {
          this.setState({ bookmark: results.data.id })
        }

      });
  }

  removeBookmark = (e) => {
    this.setState({ loading: true, disabled: true });

    const api = new KushyApi();
    // User endpoint requires token,
    // attach to headers before fetching
    const token = getCookie("kushyFToken", null);
    api.setToken(token);
    // Query API with token and submit account settings from state
    api
      .removeBookmark(this.state.bookmark)
      .then(results => {
        return results;
      })
      .then(results => {
        this.setState({ loading: false, disabled: false });
        if (results.code) {
          // Remove bookmark from state and add response message to state for tooltip use
          this.setState({ bookmark: false, message: results.response });
        }
      });
  }

  render() {
    const { section, user } = this.props
    const loading = this.state.loading ? 'loading' : ''
    const clickEvent = this.state.bookmark ? this.removeBookmark : this.postBookmark;
    if(user) {
      return <button className={`BookmarkBtn ui button fluid ${loading}`} onClick={clickEvent} disabled={this.state.disabled}>
          {this.state.bookmark ? "Remove Bookmark" : "Add Bookmark"}
        </button>;
    }
    return (
      <a href="/register/" className="BookmarkBtn ui button fluid" title="Register today to bookmark your favorite shops and strains">
        Bookmark
      </a>
    )
  }
}
