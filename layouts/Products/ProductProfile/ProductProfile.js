import React from 'react'
import Link from 'next/link'
import Main from 'layouts/Main/Main'

import config from 'config/config'

export default ({ children, product, profile, section }) => {
  return (
    <Main>
        <section className="ProductProfile ui container centered">
            <section className="ui grid centered">
                <section className="ProductProfile__content twelve wide computer sixteen wide mobile column">
                    <header className="ProductHeader ui grid segment">
                        <aside className="three wide computer sixteen wide mobile column">
                            <img src={ product.featured_img } alt={ product.name } className="ui medium circular image" />
                        </aside>
                        <section className="thirteen wide computer sixteen wide mobile column">
                            { product.includes && product.includes.categories && product.includes.categories.length > 0 ?
                            <h4 className="ProductHeader__type">
                                      <a href={`/products/category/${product.includes.categories[0].category.slug }`}>
                                    {  product.includes.categories[0].category.name }
                                </a>
                            </h4>
                            : '' }
                            <h1 className="ui header">{ product.name }</h1>
                            <section className="ui grid">
                                <section className="eight wide computer sixteen wide mobile column">

                                </section>
                                <section className="ProductHeader__btns eight wide computer sixteen wide mobile column">
                                    { profile ?
                                        <Link href={`/products/${ product.slug }/reviews`}>
                                            <a className="ui button icon red">
                                                <i className="icon comment"></i>
                                                Write Review
                                            </a>
                                        </Link>
                                        :
                                        <Link href={ config.kushyLogin }>
                                            <a className="ui button icon red">
                                                <i className="icon comment"></i>
                                                Sign Up to Review
                                            </a>
                                        </Link>
                                    }
                                </section>
                            </section>
                        </section>
                    </header>
                    <nav className="ui menu inverted red">
                        <Link href={`/products/${ product.slug }/`}>
                            <a className={`item ${section == 'details' ? 'active' : ''}`}>
                                Description
                            </a>
                        </Link>
                        <Link href={`/products/${ product.slug }/products`}>
                            <a className={`item ${section == 'products' ? 'active' : ''}`}>
                                Products
                            </a>
                        </Link>
                        <Link href={`/products/${ product.slug }/reviews/`}>
                            <a className={`item ${section == 'reviews' ? 'active' : ''}`}>
                                Reviews
                            </a>
                        </Link>
                        <Link href={`/products/${ product.slug }/photos/`}>
                            <a className={`item ${section == 'photos' ? 'active' : ''}`}>
                                Photos
                            </a>
                        </Link>
                        <Link href={`/products/${ product.slug }/events/`}>
                            <a className={`item ${section == 'events' ? 'active' : ''}`}>
                                Events
                            </a>
                        </Link>
                    </nav>
                    <section id="ProductContent">
                        
                        { children }
                        
                    </section>

                </section>
                <section className="ProductProfile__sidebar four wide computer sixteen wide mobile column">
                    
                    {/* @include('components.buttons.bookmark', ['section' => 'products', 'data' => product, 'bookmarked' => userBookmark]) */}


                    
                    <section className="Sidebar__stats ui grid">
                        <section className="twelve wide column">
                            <h4 className="Title--reg txt-grey">Reviews</h4>
                        </section>
                        <section className="four wide column">
                            <h4 className="Title--reg">{ product.reviewsCount ? product.reviewsCount : '0' }</h4>
                        </section>

                        <section className="twelve wide column">
                            <h4 className="Title--reg txt-grey">Bookmarks</h4>
                        </section>
                        <section className="four wide column">
                            <h4 className="Title--reg">{ product.bookmarksCount ? product.bookmarksCount : '0' }</h4>
                        </section>
                    </section>

                    {/* @include('components.buttons.claimlisting', ['section' => 'products', 'id' => product.id, 'name' => product.name]) */}

                    {/* <h3 className="ui header">
                        <i className="icon clock"></i>
                        Hours of Operation
                    </h3>
                    <table className="Sidebar__hours ui table compact">
                    @foreach(week as day)
                        <tr 
                            className="selectable @if(day == today) @if(open) positive @else negative @endif @endif"
                            @if(day == today) @if(open) title="This product currently is open!" @else title="This product currently is closed!" @endif @endif
                            >
                            <td>
                                <strong>{ substr(day, 0, 3) }</strong> 
                            </td>
                            <td>
                                { hours[day]['open'] } - { hours[day]['closed'] }
                            </td>
                        </tr>
                    @endforeach
                    </table> */}
                </section>
            </section>
        </section>
    </Main>
  )
}


