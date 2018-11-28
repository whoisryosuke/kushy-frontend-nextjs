import React from 'react'
import Main from 'layouts/Main/Main'

import SearchPageFilters from "components/Search/SearchPageFilters/SearchPageFilters";

export default function SearchWrapper({ children, search }) {
  return <Main>
      <section class="SearchArchive ui container centered pt2">
        {search && <h1 class="ui header">
            &quot;<span class="text red">{search}</span>&quot;
          </h1>}
        <SearchPageFilters search={search} />
        {children}
      </section>
    </Main>;
}
