import React from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import ShopArchive from 'layouts/Shops/ShopArchive/ShopArchive'
import KushyApi from 'utils/KushyApi'
import PostLoop from 'containers/PostLoop'

class ShopArchivePage extends React.Component {
    static async getInitialProps({ reduxStore, req, query: { slug } }) {
        const api = new KushyApi();

        let categories, shops

        const params = `?include=categories`
        await api.getAll('shops', params)
            .then((results) => (
                shops = results
            ))

        const categoryParams = '?filter[section]=shop'
        await api.getAll('categories', categoryParams)
            .then((results) => (
                categories = results
            ))

        return {
            shops,
            categories
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            section: 'reviews'
        }
    }

    render() {
        const { shops, categories } = this.props

        const header = <h1 className="ui header">Browsing "<span className="text red">shops</span>"</h1>

        return (
            <ShopArchive header={ header } categories={ categories }>
                <section className="ui container pt3">
                    <h1 className="ui header">Featured Shops</h1>
                    <section className="ui centered pt1">
                        <PostLoop data={shops.data} section="shops" count="3" />
                    </section>
                    <section className="ui grid center">
                        <section className="center aligned column">
                            <a href="/shops/">See more local shops</a>
                        </section>
                    </section>
                </section>

                <section className="ui container pt3">
                    <h1 className="ui header">Latest Shops</h1>
                    <section className="ui centered pt1">
                        <PostLoop data={shops.data} section="shops" count="3" />
                    </section>
                    <section className="ui grid center">
                        <section className="center aligned column">
                            <a href="/shops/">See more local shops</a>
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

export default connect(mapStateToProps)(ShopArchivePage)
