# Kushy Frontend

The frontend for Kushy.net implemented in NextJS. 

## Tools

* NextJS
* ReactJS
* Semantic UI
* NodeJS
* Express
* [Kushy API](http://kushy.net/developers/)

## Development

This app is built on top of the NextJS app framework, using an NodeJS/Express server for dynamic routing, and ReactJS for our view layer. I use the [Kushy API](http://kushy.net/developers/) to provide all the data (shops, products, etc), as well as for user authentication through an OAuth 2 flow.

NextJS is setup to use LESS + CSS (although I'll be switching soon to SASS), with a special Webpack config to include any media imported in the CSS. You can configure all this on `next.config.js`.

I use the Semantic UI CSS framework and React component system. My Semantic UI CSS setup should be included in the repo if you need to make any changes and have to rebuild the master CSS file (see Semantic UI section for instructions). Preferably use components from [Semantic UI React](https://react.semantic-ui.com/collections/menu), even though HTML with proper SUI class names will work fine.

### New users:

1. You'll want to install any dependencies:

`npm install`

2. Then copy the `.env.example` to `.env`. 

There you'll insert your Kushy API credentials [you can find by creating an app here](https://kushy.net/developers/apps). And you can set an `APP_KEY`, which will be used as a salt to create encrypted hashes on behalf of your app.

### Running Server

`npm run dev`

Deploys an Express server, configured in the `server.js` file in project root, and builds the project using Next.

### Admin / Organizer Access

Spin up a development server, create a new account, and use those login details in this app. `AuthService` class assumes dev server is located at `http://localhost/`, but also accepts any URL when you make a "new" class (`new AuthService('http://localhost:4849')`). See the [seshsource-api](https://github.com/whoisryosuke/seshsource-api) repo for more details.

### Authentication

Users are authenticated through the Kushy API. To login or register, redirect the user to the login URL (specified in the config as `config.kushyLogin`). The user will be redirected to the Kushy API. There the user will be prompted to login/register if they're not, and accept/deny the app. Once they accept, they're redirected back to our callback (`theserver.com/token`) where we do the last handshake to grab the JWT. It's stored in the cookies, and the user is redirected to the user dashboard.

#### Protected pages

Wrap any pages that require a login in the `withAuth(ProtectedPageComponent)` HOC. This checks the cookies for a token (server or client side) and allows the page component to load if it finds one.

### Semantic UI

#### Installation

You should have all the necessary Semantic UI files, as well as the Kushy overrides. Make sure **Gulp** is installed if you want to build or edit any CSS.

> We're working on a separate NPM module for a Semantic UI package with all the Kushy overrides for easier access.

#### CSS

* You can either directly import the LESS modules from `semantic/src/definitions/elements/header.less`
* Or you can build the entire Semantic UI CSS file (`cd semantic && gulp build`) and import it in `pages/_document.js`.

### Deployment

`npm run build`

### Git Commit Guide

|   Commit type              | Emoji                                         |
|:---------------------------|:----------------------------------------------|
| Initial commit             | :tada: `:tada:`                               |
| Version tag                | :bookmark: `:bookmark:`                       |
| New feature                | :sparkles: `:sparkles:`                       |
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

### <ShopProfile shop={ shop } section="details" />

A layout component that wraps pages to display a shop profile, and any child components are rendered in the layout's content area. Accepts the shop object from the single shop API endpoint. The section props is for the nested tab menu (details/menu/etc) and lets it know which menu item is active.

### <PostLoop section="shops" count="3" />

Container component for displaying Kushy posts from any section, using SUI Cards. It uses Redux to dispatch an action to query API (using the section set in props). If the query was successful and the state is changed, it's mapped to the props. If the props change to a mappable array, we assume it's a successful result and map the results into Card components (see more below).

### <Card section="shops" data={shopObject} />

Component for dynamically displaying the correct card based on the section. Rather than polluting places with `if()` or `switch()` statements, we use this as a universal card picker.

### <HeaderSearch />

Component that wraps the SUI Search component. Grabs from the `/search/` API endpoint, sorts results by section, and return results to the SUI component (which does all the magic).

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
* [✅] - Swap search in header with SUI React search component (to enable autocomplete)


### High Priority
* [] - Make container / card component for activity
* [] - Shop profile - Events route
* [] - Shop profile - Deals route
* [] - Shop profile - Breadcrumbs on top
* [] - Shop profile - Hours of operation in sidebar
* [] - Shop profile - Open/Close working in header
* [] - Shop profile - Add Review functionality
* [] - Shop profile - Bookmark functionality
* [] - Shop profile - Claim listing button
* [] - User dashboard page
* [] - User dashboard page - Settings
* [] - User dashboard page - MMJ Verification
* [] - Logout functionality

### Low Priority

* [] - Implement CDN for static images (preferably DigitalOcean Spaces)
* [] - Socal Login with Twitter, Facebook, Google+
* [] - Shop profile - Menu - Search/Filter
* [] - Refactor SUI HTML/CSS into ReactJS