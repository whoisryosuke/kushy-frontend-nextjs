import React from 'react'
import { connect } from 'react-redux'
import ShopArchive from 'layouts/Archive/Archive'
import KushyApi from 'utils/KushyApi'
import PostLoop from 'containers/PostLoop'

class BrandArchivePage extends React.Component {
    static async getInitialProps({ reduxStore, req, query: { slug } }) {
        const api = new KushyApi();

        let categories, brands

        const params = `?include=categories`
        await api.getAll('brands', params)
            .then((results) => (
                brands = results
            ))

        const categoryParams = '?filter[section]=product'
        await api.getAll('categories', categoryParams)
            .then((results) => (
                categories = results
            ))

        return {
            brands,
            categories
        }
    }

    render() {
        const { brands, categories } = this.props

        const header = <h1 className="ui header">Browsing "<span className="text red">brands</span>"</h1>

        return (
            <ShopArchive header={ header } categories={ categories }>
                <section className="ui container pt3">
                    <h1 className="ui header">Featured Brands</h1>
                    <section className="ui centered pt1">
                        <PostLoop data={brands.data} section="brands" count="3" />
                    </section>
                    <section className="ui grid center">
                        <section className="center aligned column">
                            <a href="/brands/">See more local brands</a>
                        </section>
                    </section>
                </section>

                <section className="ui container pt3">
                    <h1 className="ui header">Latest Brands</h1>
                    <section className="ui centered pt1">
                        <PostLoop data={brands.data} section="brands" count="3" />
                    </section>
                    <section className="ui grid center">
                        <section className="center aligned column">
                            <a href="/brands/">See more local brands</a>
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

export default connect(mapStateToProps)(BrandArchivePage)