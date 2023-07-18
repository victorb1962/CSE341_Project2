const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
// use custom json
const swaggerDocument = require('../swaggerDesign.json'); 
// use generated json - npm run swagger
// const swaggerDocument = require('../swagger.json');    
router.use('/api-docs', swaggerUi.serve);
router.use(
  '/api-docs',
  swaggerUi.setup(swaggerDocument, {
    explorer: true
  })
);

module.exports = router;
