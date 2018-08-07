import React from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import ShopArchive from 'layouts/Shops/ShopArchive/ShopArchive'
import KushyApi from 'utils/KushyApi'
import PostLoop from 'containers/PostLoop'
import PaginationMenu from "components/PaginationMenu/PaginationMenu";

class ShopCategoryPage extends React.Component {
    static async getInitialProps({ reduxStore, req, query: { query: { page }, category, section } }) {
        const api = new KushyApi();

        let categories, posts
        console.log(page)

        await api.getPostsByCategory(section, category, page)
            .then((results) => (
                posts = results
            ))

        // Since brands are basically products, the category refs products
        let filter
        if(section == 'brands')
        {
            filter = 'product'
        } else {
            filter = section.slice(0, -1);
        }

        const categoryParams = `?filter[section]=${filter}`;
        await api.getAll('categories', categoryParams)
            .then((results) => (
                categories = results
            ))

        return {
            categories,
            category,
            page,
            posts,
            section
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            section: 'reviews'
        }
    }

    render() {
        const { categories, category, page, posts, section } = this.props;
        const redirect = `/shops/category/${category}/?`;

        const header = <h1 className="ui header">Browsing "<span className="text red">{ category }</span>"</h1>

        return (
            <ShopArchive header={header} categories={categories}>
                <section className="ui container pt3">
                    <section className="ui centered pt1">
                        <PostLoop data={posts.data} section={ section } count="9" columns="3" />
                        <PaginationMenu 
                            active={posts.meta.current_page} 
                            total={posts.meta.last_page} 
                            redirect={redirect}
                        />
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
