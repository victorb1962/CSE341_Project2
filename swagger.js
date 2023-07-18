const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE341 Portfolio - Project-Finalxxx',
    description: 'API for a Magazine Subscription App'
  }, 

  host: 'localhost:3000', // enable for localhost with 'http'
  // host: 'https://cse341-final-in8m.onrender.com', // enable for production with 'https'
  schemes: ['http']
};

const outputFile = './swagger.json';          // to generated json - npm run swagger
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });
