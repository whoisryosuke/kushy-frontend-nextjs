import React from 'react'
import Link from 'next/link'

export default function StrainCard({ data, width }) {
  let categories
  if ('categories' in data) {
    categories = data.categories;
  }
  if ('includes' in data) {
    if ('categories' in data.includes) {
      categories = data.categories;
    }
  }
  return <section className={width ? width : "four wide computer eight wide mobile column"}>
      <article className={`StrainArchive bg-${categories && categories.length > 0 ? categories[0].category.name.toLowerCase() : "hybrid"}`}>
        <Link href={`/strains/${data.slug}`}>
          <a>
            <h3>{data.name}</h3>
            <section className="StrainArchive__icons">
              <aside id="type">
                <h4 className="Title--sub">{data.type}</h4>
              </aside>
              <aside id="review">
                <i className="Icon icon-message-circle" />
              </aside>
              {data.thc && <aside id="thc">
                  <i className="Icon icon-bar-chart-2" />
                  <section className="Tooltip">
                    <h6>{data.thc}</h6>
                  </section>
                </aside>}
              {data.breeder && <aside id="breeder">
                  <i className="Icon icon-user" />
                  <section className="Tooltip">
                    <h6>{data.breeder}</h6>
                  </section>
                </aside>}
              <aside id="like">
                <i className="Icon icon-heart" />
                <section className="Tooltip" />
              </aside>
            </section>
          </a>
        </Link>
      </article>
    </section>;
}
