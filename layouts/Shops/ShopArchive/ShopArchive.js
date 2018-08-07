import React from 'react'
import Link from 'next/link'
import Main from 'layouts/Main/Main'

export default ({ header, categories, children }) => {

    var grid = ["", "one", "two", "three", "four", "five", "six", "seven", "eight",
        "nine", "ten", "eleven", "twelve"];

    const { data } = categories


    let gridCount;
    const categoryCount = categories && data ? data.length : 1;
    if (categoryCount > 7) { gridCount = 7 } else { gridCount = categoryCount }
    let limit = Math.abs(Number(categoryCount) - gridCount);
    console.log(gridCount);
    console.log(limit);
    console.log(categoryCount);
    console.log(data.length);

    const categoriesLoop = categories && data ? data.splice(gridCount, limit) : [];

    const categoryMenu = data.map((category) => (
        <Link key={category.id} href={`/shops/category/${category.slug}/`}>
            <a className="item">
                {category.name}
            </a>
        </Link>
    ));

  return (
    <Main>
      <div className="shopArchive ui page">

          <header className="ui container pt3">
              { header ? header : <h1 className="ui header">Archive</h1> }
              <nav className={`ui red ${grid[gridCount]} item menu stackable`}>
                  {categoryMenu ? categoryMenu : ''}
              </nav>
          </header>

          { children }
        </div>
      </Main>
  )
}
