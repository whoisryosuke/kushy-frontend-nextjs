import React, { Component } from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
import KushyApi from 'utils/KushyApi'


export default class SearchExampleStandard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false
        }
    }
  componentWillMount() {
    this.resetComponent()
  }

    debounce = (func, wait = 100) => {
        console.log('running debounce');

        let timeout;
        return function (...args) {
            console.log('1 timing out function')

            clearTimeout(timeout);
            timeout = setTimeout(() => {
                console.log('timing out function')
                func.apply(this, args);
            }, wait);
        };
    }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  queryApi = () => {
      console.log('querying api')
      if (this.state.value.length < 1) return this.resetComponent()

      // Query API for results
      const api = new KushyApi()
      api.search('name', this.state.value)
          .then((results) => {
              // let filteredResults = [];
              let response = {
              }
              results.data.map((item) => {
                  var section = item.section.toUpperCase() || 'Unknown'

                  // create new section category
                  if (response[section] === undefined) {
                      response[section] = {
                          name: section,
                          results: []
                      };
                  }
                  // add result to category
                  response[section].results.push({
                      title: item.name,
                      image: item.featured_img,
                      url: item.slug
                  });

                  // filteredResults.push({
                  //     title: result.name,
                  //     image: result.featured_img,
                  //     category: result.categories[0].category.name
                  // })
              })
              return response
          })
          .then((results) => {
              this.setState({
                  isLoading: false,
                  results: results
              })
          })
  }

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })
    
    console.log('should be running debounce');
      timeout = setTimeout(() => {
          console.log('timing out function')
          this.queryApi()
      }, 420);
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
          <Search
            category
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
            {...this.props}
          />
    )
  }
}