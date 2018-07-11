## v0.0.2 - July 10th, 2018

## Major Changes

* Swapped out `fetch()` in Index page with new Redux container `<PostLoop />`. Added actions (`posts.actions.js`), reducers, and constants for the container.

## New Components

* `<PostLoop section="shops" count="3" />` - Container component for displaying Kushy posts from any section, using SUI Cards. It uses Redux to dispatch an action to query API (using the section set in props). If the query was successful and the state is changed, it's mapped to the props. If the props change to a mappable array, we assume it's a successful result and map the results into Card components (see more below).
* `<Card section="shops" data={shopObject} />` - Component for dynamically displaying the correct card based on the section. Rather than polluting places with `if()` or `switch()` statements, we use this as a universal card picker.

## v0.0.1 - July 9th, 2018

### Structure 

* Created project from NextJS Redux boilerplate.
* Added OAuth2.0 login (via `utils/AuthService.js`) and saves JWT to cookies (using `utils/Cookies.js`).
* Protected routes using a HOC (`utils/withAuth.js`). Uses React's Context API to wrap the protected page in a Provider that gives access to the token.
* KushyAPI helper class to make authorized requests to API with token in cookies

### UI / Design

* Frontpage imported from Laravel. All data types needed are loaded in state. Shop loop shows with cards