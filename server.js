require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

// MongoDB
const mongodb = require('./db/connect');
const port = process.env.PORT || 3000;
const app = express();

// Swagger API 
const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
const swaggerDocument = require('./swaggerDesign.json');

// Auth0
const { auth, requiresAuth } = require('express-openid-connect');

// Auth0 setup here and in .env file
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

// Establish a connection to the mongodb database
mongodb.initDb((err) => {
  if (err) {
    console.log('Connection to database failed: ' + err);
  } else {
    console.log(`Connected to DB and listening on ${port}`);
  }
});

// Body-parser is used to process data sent in an HTTP request body and made available under req.body property
app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

// Routes
app
  .use('/', require('./routes'));

// Auth0
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
// Check if user has already logged-in
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

// API-DOCS
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Console information
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
