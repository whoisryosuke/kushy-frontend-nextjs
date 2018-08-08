import React from 'react'
import Link from 'next/link'
import Main from 'layouts/Main/Main'

import config from 'config/config'

export default ({ children, strain, profile, section }) => {
    return (
        <Main>
            <section className="StrainProfile ui container centered">
                <section className="ui grid centered">
                    <section className="StrainProfile__content twelve wide computer sixteen wide mobile column">
                        <header className="StrainHeader ui grid segment">
                            <aside className="three wide computer sixteen wide mobile column">
                                <img src={strain.avatar} alt={strain.name} className="ui medium circular image" />
                            </aside>
                            <section className="thirteen wide computer sixteen wide mobile column">
                                {strain.includes && strain.includes.categories && strain.includes.categories.length > 0 ?
                                    <h4 className="StrainHeader__type">
                                        <a href={`/strains/category/${strain.includes.categories[0].category.slug}`}>
                                            {strain.includes.categories[0].category.name}
                                        </a>
                                    </h4>
                                    : ''}
                                <h2>{strain.name}</h2>
                                <section className="ui grid">
                                    <section className="eight wide computer sixteen wide mobile column">
                                        <p className="StrainHeader__address">
                                            {strain.location.address ?
                                                <span>{strain.location.address}
                                                    <br /></span>
                                                : ''}
                                            {strain.location.city || strain.location.state || strain.location.postal_code ?
                                                <span>{strain.location.city}, {strain.location.state} {strain.location.postal_code}</span>
                                                : ''}
                                        </p>
                                        <aside className="StrainHeader__hours">
                                            <span className="ui label red" title="This strain is currently open">
                                                <i className="icon clock"></i>
                                                Open
                                        </span>
                                            <span className="ui label" title="This strain is currently closed">
                                                <i className="icon clock"></i>
                                                Closed
                                        </span>
                                        </aside>
                                    </section>
                                    <section className="StrainHeader__btns eight wide computer sixteen wide mobile column">
                                        {profile ?
                                            <Link href={`/strains/${strain.slug}/reviews`}>
                                                <a className="ui button icon red">
                                                    <i className="icon comment"></i>
                                                    Write Review
                                            </a>
                                            </Link>
                                            :
                                            <Link href={config.kushyLogin}>
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
                            <Link href={`/strains/${strain.slug}/`}>
                                <a className={`item ${section == 'details' ? 'active' : ''}`}>
                                    Description
                            </a>
                            </Link>
                            <Link href={`/strains/${strain.slug}/strains`}>
                                <a className={`item ${section == 'strains' ? 'active' : ''}`}>
                                    Strains
                            </a>
                            </Link>
                            <Link href={`/strains/${strain.slug}/reviews/`}>
                                <a className={`item ${section == 'reviews' ? 'active' : ''}`}>
                                    Reviews
                            </a>
                            </Link>
                            <Link href={`/strains/${strain.slug}/photos/`}>
                                <a className={`item ${section == 'photos' ? 'active' : ''}`}>
                                    Photos
                            </a>
                            </Link>
                            <Link href={`/strains/${strain.slug}/events/`}>
                                <a className={`item ${section == 'events' ? 'active' : ''}`}>
                                    Events
                            </a>
                            </Link>
                        </nav>
                        <section id="StrainContent">

                            {children}

                        </section>

                    </section>
                    <section className="StrainProfile__sidebar four wide computer sixteen wide mobile column">

                        {/* @include('components.buttons.bookmark', ['section' => 'strains', 'data' => strain, 'bookmarked' => userBookmark]) */}



                        <section className="Sidebar__stats ui grid">
                            <section className="twelve wide column">
                                <h4 className="Title--reg txt-grey">Reviews</h4>
                            </section>
                            <section className="four wide column">
                                <h4 className="Title--reg">{strain.reviewsCount ? strain.reviewsCount : '0'}</h4>
                            </section>

                            <section className="twelve wide column">
                                <h4 className="Title--reg txt-grey">Bookmarks</h4>
                            </section>
                            <section className="four wide column">
                                <h4 className="Title--reg">{strain.bookmarksCount ? strain.bookmarksCount : '0'}</h4>
                            </section>
                        </section>

                        {/* @include('components.buttons.claimlisting', ['section' => 'strains', 'id' => strain.id, 'name' => strain.name]) */}

                        {/* <h3 className="ui header">
                        <i className="icon clock"></i>
                        Hours of Operation
                    </h3>
                    <table className="Sidebar__hours ui table compact">
                    @foreach(week as day)
                        <tr 
                            className="selectable @if(day == today) @if(open) positive @else negative @endif @endif"
                            @if(day == today) @if(open) title="This strain currently is open!" @else title="This strain currently is closed!" @endif @endif
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


