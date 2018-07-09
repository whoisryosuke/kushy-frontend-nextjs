## v0.0.1 - July 9th, 2018

### Structure 

* Created project from NextJS Redux boilerplate.
* Added OAuth2.0 login (via `utils/AuthService.js`) and saves JWT to cookies (using `utils/Cookies.js`).
* Protected routes using a HOC (`utils/withAuth.js`). Uses React's Context API to wrap the protected page in a Provider that gives access to the token.
* KushyAPI helper class to make authorized requests to API with token in cookies

### UI / Design

* Frontpage imported from Laravel. All data types needed are loaded in state. Shop loop shows with cards