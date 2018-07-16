import React, { Component } from 'react'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

import MenuHeader from 'components/ShopMenu/ShopMenuHeader/ShopMenuHeader'
import MenuContent from 'components/ShopMenu/ShopMenuContent/ShopMenuContent'

export default class ShopMenu extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            sortedMenu: false,
            categoryList: false
        }
    }
    /**
     * Factory function for nested map to insert 
     */
    sortCategories(sortedMenu, categoryList)
    {
        return function (product) {
            let category = product.categories[0]
            
            if (sortedMenu[category] === undefined) {
                sortedMenu[category] = {
                    name: category,
                    results: []
                }
            }

            // add result to category list array
            // dupe check
            if(!categoryList.includes(category))
            {
                categoryList.push(category);
            }
            // add result to category
            sortedMenu[category].results.push(product);

            return {
                [category]: {
                    product
                }
            }
        }
    }
    componentDidMount() {
        const { inventory } = this.props;

        if (inventory.data && inventory.data.length > 0)
        {
            /**
             * Works by using map + factory function, which allows the use of
             * additonal parameters. In this case, we pass a blank array to fill
             * so we can push the mapped entries into it
             */
            let sortedMenu = []
            let categoryList = []
            inventory.data.map(this.sortCategories(sortedMenu, categoryList))
            this.setState({ sortedMenu, categoryList })
        }
    }
  render() {
        if(this.state.sortedMenu)
        {
            let sortedMenu = this.state.categoryList.map(section => {
                return (
                <form action="/cart/{{ product.slug }}/add" method="POST">
                    <Table padded sortable>
                        <MenuHeader section={ section.toLowerCase() } />
                        <MenuContent 
                            section={ section.toLowerCase() }
                            data={ this.state.sortedMenu[section].results }
                        />
                    </Table>
                </form>
            )})

            return sortedMenu
        }
  return (
    <div>
        <p>All the weed is gone! Just kidding.</p>
    </div>
  )
  }
}