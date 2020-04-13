const express = require('express');
const router = express.Router();//trả về router object
//import lowdb
const db = require('../db');
//import shortid
const shortid = require('shortid');
//import controller
const controller = require('../controllers/user.controller');

/*
1. res.send('User List'); Send trả về dữ liệu string
2. Truyền giá trị callback vào template
3. Install nodemon để khi thay đổi source thì server tự thay đổi theo(npm i --save-dev nodemon (chỉ sử dụng cho dev))
4. Sử dụng database local => lowdb -> install: npm i lowdb --save
5. Sử dụng số ngẫu nhiên => shortid -> npm i shortid --save
*/
//Để không cho server restart lại liên tục khi sử dụng lowdb thì tạo thêm file nodemon.json -> ignore: "db.json"

router.get('/', controller.index);
router.get('/search', controller.search);
//get render
router.get('/create', controller.create);
//thong tin user(dynamic routing)
router.get('/:id',controller.get);

//Install body-parser(de su dung dc body) -> thêm mới
//POST
router.post('/create', controller.postCreate);

//exports chuyển sang route(k co cái này bị lỗi)
module.exports = router;