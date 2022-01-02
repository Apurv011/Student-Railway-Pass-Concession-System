const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const TrainsController = require('../controllers/trains');

router.get('/', TrainsController.getAllTrains);

router.post('/', checkAuth, TrainsController.createNewTrain);

router.get('/:trainId', TrainsController.getOneTrain);

router.get('/stations/:from/:to', TrainsController.getStationsTrains);

router.patch('/:trainId', checkAuth, TrainsController.updateOneTrain);

router.delete('/:trainId', checkAuth, TrainsController.deleteOneTrain);

module.exports = router;
