import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withPageCookie from 'utils/withPageCookie'
import { getCookie } from "utils/Cookies";
import KushyApi from 'utils/KushyApi'
import { throws } from 'assert';

class UserSettings extends Component {
  state = {
    name: this.props.user.name,
    email: this.props.user.email,
    newEmail: '',
    password: '',
    password_confirmation: '',
    oldPassword: '',
    social: {
      twitter: '',
      facebook: '',
      tumblr: '',
      instagram: ''
    }
  }

  static propTypes = {
    /**
     * User profile object
     */
    user: PropTypes.object.isRequired
  }

  /**
   * Submit any tracked input data to API
   */
  submitAccount = (e) => {
    e.preventDefault()
    // Change form to loading
    this.setState({ loading: true })

    const api = new KushyApi();
    // User endpoint requires token, 
    // attach to headers before fetching
    const token = getCookie('kushyFToken', null)
    api.setToken(token);
    console.log(token);
    // Query API with token and submit account settings from state
    api.postUserAccountSettings(this.props.user.id, this.state)
      .then((results) => {
        console.log(results)
        return results
      })
      .then((results) => (
        this.setState({ 
          loading: false,
          results
        })
      ));

  }

  /**
   * Add input to state when user types
   */
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { user } = this.props

    return (
      <article id="settings" className="ui segment">

        <h2 className="ui header">Account</h2>
        <p>Change basic account settings</p>
        <form name="settingsAccount" onSubmit={ this.submitAccount } action="/dashboard/settings/" method="POST" className="ui form">

          <section className="field">
            <label>
              Name:
            </label>
            <input type="text" name="name" value={this.state.name} placeholder={user.name} onChange={ this.handleChange } required />
          </section>
          <section className="field">
            <label>
              Old Email:
            </label>
            <input type="text" name="email" value={this.state.email} disabled />
          </section>
          <section className="field">
            <label>
              New Email:
            </label>
            <input type="text" name="newEmail" value={this.state.newEmail} placeholder={user.email} onChange={this.handleChange} />
          </section>
          <button type="submit" className="ui submit button fluid">
            Update Info
        </button>
        </form>

        <hr />

        <h2 className="ui header">Social</h2>
        <p>Add social media to profile.</p>
        <form name="socialSettings" action="/dashboard/settings/" method="POST" className="ui form">


          <section className="field">
            <label>
              Twitter:
            </label>
            <section className="ui labeled input">
              <div className="ui label">
                twitter.com/@
                </div>
              <input type="text" name="social[twitter]" placeholder={ user.social ? twitter : 'TwitterUser' } value={this.state.social.twitter} onChange={ this.handleChange } />
            </section>
          </section>
          <section className="field">
            <label>
              Instagram:
            </label>
            <section className="ui labeled input">
              <div className="ui label">
                instagram.com/@
                </div>
              <input type="text" name="instagram" placeholder={ user.social ? instagram : "Instaweed" } value={ this.state.social.instagram } onChange={ this.handleChange } />
            </section>
          </section>
          <section className="field">
            <label>
              Facebook:
            </label>
            <section className="ui labeled input">
              <div className="ui label">
                facebook.com/
                </div>
              <input type="text" name="facebook" placeholder={ user.social ? facebook : "FacebookUsername" } value={ this.state.social.facebook } onChange={ this.handleChange } />
            </section>
            <section className="field">
              <label>
                Tumblr:
            </label>
              <section className="ui labeled right input">
                <input type="text" name="tumblr" placeholder={ user.social ? tumblr : "TumblrUsername" } value={ this.state.social.tumblr } onChange={ this.handleChange } />
                <div className="ui label">
                  .tumblr.com/
                </div>
              </section>
            </section>
          </section>
          <section className="field">
            <button type="submit" name="submitSocial" value="submitSocial" className="ui submit button fluid">
              Update Info
            </button>
          </section>
        </form>

        <hr />

        <h2 className="ui header">Change Password</h2>
        <p>Change basic account settings</p>
        <form name="passwordChange" action="/dashboard/settings/" method="POST" className="ui form">

          <section className="field">
            <label>
              Old Password:
            </label>
            <input type="password" name="oldPassword" value={this.state.oldPassword } onChange={ this.handleChange } />
          </section>
          <section className="field">
            <label>
              New Password:
            </label>
            <input type="password" name="password" value={this.state.password} onChange={ this.handleChange } />
          </section>
          <section className="field">
            <label>
              Repeat Password:
            </label>
            <input type="password" name="password_confirmation" value={this.state.password_confirmation} onChange={ this.handleChange } />
          </section>
          <section className="field">
            <button type="submit" className="ui submit button fluid">
              Update Password
            </button>
          </section>
        </form>

        <hr />


        <h2 className="ui header">Change Avatar</h2>
        <p>We recommend a square image that's a JPG, JPEG, PNG file under 300kbs.</p>
        <form name="settingsAvatar" action="/dashboard/settings/" enctype="multipart/form-data" method="POST" className="ui form">

          <section className="field">
            <label>
              Select your Avatar here:
            </label>
            <input type="file" name="newAvatar" className="FormField__upload" />
          </section>
          <section className="field">
            <button type="submit" value="updateAvatar" className="ui submit button fluid">
              Update Avatar
            </button>
          </section>
        </form>

        <hr />


        <h2 className="ui header">Change Profile Pic</h2>
        <p>We recommend a square image that's a JPG, JPEG, PNG file under 500kbs.</p>
        <form name="settingsAvatar" action="/dashboard/settings/" enctype="multipart/form-data" method="POST" className="ui form">

          <section className="field">
            <label>
              Select your Profile Picture here:
            </label>
            <input type="file" name="newProfilePic" className="FormField__upload" />
          </section>
          <section className="field">
            <button type="submit" value="updateProfilePic" className="ui submit button fluid">
              Update Avatar
            </button>
          </section>
        </form>

      </article>
    )
  }
}

export default withPageCookie(UserSettings)