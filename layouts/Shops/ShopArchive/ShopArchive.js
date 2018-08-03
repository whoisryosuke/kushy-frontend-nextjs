import React from 'react'
import Link from 'next/link'
import Main from 'layouts/Main/Main'

export default ({ header, categories, children }) => {

    const categoryMenu = categories && categories.data ? categories.data.map((category) => (
        <Link key={category.id} href={`/shops/category/${category.slug}/`}>
            <a className="item">
                {category.name}
            </a>
        </Link>
    )) : '';

  return (
    <Main>
      <div className="ShopArchive ui page">

          <header className="ui container pt3">
              { header ? header : <h1 className="ui header">Archive</h1> }
              <nav className="ui red seven item menu stackable">
                  {categoryMenu ? categoryMenu : ''}
              </nav>
          </header>

          { children }
        </div>
      </Main>
  )
}
