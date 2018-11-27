import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { postsActions } from '../actions';

import { Card } from 'semantic-ui-react'
import PostCard from '../components/PostCard/PostCard'

export class PostLoop extends Component {
  static propTypes = {
    section: PropTypes.string,
    count: PropTypes.string
  }
  
  componentDidMount()
  {
    const {dispatch} = this.props
    if(!this.props.data && this.props.section)
    {
        dispatch(postsActions.getPosts(this.props.section));
    }
  }

  render() {
    const { posts, section, columns, count, data } = this.props;
    
    let loop = posts[section] && posts[section].data ? posts[section].data.slice(0, count) : null
    if(data)
    {
      loop = data.slice(0, count)
    }

    const cards = loop ? loop.map((data) => (
          <PostCard key={ data.id } section={ section } data={ data } />
      )) : '';

    if (this.props.section === 'strains') {
      return(
        <section class="ui grid centered">
          {cards}
        </section>
      )
    }
    return (
      <Card.Group itemsPerRow={columns} centered stackable>
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
