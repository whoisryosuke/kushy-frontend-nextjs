import React from 'react'
import { connect } from 'react-redux'
import ShopArchive from 'layouts/Archive/Archive'
import KushyApi from 'utils/KushyApi'
import PostLoop from 'containers/PostLoop'

class ProductArchivePage extends React.Component {
    static async getInitialProps({ reduxStore, req, query: { slug } }) {
        const api = new KushyApi();

        let categories, products

        const params = `?include=categories`
        await api.getAll('products', params)
            .then((results) => (
                products = results
            ))

        const categoryParams = '?filter[section]=product'
        await api.getAll('categories', categoryParams)
            .then((results) => (
                categories = results
            ))

        return {
            products,
            categories
        }
    }

    render() {
        const { products, categories } = this.props

        const header = <h1 className="ui header">Browsing "<span className="text red">products</span>"</h1>

        return (
            <ShopArchive header={ header } categories={ categories }>
                <section className="ui container pt3">
                    <h1 className="ui header">Featured Products</h1>
                    <section className="ui centered pt1">
                        <PostLoop data={products.data} section="products" count="3" />
                    </section>
                    <section className="ui grid center">
                        <section className="center aligned column">
                            <a href="/products/">See more local products</a>
                        </section>
                    </section>
                </section>

                <section className="ui container pt3">
                    <h1 className="ui header">Latest Products</h1>
                    <section className="ui centered pt1">
                        <PostLoop data={products.data} section="products" count="3" />
                    </section>
                    <section className="ui grid center">
                        <section className="center aligned column">
                            <a href="/products/">See more local products</a>
                        </section>
                    </section>
                </section>
            </ShopArchive>
        )
    }
}

function mapStateToProps(state) {
    const { users: { profile } } = state
    return {
        profile
    }
}

export default connect(mapStateToProps)(ProductArchivePage)