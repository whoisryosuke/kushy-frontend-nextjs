# v0.0.9 - August 6, 2018

## Major Changes

* Shop's category page refactored into master category page for all major sections (shop, products, etc)
* Added `query-string` to parse and create query strings for API requests.
* Added pagination to category pages. SSR friendly. Works using query params (`?page=2`) and passing through to `<PaginationMenu />` component.

## Bug fixes

* Fixed the reviews, photos, and menu pages. They were accessing the shop data object the wrong way
* Category menu in the <ShopArchive /> component is now limited to show 7 categories at most.

## New Components

* `<PaginationMenu active="1" total="10" redirect="/page-url-for-next-router-redirect/" />` - Displays pagination menu.

# v0.0.8 - August 3, 2018

## Major Changes

* Added `/shops/`, `/shops/category/<category>`.
* Removed Airbnb ESLint + Prettier. Need a better config before integrating into production projects.
* Categories have to be included now for major sections (shops, brands, etc). Added an 'include' for categories to the post actions (used in `<PostLoop />`). Changed the code in ShopCard to find categories in the `includes` param.

## New Components

* `<ShopProfile shop={data} profile{userProfile} section={'reviews'}> </ShopProfile>` - Layout for shop profile
* `<ShopArchive header={headerH1Component} categories={categoriesApiArray}> </ShopArchive>` - Layout for shop archive. Header accepts a `<h1>` or equivalent component. Categories is a data array from API.


# v0.0.7 - July 17th, 2018

## Major Changes

* Installed kushy-design, the Kushy Design System. Replaces the local Semantic UI install. Still requires SUI React as a peer dependency. 

# v0.0.6 - July 16th, 2018

## Minor Changes

* Removed babel plugin for root-import, and replaced with a Webpack 2 config in `next.config.js`.

# v0.0.5 - July 14th, 2018

Added the photo route to shop profile. Displays photos in a grid as cards.

## New Components

* `<PhotoCard />`
* `<PhotoGrid />`

# v0.0.4 - July 12th, 2018

## Major Changes

* SHOP PROFILES: Added menu page to shop profile, and created a ShopMenu component (+ children components) to display Inventory (aka menu) data.
* More detailed README with instructions + explanations.

## New Components

* ShopMenuRows - `<Flowers data={ data } />` - This folder contains table rows for each data type (based on product categories - flowers, concentrates, etc).
* `<ShopMenu />` - Accepts an inventory object from the Kushy API as props, sorts the data into sections, and loops through each section to return a `<Table />` containing the `<ShopMenuHeader />` and `<ShopMenuContent />`
* `<ShopMenuContent data={ data } section={ section } />` - Takes the inventory data (products) for a section and maps through them, applying the correct ShopMenuRows component. Basically a switch component that takes the section and displays the appropriate table row when looping through the products.
* `<ShopMenuHeader section={ section } />` - The table header for the shop menu. Creates the right column headings based on the section props.

# v0.0.3 - July 11th, 2018

## Major Changes

* SHOP PROFILES: Added shop profile pages. Route added to `server.js`. Page created in `shops/details.js`. Also made a layout component to wrap shop profile pages, to easily access the layout across multuple pages, and so we can SSR each tab individually (details/menu/photos/etc).
* Made the `fetch()` method in the `KushyApi` class async.

## New Components

* `<ShopProfile shop={ shop } />` - A layout component that wraps pages to display a shop profile, and any child components are rendered in the layout's content area. Accepts the shop object from the single shop API endpoint.

# v0.0.2 - July 10th, 2018

## Major Changes

* Swapped out `fetch()` in Index page with new Redux container `<PostLoop />`. Added actions (`posts.actions.js`), reducers, and constants for the container.

## New Components

* `<PostLoop section="shops" count="3" />` - Container component for displaying Kushy posts from any section, using SUI Cards. It uses Redux to dispatch an action to query API (using the section set in props). If the query was successful and the state is changed, it's mapped to the props. If the props change to a mappable array, we assume it's a successful result and map the results into Card components (see more below).
* `<Card section="shops" data={shopObject} />` - Component for dynamically displaying the correct card based on the section. Rather than polluting places with `if()` or `switch()` statements, we use this as a universal card picker.
* `<HeaderSearch />` - Component that wraps the SUI Search component. Grabs from the `/search/` API endpoint, sorts results by section, and return results to the SUI component (which does all the magic).

# v0.0.1 - July 9th, 2018

## Structure 

* Created project from NextJS Redux boilerplate.
* Added OAuth2.0 login (via `utils/AuthService.js`) and saves JWT to cookies (using `utils/Cookies.js`).
* Protected routes using a HOC (`utils/withAuth.js`). Uses React's Context API to wrap the protected page in a Provider that gives access to the token.
* KushyAPI helper class to make authorized requests to API with token in cookies

## UI / Design

* Frontpage imported from Laravel. All data types needed are loaded in state. Shop loop shows with cards