import React from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import ShopArchive from 'layouts/Shops/ShopArchive/ShopArchive'
import KushyApi from 'utils/KushyApi'
import PostLoop from 'containers/PostLoop'

class ShopCategoryPage extends React.Component {
    static async getInitialProps({ reduxStore, req, query: { category } }) {
        const api = new KushyApi();

        let categories, shops

        await api.getPostsByCategory(category)
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
            categories,
            category
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            section: 'reviews'
        }
    }

    render() {
        const { shops, categories, category } = this.props

        const header = <h1 className="ui header">Browsing "<span className="text red">{ category }</span>"</h1>

        return (
            <ShopArchive header={header} categories={categories}>
                <section className="ui container pt3">
                    <section className="ui centered pt1">
                        <PostLoop data={shops.data} section="shops" count="3" />
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

export default connect(mapStateToProps)(ShopCategoryPage)
