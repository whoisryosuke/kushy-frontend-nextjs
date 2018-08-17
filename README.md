# Kushy Frontend

The frontend for Kushy.net implemented as a SSR React app using NextJS. 

## Tools

* [NextJS](https://nextjs.org/)
* [ReactJS](https://reactjs.org/)
* [Kushy Design System](https://www.npmjs.com/package/kushy-design)
* [NodeJS](https://nodejs.org/)
* [Express](http://expressjs.com/)
* [Kushy API](http://kushy.net/developers/)

## Development

This app is built on top of the NextJS app framework, using an NodeJS/Express server for dynamic routing, and ReactJS for our view layer. I use the [Kushy API](http://kushy.net/developers/) to provide all the data (shops, products, etc), as well as for user authentication through an OAuth 2 flow.

NextJS is setup to use CSS, as well as a special Webpack config to include any media imported in the CSS. You can configure all this on `next.config.js`.

I use the Kushy Design System, which is built on the Semantic UI CSS framework and React component system. My Semantic UI CSS setup should be included in the [kushy-design](https://github.com/kushyapp/kushy-design) repo if you need to make any changes and have to rebuild the master CSS file (see Semantic UI section for instructions). Preferably use components from [Semantic UI React](https://react.semantic-ui.com/collections/menu), even though HTML with proper SUI class names will work fine for simpler components.

### New users:

1. You'll want to install any dependencies:

`npm install`

2. Then copy the `.env.example` to `.env`. 

There you'll insert your Kushy API credentials [you can find by creating an app here](https://kushy.net/developers/apps). And you can set an `APP_KEY`, which will be used as a salt to create encrypted hashes on behalf of your app.

3. Update the login URL in `config/config.js` file with your client ID and callback URL. If you need credentials, spin up the dev server and run `php artisan passport:client` and fill out the prompts.

### Running Server

`npm run dev`

Deploys an Express server, configured in the `server.js` file in project root, and builds the project using Next.

### Admin / Organizer Access

Spin up a development server, create a new account, and use those login details in this app. 

> `KushyApi` class is used to access the API. The class assumes dev server is located at `http://localhost/`, but also accepts any URL when you make a "new" class (`new KushyApi('http://localhost:4849')`).

### Authentication

Users are authenticated through the Kushy API and it's OAuth 2 protocol. 

To login or register, redirect the user to the login URL (specified in the config as `config.kushyLogin`). The user will be redirected to the Kushy API. There the user will be prompted to login/register if they're not, and accept/deny the app. Once they accept, they're redirected back to our callback (`theserver.com/token`) where we do the last handshake to grab the JWT. It's stored in the cookies, and the user is redirected to the user dashboard.

To authenticate on private pages like the user dashboard, we query the API using the cookie to verify the user (*using a HOC, see below*). Otherwise, public components with private functionality are hidden based on the presence of the cookie (*using a HOC, see further below*).

#### Protected pages

Wrap any pages that require a login in the `withAuth(ProtectedPageComponent)` HOC. This checks the cookies for a token (server or client side) and allows the page component to load if it finds one.

#### Checking if user is logged in

If it's a page component that doesn't have to be protected, wrap it in the `withPageCookie()` HOC:

```js
withPageCookie(Component)
```

If it's a component that needs to know if the user is logged in (e.g. the Header's login vs user dropdown) you wrap your component in the `withCookie()` HOC:

```js
withCookie(Component)
```

You'll find `loggedIn` and `token` in your wrapped component's props. `loggedIn` is a boolean, and `token` will be the JWT.

#### Getting user access token (JWT)

For authenticated client-side requests, you'll need to fetch using the JWT in your authorization headers. 

Use the `withPageCookie()` and `withCookie()` HOCs (*see above*) to propogate your component's props with the JWT. Then you can use `this.props.token` in any `fetch()` requests.

### Deployment

`npm run build`

### Git Commit Guide

|   Commit type              | Emoji                                         |
|:---------------------------|:----------------------------------------------|
| Initial commit             | :tada: `:tada:`                               |
| Version tag                | :bookmark: `:bookmark:`                       |
| New feature                | :sparkles: `:sparkles:`                       |
| New component              | :star: `:star:`                               |
| Bugfix                     | :bug: `:bug:`                                 |
| Metadata                   | :card_index: `:card_index:`                   |
| Documentation              | :books: `:books:`                             |
| Documenting source code    | :bulb: `:bulb:`                               |
| Performance                | :racehorse: `:racehorse:`                     |
| Cosmetic                   | :lipstick: `:lipstick:`                       |
| Tests                      | :rotating_light: `:rotating_light:`           |
| Adding a test              | :white_check_mark: `:white_check_mark:`       |
| General update             | :zap: `:zap:`                                 |
| Improve format/structure   | :art: `:art:`                                 |
| Refactor code              | :hammer: `:hammer:`                           |
| Removing code/files        | :fire: `:fire:`                               |
| Continuous Integration     | :green_heart: `:green_heart:`                 |
| Security                   | :lock: `:lock:`                               |
| Upgrading dependencies     | :arrow_up: `:arrow_up:`                       |
| Downgrading dependencies   | :arrow_down: `:arrow_down:`                   |
| Lint                       | :shirt: `:shirt:`                             |
| Translation                | :alien: `:alien:`                             |
| Text                       | :pencil: `:pencil:`                           |
| Critical hotfix            | :ambulance: `:ambulance:`                     |
| Deploying stuff            | :rocket: `:rocket:`                           |
| Fixing on MacOS            | :apple: `:apple:`                             |
| Fixing on Linux            | :penguin: `:penguin:`                         |
| Fixing on Windows          | :checkered_flag: `:checkered_flag:`           |
| Work in progress           | :construction:  `:construction:`              |
| Adding CI build system     | :construction_worker: `:construction_worker:` |
| Analytics or tracking code | :chart_with_upwards_trend: `:chart_with_upwards_trend:` |
| Removing a dependency      | :heavy_minus_sign: `:heavy_minus_sign:`       |
| Adding a dependency        | :heavy_plus_sign: `:heavy_plus_sign:`         |
| Docker                     | :whale: `:whale:`                             |
| Configuration files        | :wrench: `:wrench:`                           |
| Merging branches           | :twisted_rightwards_arrows: `:twisted_rightwards_arrows:` |
| Bad code / need improv.    | :hankey: `:hankey:`                           |
| Reverting changes          | :rewind: `:rewind:`                           |
| Breaking changes           | :boom: `:boom:`                               |
| Code review changes        | :ok_hand: `:ok_hand:`                         |
| Accessibility              | :wheelchair: `:wheelchair:`                   |

## Components

### `<ShopProfile shop={ shop } section="details" />`

A layout component that wraps pages to display a shop profile, and any child components are rendered in the layout's content area. Accepts the shop object from the single shop API endpoint. The section props is for the nested tab menu (details/menu/etc) and lets it know which menu item is active.

### `<PostLoop section="shops" count="3" />`

Container component for displaying Kushy posts from any section, using SUI Cards. It uses Redux to dispatch an action to query API (using the section set in props). If the query was successful and the state is changed, it's mapped to the props. If the props change to a mappable array, we assume it's a successful result and map the results into Card components (see more below).

### `<Card section="shops" data={shopObject} />`

Component for dynamically displaying the correct card based on the section. Rather than polluting places with `if()` or `switch()` statements, we use this as a universal card picker.

### `<HeaderSearch />`

Component that wraps the SUI Search component. Grabs from the `/search/` API endpoint, sorts results by section, and return results to the SUI component (which does all the magic).

### `<PaginationMenu total="10" active"1" redirect="http://kushy.net/brands/category/flowers" />`

Wrapper for SUI React's Pagination component. Clicking on buttons uses NextJS Router to redirect to the correct page using the redirect URL in props.

## Todo

Focus on creating all routes SSR first (e.g. pagination through query params), then optimize later by making Redux components that load data dynamically (e.g. clicking next page tells postloop component to query next page without hard-loading a new page).

### Complete

* [✅] - Redux implemented with NextJS
* [✅] - Redux store persisted across reloads (redux-persist)
* [✅] - Dynamic routing using Express
* [✅] - Semantic UI implemented
* [✅] - Login Authentication using OAuth2.0 / JWT tokens
* [✅] - Protected/Authenticated Routes using HOCs (supporting SSR!)
* [✅] - Token passed through app using Context API
* [✅] - Refactor frontpage post loader components into containers (redux connected) + card components. Instead of using the Index component state to map posts, map state to props and use dispatches for API calls.
* [✅] - Make container / card component for products
* [✅] - Shop profile (layout + details)
* [✅] - Shop profile - Menu
* [✅] - Shop profile - Photos route
* [✅] - Shop profile - Reviews route
* [✅] - Shop profile - Add Review functionality
* [✅] - Swap search in header with SUI React search component (to enable autocomplete)
* [✅] - Implement CDN for static images (preferably DigitalOcean Spaces)
* [✅] - Brands archive - (layout + details)
* [✅] - Products archive - (layout + details)
* [✅] - Strains archive - (layout + details)
* [✅] - Brands profile - (layout + details)
* [✅] - Products profile - (layout + details)
* [✅] - Strains profile - (layout + details)


### High Priority
* [] - Make container / card component for activity
* [] - Shop profile - Events route
* [] - Shop profile - Deals route
* [] - Shop profile - Breadcrumbs on top
* [] - Shop profile - Hours of operation in sidebar
* [] - Shop profile - Open/Close working in header
* [] - Shop profile - Bookmark functionality
* [] - Shop profile - Claim listing button
* [] - User dashboard page
* [] - User dashboard page - Settings
* [] - User dashboard page - MMJ Verification
* [] - Logout functionality

### Low Priority

* [] - Socal Login with Twitter, Facebook, Google+
* [] - Shop profile - Menu - Search/Filter
* [] - Refactor SUI HTML/CSS into ReactJS
* [] - Loading state for any dynamic components
* [] - Server side caching using `lru-cache` [see](https://github.com/zeit/next.js/pull/497/commits/be71b8fb3f5e07a63483e4546991a67b4af9d3b3)