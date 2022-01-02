const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const PassController = require('../controllers/pass');

router.get('/', PassController.getAllPass);

router.post('/', PassController.CreateOnePass);

router.get('/pending', PassController.getPassPending);

router.get('/verified', PassController.getPassVerified);

router.get('/rejected', PassController.getPassRejected);

router.get('/class/:cls', PassController.getClassPass);

router.get('/user/:userId', PassController.getOneUserPass);

router.get('/branch/:branch', PassController.getPassVerifiedBranch);

router.get('/source/:src', PassController.getPassVerifiedSrc);

router.get('/destination/:dest', PassController.getPassVerifiedDest);

router.get('/duration/:dur', PassController.getDurationPass);

router.get('/gender/:gen', PassController.getPassVerifiedGender);

router.get('/source-gender/:src/:gen', PassController.getPassVerifiedSrcGender);

router.get('/source-branch/:src/:branch', PassController.getPassVerifiedSrcBranch);

router.get('/gender-branch/:gen/:branch', PassController.getPassVerifiedGenBranch);

router.patch('/:passId', PassController.updatePass);

module.exports = router;
