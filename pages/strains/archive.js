import React from 'react'
import { connect } from 'react-redux'
import ShopArchive from 'layouts/Archive/Archive'
import KushyApi from 'utils/KushyApi'
import PostLoop from 'containers/PostLoop'

class StrainArchivePage extends React.Component {
    static async getInitialProps({ reduxStore, req, query: { slug } }) {
        const api = new KushyApi();

        let categories, strains

        const params = `?include=categories`
        await api.getAll('strains', params)
            .then((results) => (
                strains = results
            ))
        const categoryParams = '?filter[section]=strain'
        await api.getAll('categories', categoryParams)
            .then((results) => (
                categories = results
            ))

        return {
            strains,
            categories
        }
    }

    render() {
        const { strains, categories } = this.props
        console.log('strains', strains);

        const header = <h1 className="ui header">Browsing "<span className="text red">strains</span>"</h1>

        return (
            <ShopArchive header={ header } categories={ categories }>
                <section className="ui container pt3">
                    <h1 className="ui header">Featured Strains</h1>
                    <section className="ui centered pt1">
                        <PostLoop data={strains.data} section="strains" count="3" />
                    </section>
                    <section className="ui grid center">
                        <section className="center aligned column">
                            <a href="/strains/">See more local strains</a>
                        </section>
                    </section>
                </section>

                <section className="ui container pt3">
                    <h1 className="ui header">Latest Strains</h1>
                    <section className="ui centered pt1">
                        <PostLoop data={strains.data} section="strains" count="3" />
                    </section>
                    <section className="ui grid center">
                        <section className="center aligned column">
                            <a href="/strains/">See more local strains</a>
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

export default connect(mapStateToProps)(StrainArchivePage)