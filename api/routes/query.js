const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const QueryController = require('../controllers/query');

router.get('/', QueryController.getAllQueries);

router.post('/', QueryController.AddNewQuery);

router.get('/unAns', QueryController.getAllUnAnsQueries);

router.get('/ans', QueryController.getAllAnsQueries);

router.get('/user/:uId', QueryController.getAllUserQueries);

router.patch('/:queryId', QueryController.updateQuery);

module.exports = router;
