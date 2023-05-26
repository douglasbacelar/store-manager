const express = require('express');

const router = express.Router();

const { salesController } = require('../controllers');

router.get('/', salesController.getAll);
router.get('/:salesId', salesController.getId);

module.exports = router;