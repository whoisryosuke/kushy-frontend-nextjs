import React, { Component } from 'react'
import Router from 'next/router'
import { Grid, Pagination } from "semantic-ui-react";

export default class PaginationMenu extends Component {
    constructor(props) {
        super()

        this.state = {
            activePage: props.active
        }
    }

  handlePaginationChange = (e, { activePage }) => {
      this.setState({ activePage })
      // @todo: Redux action to change page, so it's dynamic
      const redirect = `${this.props.redirect}&page=${activePage}`;
      Router.push(redirect);
  }

  render() {
    const { activePage } = this.state
    const { total } = this.props
    return (

        <Grid centered columns={1} verticalAlign='middle'>
            <Grid.Column>
                <Pagination
                    activePage={activePage}
                    onPageChange={this.handlePaginationChange}
                    totalPages={total}
                />
            </Grid.Column>
        </Grid>
    )
  }
}
