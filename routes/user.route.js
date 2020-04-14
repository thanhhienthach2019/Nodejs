const express = require('express');
const router = express.Router();//trả về router object
//import controller
const controller = require('../controllers/user.controller');
//import validate(middleware)
const validate = require('../validate/user.validate');
/*
1. res.send('User List'); Send trả về dữ liệu string
2. Truyền giá trị callback vào template
3. Install nodemon để khi thay đổi source thì server tự thay đổi theo(npm i --save-dev nodemon (chỉ sử dụng cho dev))
4. Sử dụng database local => lowdb -> install: npm i lowdb --save
5. Sử dụng số ngẫu nhiên => shortid -> npm i shortid --save
*/
//Để không cho server restart lại liên tục khi sử dụng lowdb thì tạo thêm file nodemon.json -> ignore: "db.json"

router.get('/', controller.index);
// Cookie 
router.get('/cookie',(req,res,next)=>{
    res.cookie('user-id',12345);
    res.send('Hello');
});

router.get('/search', controller.search);
//get render
router.get('/create', controller.create);
//thong tin user(dynamic routing)
router.get('/:id',controller.get);

//Install body-parser(de su dung dc body) -> thêm mới
//POST
router.post('/create', validate.postCreate,controller.postCreate);//validate kiểm tra trước khi chạy middleware 2
//Midleaware
function middleware1(req,res,next){
    console.log('Middleware 1');
    next();//k có next thì k chạy tiếp middleware 2
}
function middleware2(req,res,next){
    console.log('Middleware 1');
    res.send('Hello');
}
router.get('/test',middleware1,middleware2);

//exports chuyển sang route(k co cái này bị lỗi)
module.exports = router;