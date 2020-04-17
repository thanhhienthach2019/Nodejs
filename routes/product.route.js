const express = require('express');
const router = express.Router();//trả về router object
//import controller
const controller = require('../controllers/product.controller');

router.get('/',controller.index);



module.exports = router;