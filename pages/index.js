import React from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import Main from '../layouts/Main/Main'
import KushyApi from '../utils/KushyApi'

import PostLoop from '../containers/PostLoop'

class Index extends React.Component {
  static getInitialProps ({ reduxStore, req }) {
    const isServer = !!req

    return {}
  }
  constructor(props)
  {
    super(props);
    const api = new KushyApi();
    this.state = {
      api
    }
  }

  componentDidMount () {

    // Need location name + list of cities
    let cities = [];
    this.state.api.getAll('state')
        .then((states) => {
            this.setState({
                states
            })
            return states
        })
        .then((states) => {
            /**
             * Loop through cities object and turn into array
             */
            if(states.cities)
            {
                for(let city in states.cities)
                {
                        cities.push(states.cities[city])
                }
                return cities
            }
        })
        .then((cities) =>
            this.setState({
                cities
            })
        );

    // Grab products
    this.state.api.getAll('products')
        .then((products) =>
            this.setState({
                products: products.data
            })
        );

    // Grab product categories
    let categories = this.state.api.getAll('categories', '?section=product');

    // Grab all user activity

  }

  render () {
    const { profile } = this.props
    console.log(this.state)

    const cities = this.state.cities && this.state.states ? this.state.cities.slice(0, 7).map((city) => (
              <a href={`/${ city.slug }/${ this.state.states.slug}`} className="item">
                  { city.title }
              </a>
            )) : '';

    const productCategories = this.state.categories ? this.state.categories.map((category) => (
              <a href={`/products/category/${ category.name }`} className="item">
                  { category.name }
              </a>)) : '';

    return (
      <Main>
        <section className="FrontSearch ui grid">
          <div className="FrontSearch__content ui container centered">
              <h1 className="h-ultra">Find what you need with weed</h1>
              <form action="/search/" method="GET" className="row">
                  <div className="ui three column stackable grid">
                      <div className="column">
                          <div className="ui search" id="FrontpageSearch">
                              <div className="ui left icon input fluid">
                                  <input 
                                      type="text" 
                                      placeholder="What are you looking for?" 
                                      name="search"
                                      className="ui prompt input__input"
                                  />
                                  <i className="search icon"></i>
                              </div>
                          </div>
                      </div>
                      <div className="column">
                          <div className="ui left icon input fluid">
                              <input 
                                  type="text" 
                                  placeholder="Los Angeles, CA"
                                  className="ui input__input"
                                  id="input_location" 
                                  name="location"
                              />
                              <i className="map outline icon"></i>
                          </div>
                      </div>
                      <div className="column">
                          <button
                              type="submit"
                              name="submit"
                              className="ui red button fluid"
                          >
                              Search
                          </button>
                      </div>
                  </div>
                  <input type="hidden" className="geo_location" name="geo_location" value="" />
                  <input type="hidden" className="geo_lat" name="geo_lat" value="" />
                  <input type="hidden" className="geo_lng" name="geo_lng" value="" />  
              </form>
              <navigation className="ui grid centered submenu">
                  <div className="ten wide computer sixteen wide mobile column">
                      <div className="ui secondary four item menu small stackable inverted">
                          <a href="/shops/" className="item">
                              <div className="ui labeled basic icon button inverted">
                                  <i className="building icon"></i>
                                  Shops
                              </div>
                          </a>
                          <a href="/products/" className="item">
                              <div className="ui labeled basic icon button inverted">
                                  <i className="shopping cart icon"></i>
                                  Products
                              </div>
                          </a>
                          <a href="/brands/" className="item">
                              <div className="ui labeled basic icon button inverted">
                                  <i className="industry icon"></i>
                                  Brands
                              </div>
                          </a>
                          <a href="/strains/" className="item">
                              <div className="ui labeled basic icon button inverted">
                                  <i className="leaf icon"></i>
                                  Strains
                              </div>
                          </a>
                      </div>
                  </div>
              </navigation>
          </div>
          <div className="Overlay"></div>
      </section>

      <section className="ui container pt3">
          <h1 className="ui header">Shops near California</h1>
          <nav className="ui secondary pointing menu">
              <a href="/california/los-angeles" className="active item">
                  Los Angeles
              </a>
              { cities ? cities : ''}
              <div className="right menu">
                  <a href="/locations/" className="ui item">
                      <i className="icon search"></i>
                      More cities
                  </a>
              </div>
          </nav>
          <section className="ui centered pt1">
            <PostLoop section="shops" count="3" />
          </section>
          <section className="ui grid center">
              <section className="center aligned column">
                  <a href="/shops/">See more local shops</a>
              </section>
          </section>
      </section>

     { profile ?
          <section className="ui red inverted segment cta pt2 mb2">
              <section className="cta__content ui grid">
                  <section className="eight wide column">
                      <h2>Reserve and review products from over 3,000 cannabis businesses</h2>
                      <p>Join our community and create your own customized profile. Gain access to essential privileges like posting reviews or preordering products.</p>

                      <a href="/register/" className="ui button">Create your account</a>
                              <a href="/login/facebook" className="ui facebook button icon mini" title="Sign in using Facebook">
                                  <i className="facebook icon"></i>
                              </a>
                              <a href="/login/twitter/" className="ui twitter button icon mini" title="Sign in using Twitter">
                                  <i className="twitter icon"></i>
                              </a>
                              <a href="/login/google" className="ui google plus button icon mini" title="Sign in using Google">
                                  <i className="google plus icon"></i>
                              </a>
                  </section>
                  <section className="eight wide column">
                      <img src="img/BusinessTour/widgets.png" alt="Manage your listing on the go with our mobile optimized interface" width="100%" />
                  </section>
              </section>
          </section> : ''
     }

      <section className="ui container pt2">
          <h1 className="ui header">New Products</h1>
          <nav className="ui secondary pointing menu">
              { productCategories }
          </nav>
          <section className="ui centered pt1">
            <PostLoop section="products" count="3" />
          </section>
          <section className="ui grid center">
              <section className="center aligned column">
                  <a href="/products/" className="">See more products</a>
              </section>
          </section>
      </section>

      <section className="ui grid pt2 mb2">
          <section className="ui red inverted segment cta cta--slim sixteen wide column" style={{ backgroundImage: "url({{ asset('img/Backgrounds/featured-leaves1.jpg') }}) !important", backgroundSize:'cover'}}>
              <section className="cta__padding ui container">
                  <h1 className="ui header inverted">Get the latest deals and news in you inbox</h1>
                  <form action="https://kushy.us17.list-manage.com/subscribe/post?u=6d8631d309db2ed0eae4958a2&amp;id=70b93af4e4" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="ui form validate inverted" target="_blank" novalidate>
                      <div id="mc_embed_signup_scroll" className="fields">
                      
                          <div className="twelve wide field">
                              <input type="email" value="" placeholder="youremail@420.com" name="EMAIL" className="required email" id="mce-EMAIL" />
                          </div>
                          <div id="mce-responses" className="clear">
                              <div className="response" id="mce-error-response" style={{display:'none'}}></div>
                              <div className="response" id="mce-success-response" style={{display:'none'}}></div>
                          </div>    
                          <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true">
                              <input type="text" name="b_6d8631d309db2ed0eae4958a2_70b93af4e4" tabindex="-1" value="" />
                          </div>
                          <div className="four wide field">
                              <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="ui button red fluid" />
                          </div>
                      </div>
                  </form>
              </section>
          </section>
      </section>


      <section className="ui container pt2">
          <h1 className="ui header">Latest Activity</h1>
          <section className="ui grid centered pt1">
              <section className="ui link three cards centered stackable">
                  @foreach ($activityFeed as $activity)
                      @include("components.activity.card.$activity->section", [ 'activity' => $activity ])
                  @endforeach
              </section>
          </section>
          <section className="ui grid center">
              <section className="center aligned column">
                  {profile ? 
                    <a href="/dashboard/activity" className="">See your activity feed</a>
                  :
                    <a href="/register" className="">Sign up today to share your experience</a>
                  }
              </section>
          </section>
      </section>
      </Main>
    )
  }
}

function mapStateToProps (state) {
  const { users: { profile } } = state
  return {
      profile
  }
}

export default connect(mapStateToProps)(Index)
