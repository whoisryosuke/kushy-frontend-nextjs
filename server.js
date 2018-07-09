require('dotenv').config()
const express = require('express')
const next = require('next')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const csrf = require('csurf')
const fetch = require('isomorphic-unfetch')
const session = require('express-session')

// Setup CSRF Middleware
var csrfProtection = csrf({
  cookie: true
})
var parseForm = bodyParser.urlencoded({ extended: false })

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

function jsonErrorCheck(data) {
  if('error' in data)
  {
    return error
  }
  return data
}

function loggedIn(req, res, next) {
  // If the session token exists, user is logged in
  // if (req.session && !req.session.token)
  // {
  //   return res.redirect('/login')
  // }
  if (req.cookies['kushyFToken'])
  {
    return res.redirect('/')
  }
  next()
}

// function getUser(req, res, next) {
//   if (req.cookies['kushyFToken']) {
//     const credentials = {
//       method: 'get',
//       headers: {
//         'Authorization': 'Bearer ' + req.session.token,
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }
//     }

//     const fetchUser = async () => {
//       await fetch('http://localhost/api/user/', credentials)
//         .then(r => r.json())
//         .then(data => jsonErrorCheck(data))
//         .then(data => {
//           req.session.user = data
//           res.locals.user = data
//           next()        
//         });
//       }
//       fetchUser();
//   } else {
//     next()
//   }
// }

app.prepare()
  .then(() => {
    const server = express()
    const middlewares = [
      bodyParser.urlencoded(),
      cookieParser('kushy-frontend'),
      csrfProtection,
      session({
        resave: false,
        saveUninitialized: true
      })
    ]
    server.use(middlewares)

    server.get('/dashboard', (req, res) => {
      return app.render(req, res, '/dashboard')
    })

    server.get('/events/manage', (req, res) => {
      return app.render(req, res, '/events/manage', { slug: req.params.slug })
    })

    server.get('/events/create', (req, res) => {
      return app.render(req, res, '/events/create', { slug: req.params.slug })
    })

    server.get('/events/:slug', (req, res) => {
      return app.render(req, res, '/events/profile', { slug: req.params.slug })
    })

    // Callback for OAuth2 API
    server.get('/token', (req, res) => {
      const callback = {
        grant_type: 'authorization_code',
        client_id: process.env.API_CLIENT_ID,
        client_secret: process.env.API_CLIENT_SECRET,
        redirect_uri: process.env.API_REDIRECT_URI,
        code: req.query.code
      }

      // Query API for token
      fetch('http://localhost/oauth/token', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(callback)
        })
        .then(r => r.json())
        .then(data => jsonErrorCheck(data))
        .then(data => {
          // Store JWT from response in cookies
          // if (req.cookies['kushyFToken']) {
          //   res.clearCookie('kushyFToken')
          // }
          // encrypt token with app secret
          // prevents user from seeing the token
          // const encryptedToken = CryptoJS.HmacSHA256(data.access_token, process.env.APP_KEY)

          // create a cookie with encrypted hash of access token
          // res.cookie('kushyFToken', encryptedToken, {
          //   maxAge: 900000,
          //   httpOnly: true
          // });
          res.cookie('kushyFToken', data.access_token, {
            maxAge: 900000,
            httpOnly: true
          });

          // store object in session with encrypted hash + real token
          // req.session.token = data.access_token

          return res.redirect('/dashboard')
        });

      //Redirect to dashboard after login
      // return app.render(req, res, '/dashboard')
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })