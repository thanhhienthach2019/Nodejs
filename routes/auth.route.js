const express = require('express');
const router = express.Router();//trả về router object
//import controller
const controller = require('../controllers/auth.controller');


router.get('/login',controller.login);

router.post('/login',controller.postLogin);





//exports chuyển sang route(k co cái này bị lỗi)
module.exports = router;