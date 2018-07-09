# Kushy Frontend

The frontend for Kushy.net implemented in NextJS. 

## Tools

* NextJS
* ReactJS
* Semantic UI
* NodeJS
* Express

## Development

### New users:

`npm install`

### Running Server

`npm run dev`

Deploys an Express server, configured in the `server.js` file in project root, and builds the project using Next.

### Admin / Organizer Access

Spin up a development server, create a new account, and use those login details in this app. `AuthService` class assumes dev server is located at `http://localhost/`, but also accepts any URL when you make a "new" class (`new AuthService('http://localhost:4849')`). See the [seshsource-api](https://github.com/whoisryosuke/seshsource-api) repo for more details.

### Semantic UI

#### Installation

You should have all the necessary Semantic UI files, as well as the Kushy overrides. Make sure **Gulp** is installed if you want to build or edit any CSS.

> We're working on a separate NPM module for a Semantic UI package with all the Kushy overrides for easier access.

#### CSS

* You can either directly import the LESS modules from `semantic/src/definitions/elements/header.less`
* Or you can build the entire Semantic UI CSS file (`cd semantic && gulp build`) and import it in `pages/_document.js`.

## Deployment

`npm run build`

## Todo

### Complete

* [✅] - Redux implemented with NextJS
* [✅] - Redux store persisted across reloads (redux-persist)
* [✅] - Dynamic routing using Express
* [✅] - Semantic UI implemented
* [✅] - Basic Dashboard styling
* [✅] - CRUD functionality for Events
* [✅] - Login Authentication using OAuth2.0 / JWT tokens
* [✅] - Protected/Authenticated Routes using HOCs (supporting SSR!)
* [✅] - Token passed through app using Context API


### High Priority

* [] - Refactor frontpage post loader components into containers (redux connected) + card components. Instead of using the Index component state to map posts, map state to props and use dispatches for API calls.
* [] - Make container / card component for products
* [] - Make container / card component for activity
* [] - User dashboard page
* [] - User dashboard page - Settings
* [] - User dashboard page - MMJ Verification
* [] - Logout functionality

### Low Priority

* [] - Swap search in header with SUI React search component (to enable autocomplete)
* [] - Implement CDN for static images