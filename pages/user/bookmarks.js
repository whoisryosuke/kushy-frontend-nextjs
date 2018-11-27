import React from 'react'
import UserDashboard from 'layouts/User/Dashboard/Dashboard'
import { getCookie } from 'utils/Cookies'
import withAuth from 'utils/withAuth'
import KushyApi from 'utils/KushyApi'
import ucfirst from 'utils/ucfirst'

class DashboardBookmarks extends React.Component {

  static async getInitialProps({ reduxStore, req }) {
    const token = getCookie('kushyFToken', req)

    const api = new KushyApi();
    // User endpoint requires token, 
    // attach to headers before fetching
    api.setToken(token);
    // Query API for token and get user profile
    let bookmarks;
    await api.getUserBookmarks()
      .then((results) => (
        bookmarks = results
      ));

    return {
      bookmarks
    }
  }

  onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  }
  
  render() {
    console.log(this.props.bookmarks);
    const { user, bookmarks } = this.props;
    // const reviewsItems = reviews && reviews.data.length > 0 ? reviews.data.map((review) => <ReviewFeedItem review={review} user={user} postName />) : ''

    // Sort bookmarks by their section (shops, products, etc)
    // Generates sorted object of each section and an array of bookmarks
    const bookmarkItems = {}
    const bookmarkSections = []
    bookmarks.data.map((bookmark) => {
      // Add section
      bookmarkSections.push(bookmark.includes.post.section)

      // Adds bookmark into section
      // Check if property exists, if not, create empty array to push into
      if (!bookmarkItems[bookmark.includes.post.section]) {
        bookmarkItems[bookmark.includes.post.section] = []
      }
      bookmarkItems[bookmark.includes.post.section].push(bookmark)
    })
    // Filter section array and make unique 
    bookmarkSections.filter(this.onlyUnique)

    const bookmarkFeed = bookmarkSections.map((section => {
      let list = bookmarkItems[section].map(sectionBookmarks => (
        <a href="#" className="item">{sectionBookmarks.includes.post.name}</a>
      ));
      return (
        <div>
          <h1>{ucfirst(section)}s</h1>
          <nav className="ui vertical menu">
            {list}
          </nav>
        </div>
      );
    }));

    return (
      <UserDashboard section="bookmarks" user={this.props.user}>
        <article id="bookmarks" className="ui segment">
          {bookmarkFeed ?

            <section className="ui feed">
              {bookmarkFeed}
            </section>
            :
            <section className="content">
              <p>No bookmarks found</p>
              <p>
                <em>
                  Try reviewing your favorite <a href="/shops/">shops</a>, <a href="/strains/">strains</a>, <a href="/brands/">brands</a>, and <a href="/products/">products</a>.
                      </em>
              </p>
            </section>
          }
        </article>
      </UserDashboard>
    )
  }
}

export default withAuth(DashboardBookmarks);