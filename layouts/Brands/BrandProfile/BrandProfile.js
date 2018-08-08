import React from 'react'
import Link from 'next/link'
import Main from 'layouts/Main/Main'

import config from 'config/config'

export default ({ children, brand, profile, section }) => {
  return (
    <Main>
        <section className="BrandProfile ui container centered">
            <section className="ui grid centered">
                <section className="BrandProfile__content twelve wide computer sixteen wide mobile column">
                    <header className="BrandHeader ui grid segment">
                        <aside className="three wide computer sixteen wide mobile column">
                            <img src={ brand.avatar } alt={ brand.name } className="ui medium circular image" />
                        </aside>
                        <section className="thirteen wide computer sixteen wide mobile column">
                            { brand.includes && brand.includes.categories && brand.includes.categories.length > 0 ?
                            <h4 className="BrandHeader__type">
                                      <a href={`/brands/category/${brand.includes.categories[0].category.slug }`}>
                                    {  brand.includes.categories[0].category.name }
                                </a>
                            </h4>
                            : '' }
                            <h2>{ brand.name }</h2>
                            <section className="ui grid">
                                <section className="eight wide computer sixteen wide mobile column">
                                    <p className="BrandHeader__address">
                                        { brand.location.address ?
                                            <span>{ brand.location.address }
                                            <br /></span> 
                                        : '' }
                                        { brand.location.city || brand.location.state || brand.location.postal_code ?
                                        <span>{ brand.location.city }, { brand.location.state } { brand.location.postal_code }</span>
                                        : '' }
                                    </p>
                                    <aside className="BrandHeader__hours">
                                        <span className="ui label red" title="This brand is currently open">
                                            <i className="icon clock"></i>
                                            Open
                                        </span>
                                        <span className="ui label" title="This brand is currently closed">
                                            <i className="icon clock"></i>
                                            Closed
                                        </span>
                                    </aside>
                                </section>
                                <section className="BrandHeader__btns eight wide computer sixteen wide mobile column">
                                    { profile ?
                                        <Link href={`/brands/${ brand.slug }/reviews`}>
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
                        <Link href={`/brands/${ brand.slug }/`}>
                            <a className={`item ${section == 'details' ? 'active' : ''}`}>
                                Description
                            </a>
                        </Link>
                        <Link href={`/brands/${ brand.slug }/products`}>
                            <a className={`item ${section == 'products' ? 'active' : ''}`}>
                                Products
                            </a>
                        </Link>
                        <Link href={`/brands/${ brand.slug }/reviews/`}>
                            <a className={`item ${section == 'reviews' ? 'active' : ''}`}>
                                Reviews
                            </a>
                        </Link>
                        <Link href={`/brands/${ brand.slug }/photos/`}>
                            <a className={`item ${section == 'photos' ? 'active' : ''}`}>
                                Photos
                            </a>
                        </Link>
                        <Link href={`/brands/${ brand.slug }/events/`}>
                            <a className={`item ${section == 'events' ? 'active' : ''}`}>
                                Events
                            </a>
                        </Link>
                    </nav>
                    <section id="BrandContent">
                        
                        { children }
                        
                    </section>

                </section>
                <section className="BrandProfile__sidebar four wide computer sixteen wide mobile column">
                    
                    {/* @include('components.buttons.bookmark', ['section' => 'brands', 'data' => brand, 'bookmarked' => userBookmark]) */}


                    
                    <section className="Sidebar__stats ui grid">
                        <section className="twelve wide column">
                            <h4 className="Title--reg txt-grey">Reviews</h4>
                        </section>
                        <section className="four wide column">
                            <h4 className="Title--reg">{ brand.reviewsCount ? brand.reviewsCount : '0' }</h4>
                        </section>

                        <section className="twelve wide column">
                            <h4 className="Title--reg txt-grey">Bookmarks</h4>
                        </section>
                        <section className="four wide column">
                            <h4 className="Title--reg">{ brand.bookmarksCount ? brand.bookmarksCount : '0' }</h4>
                        </section>
                    </section>

                    {/* @include('components.buttons.claimlisting', ['section' => 'brands', 'id' => brand.id, 'name' => brand.name]) */}

                    {/* <h3 className="ui header">
                        <i className="icon clock"></i>
                        Hours of Operation
                    </h3>
                    <table className="Sidebar__hours ui table compact">
                    @foreach(week as day)
                        <tr 
                            className="selectable @if(day == today) @if(open) positive @else negative @endif @endif"
                            @if(day == today) @if(open) title="This brand currently is open!" @else title="This brand currently is closed!" @endif @endif
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


