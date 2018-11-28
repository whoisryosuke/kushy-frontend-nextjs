import React from 'react'
import { connect } from 'react-redux'
import { compose } from "recompose";
import Router from 'next/router'
import SearchWrapper from "layouts/Search/SearchWrapper";
import KushyApi from 'utils/KushyApi'
import objectToString from "utils/objectToString";
import withPageCookie from "utils/withPageCookie";
import queryString from 'query-string'

import PostLoop from "containers/PostLoop";

class SearchIndexPage extends React.Component {
  static async getInitialProps({ reduxStore, req }) {
    const api = new KushyApi();
    const url = req.url.replace('/search/', '')
    const queryParams = queryString.parse(url)
    // Make sure to include categories in query
    queryParams.include = 'categories'
    const searchParams = objectToString(queryParams, '&')

    let search
    if (searchParams) {
      await api
        .search(searchParams)
        .then(results => (search = results.data));

      if (!search) {
        // @todo: redirect
      }
    }

    return {
      search
    }
  }

  render() {
    const { search, profile } = this.props;
    console.log('search results', search);
    return (
      <SearchWrapper user={profile}>
        <PostLoop data={search} count="10" />      
      </SearchWrapper>
    )
  }
}

function mapStateToProps(state) {
  const { users: { profile } } = state
  return {
    profile
  }
}

export default compose(
  withPageCookie,
  connect(mapStateToProps)
)(SearchIndexPage);
