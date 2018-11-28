import React, { Component } from 'react'
import Router from 'next/router'
import { Button, Dropdown } from 'semantic-ui-react'
import objectToString from "utils/objectToString";

import queryString from 'query-string'

export default class SearchPageFilters extends Component {
  constructor(props) {
    super(props)
    let url = this.parseUrl();
    const options = {
      'created_at': 'latest',
      '-created_at': 'oldest',
      'rating': 'top',
      '-rating': 'lowest'
    }
    this.state = {
      order: url.sort ? options[url.sort] : 'latest',
      section: url['filter[section]'] ? url['filter[section]'] : null
    }
  }

  parseUrl() {
    let url = Router.asPath.replace('/search/', '')
    return queryString.parse(url)
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = e => {
    e.preventDefault()
    const { order, section } = this.state
    let url = this.parseUrl()
    console.log('parsed url', url)

    // Create query param from filters
    // Manually for simplicity
    if(section) {
      url['filter[section]'] = this.state.section
    }
    if(order) {
      switch(order) {
        case 'latest':
        url.sort = 'created_at'
        break;
        
        case 'oldest':
        url.sort = '-created_at'
        break;

        case 'top':
        url.sort = 'rating'
        break;

        case 'lowest':
        url.sort = '-rating'
        break;
      }
    }

    let params = objectToString(url, '&')
    console.log("query url", `${Router.pathname}?${params}`);
    Router.push(`/search/?${params}`)
  }

  render() {
    const { order, section } = this.state
    const { search } = this.props

    const orderOptions = [
      {
        text: 'Latest',
        value: 'latest',
        id: 'latest'
      },
      {
        text: 'Oldest',
        value: 'oldest',
        id: 'oldest'
      },
      {
        text: 'Top Rated',
        value: 'top',
        id: 'top'
      },
      {
        text: 'Lowest Rated',
        value: 'lowest',
        id: 'lowest'
      },
    ]
    const sectionOptions = [
      {
        text: 'Shop',
        value: 'shop',
        id: 'shop'
      },
      {
        text: 'Product',
        value: 'product',
        id: 'product'
      },
      {
        text: 'Brand',
        value: 'brand',
        id: 'brand'
      },
      {
        text: 'Strain',
        value: 'strain',
        id: 'strain'
      },
    ]
    
    return <form name="SearchFilters" method="GET" action="/search/" class="ui form">
        <section class="two fields">
          <section class="field">
            <Dropdown name="order" placeholder="Order by..." fluid selection options={orderOptions} onChange={this.handleChange} value={order} />
          </section>
          <section class="field">
            <Dropdown name="section" placeholder="Select a section..." fluid selection options={sectionOptions} onChange={this.handleChange} value={section} />
          </section>
          <input type="hidden" name="search" value={search} />
          {/* <input
              type="hidden"
              name="geo_location" 
              value={ geo_location }
            />
            <input
              type="hidden"
              name="geo_lat" 
              value={ geo_lat }
            />
            <input
              type="hidden"
              name="geo_lng" 
              value={ geo_lng }
            /> */}
          <section class="field">
            <Button onClick={this.handleSubmit} submit color="red">
              Update Search
            </Button>
          </section>
        </section>
      </form>;
  }
}
