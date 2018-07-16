import React from 'react'
import Link from 'next/link'
import Main from '../Main/Main'

import config from '~/config/config'

export default ({ children, shop, profile, section }) => {
  return (
    <Main>
        <section className="ShopProfile ui container centered">
            <section className="ui grid centered">
                <section className="ShopProfile__content twelve wide computer sixteen wide mobile column">
                    <header className="ShopHeader ui grid segment">
                        <aside className="three wide computer sixteen wide mobile column">
                            <img src={ shop.avatar } alt="{ shop.name }" className="ui medium circular image" />
                        </aside>
                        <section className="thirteen wide computer sixteen wide mobile column">
                            { shop.categories.length > 0 ?
                            <h4 className="ShopHeader__type">
                                <a href={`/shops/category/{ shop.categories[0].category.name }`}>
                                    {  shop.categories[0].category.name }
                                </a>
                            </h4>
                            : '' }
                            <h2>{ shop.name }</h2>
                            <section className="ui grid">
                                <section className="eight wide computer sixteen wide mobile column">
                                    <p className="ShopHeader__address">
                                        { shop.location.address ?
                                            <span>{ shop.location.address }
                                            <br /></span> 
                                        : '' }
                                        { shop.location.city || shop.location.state || shop.location.postal_code ?
                                        <span>{ shop.location.city }, { shop.location.state } { shop.location.postal_code }</span>
                                        : '' }
                                    </p>
                                    <aside className="ShopHeader__hours">
                                        <span className="ui label red" title="This shop is currently open">
                                            <i className="icon clock"></i>
                                            Open
                                        </span>
                                        <span className="ui label" title="This shop is currently closed">
                                            <i className="icon clock"></i>
                                            Closed
                                        </span>
                                    </aside>
                                </section>
                                <section className="ShopHeader__btns eight wide computer sixteen wide mobile column">
                                    { profile ?
                                        <Link href={`/shops/${ shop.slug }/reviews`}>
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
                        <Link href={`/shops/${ shop.slug }/`}>
                            <a className={`item ${section == 'details' ? 'active' : ''}`}>
                                Description
                            </a>
                        </Link>
                        <Link href={`/shops/${ shop.slug }/menu`}>
                            <a className={`item ${section == 'menu' ? 'active' : ''}`}>
                                Menu
                            </a>
                        </Link>
                        <Link href={`/shops/${ shop.slug }/deals/`}>
                            <a className={`item ${section == 'deals' ? 'active' : ''}`}>
                                Deals
                            </a>
                        </Link>
                        <Link href={`/shops/${ shop.slug }/reviews/`}>
                            <a className={`item ${section == 'reviews' ? 'active' : ''}`}>
                                Reviews
                            </a>
                        </Link>
                        <Link href={`/shops/${ shop.slug }/photos/`}>
                            <a className={`item ${section == 'photos' ? 'active' : ''}`}>
                                Photos
                            </a>
                        </Link>
                        <Link href={`/shops/${ shop.slug }/events/`}>
                            <a className={`item ${section == 'events' ? 'active' : ''}`}>
                                Events
                            </a>
                        </Link>
                    </nav>
                    <section id="ShopContent">
                        
                        { children }
                        
                    </section>

                </section>
                <section className="ShopProfile__sidebar four wide computer sixteen wide mobile column">
                    
                    {/* @include('components.buttons.bookmark', ['section' => 'shops', 'data' => shop, 'bookmarked' => userBookmark]) */}


                    
                    <section className="Sidebar__stats ui grid">
                        <section className="twelve wide column">
                            <h4 className="Title--reg txt-grey">Reviews</h4>
                        </section>
                        <section className="four wide column">
                            <h4 className="Title--reg">{ shop.reviewsCount ? shop.reviewsCount : '0' }</h4>
                        </section>

                        <section className="twelve wide column">
                            <h4 className="Title--reg txt-grey">Bookmarks</h4>
                        </section>
                        <section className="four wide column">
                            <h4 className="Title--reg">{ shop.bookmarksCount ? shop.bookmarksCount : '0' }</h4>
                        </section>
                    </section>

                    {/* @include('components.buttons.claimlisting', ['section' => 'shops', 'id' => shop.id, 'name' => shop.name]) */}

                    {/* <h3 className="ui header">
                        <i className="icon clock"></i>
                        Hours of Operation
                    </h3>
                    <table className="Sidebar__hours ui table compact">
                    @foreach(week as day)
                        <tr 
                            className="selectable @if(day == today) @if(open) positive @else negative @endif @endif"
                            @if(day == today) @if(open) title="This shop currently is open!" @else title="This shop currently is closed!" @endif @endif
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


