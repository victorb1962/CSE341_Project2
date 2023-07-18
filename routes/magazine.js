const express = require('express');
const router = express.Router();

const magazineController = require('../controllers/magazine');
const validation = require('../middleware/validate');

router.get('/', magazineController.getAllMagazine);

router.get('/:id', magazineController.getMagazine);

router.post('/', validation.saveMagazine, magazineController.createMagazine);

router.put('/:id', magazineController.updateMagazine);

router.delete('/:id', magazineController.deleteMagazine);

module.exports = router;
