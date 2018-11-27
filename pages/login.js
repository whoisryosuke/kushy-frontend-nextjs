import React from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose';
import { userActions } from '../actions';

class Login extends React.Component {
  static getInitialProps ({ reduxStore, req }) {
    return {}
  }

  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    const {dispatch} = this.props
  }

  handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {dispatch} = this.props

    // dispatch login here
    dispatch(userActions.login(this.state.username, this.state.password));
  }

  render () {
     const { classes, theme, loggedIn } = this.props;
    return (
      <section>
          <main>
            <div>
              <form onSubmit={ this.handleSubmit } className="ui form">
                  <section className="field">
                      <label>Username:</label>
                      <input 
                          name="username" 
                          type="text" 
                          value={ this.state.username } 
                          onChange={ this.handleChange } 
                      />
                  </section>

                  <section className="field">
                      <label>Password:</label>
                      <input 
                          name="password" 
                          type="text" 
                          value={ this.state.password } 
                          onChange={ this.handleChange } 
                      />
                  </section>
                    <button onClick={ this.handleSubmit }>
                      Submit
                    </button>
              </form>
            </div>
          </main> 
      </section>
    )
  }
}

export default compose(
  connect(state => ({
    profile: state.user.profile,
  })),
)(Login);
