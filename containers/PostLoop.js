import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { postsActions } from '../actions';

import { Card } from 'semantic-ui-react'
import PostCard from '../components/PostCard/PostCard'

export class PostLoop extends Component {
  static propTypes = {
    prop: PropTypes,
    section: PropTypes.string,
    count: PropTypes.number
  }
  
  componentDidMount()
  {
    const {dispatch} = this.props
    if(this.props.section)
    {
        dispatch(postsActions.getPosts(this.props.section));
    }
  }

  render() {
      const cards = this.props.posts[this.props.section] && this.props.posts[this.props.section].data ? this.props.posts[this.props.section].data.slice(0, this.props.count).map((data) => (
          <PostCard key={ data.id } section={ this.props.section } data={ data } />
      )) : '';
    
    return (
      <Card.Group itemsPerRow={this.props.count} centered stackable>
          { cards }
      </Card.Group>
    )
  }
}

const mapStateToProps = (state) => {
  const { posts } = state
  return {
      posts
  }
}

export default connect(mapStateToProps)(PostLoop)
