import React, { Component } from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
import KushyApi from 'utils/KushyApi'

const api = new KushyApi()

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

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      // Query API for results
      api.search('name', this.state.value)
        .then((results) => {
            // let filteredResults = [];
            let response = {
                }
                console.log(results)
            results.data.map((item) => {
                console.log(item)
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
                    console.log(response)

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

    }, 300)
  }

  debounce = (func, wait = 100) => {
      let timeout;
      return function (...args) {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
              func.apply(this, args);
          }, wait);
      };
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
          <Search
            category
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.debounce(this.handleSearchChange, 500, { leading: true })}
            results={results}
            value={value}
            {...this.props}
          />
    )
  }
}