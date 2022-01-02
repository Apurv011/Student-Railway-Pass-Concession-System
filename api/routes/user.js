const express = require('express');
const router = express.Router();
const multer = require('multer');

const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

const UserController = require('../controllers/user');

router.get('/unVerified', UserController.getUnVerifiedUser);

router.get('/verified', UserController.getVerifiedUser);

router.get('/getAll', UserController.getAll);

router.get('/rejected', UserController.getRejectedUser);

router.post('/signup', upload.single('collegeIDImage'), UserController.signUp);

router.post('/login', UserController.logIn);

router.post('/sendMail', UserController.sendMail);  

router.get('/:userId', checkAuth, UserController.getOneUser);

router.patch('/:userId', upload.single('collegeIDImage'), UserController.editUser);

router.delete('/:userId', checkAuth, UserController.deleteUser);

module.exports = router;
