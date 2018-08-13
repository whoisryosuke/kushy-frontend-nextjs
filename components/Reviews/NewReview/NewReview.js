import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dimmer, Loader, Message, Rating } from "semantic-ui-react";
import KushyApi from '../../../utils/KushyApi';

export default class NewReview extends Component {
  static propTypes = {
    /**
     * The post ID
     */
    id: PropTypes.string.isRequired,

    /**
     * CSRF token for fetch headers
     */
    csrf: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = { 
      loading: false,
      error: false,
      rating: 3, 
      review: "", 
      post_id: props.id,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRate = this.handleRate.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit (e) {
    
    // Reset the state (messages, errors, loading, etc)
    this.setState({
      loading: true,
      newReview: false,
      error: false,
      errorMessage: '',
    })
    // this.api.postReview(this.state)

    fetch("http://localhost:3000/reviews/", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "CSRF-Token": this.props.csrf,
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(res => {
      // Check for success
      if (res.status === 200) {
        // @todo: reset rating
        this.setState({
          loading: false,
          review: ''
        })
      }
      return res
    })
    .then(res => res.json())
    .then(res => {
      // Check for any errors and show user
      if('error' in res)
      {
        this.setState({
          loading: false,
          error: true,
          errorMessage: res.error.message
        })
      } else {
        // Otherwise, set the new review ID so we can link the user to it
        this.setState({
          newReview: res.data.id
        })
      }
      return res
    });

    e.preventDefault()
  }

  /**
   * Changes state when user changes rating
   *
   * @memberof NewReview
   */
  handleRate = (e, { rating }) => {
    this.setState({ rating })
  }

  render() {
    const { id } = this.props
    return (
      <form onSubmit={ this.handleSubmit } method="POST" className="NewReviewForm ui form">
          <Dimmer active={this.state.loading} inverted>
            <Loader>
              Loading
            </Loader>
          </Dimmer>

          <Message
            success
            header='Thank you for sharing your review!'
            content="Your review has been posted and is public."
            hidden={Boolean(this.state.newReview)}
            visible={Boolean(this.state.newReview)}
          />

          <Message
            error
            header='There was a problem with that request'
            content={ this.state.errorMessage }
            hidden={this.state.error}
            visible={this.state.error}
          />

          <section className="field">
            <label>Rate your experience:</label>
            <Rating icon='star' defaultRating={3} maxRating={5} onRate={this.handleRate} />
          </section>

          <section className="field">
              <label>How was your experience?:</label>
              <textarea 
                  placeholder="This shop was pretty dank..."
                  name="review"
                  id="review"
                  cols="45" 
                  rows="4" 
                  maxLength="15360" 
                  aria-required="true" 
                  required="required" 
                  minLength="15"
                  onChange={ this.handleChange }
              >{ this.state.review }</textarea>
          </section>

          <button
              type="submit"
              className="ui button red fluid submit"
          >
              Submit Your Review
          </button>
      </form>
    )
  }
}
