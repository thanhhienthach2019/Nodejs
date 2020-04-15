const express = require('express');
const port = 3000;
const bodyParser = require('body-parser');
//import lowdb
const db = require('./db');
//import route user
const userRoute = require('./routes/user.route');
//import cookie(install cookie -> cookie-parser)
const cookieParser = require('cookie-parser');
//import route auth
const authRoute = require('./routes/auth.route');
//import miidleware auth login
const authMiddleware = require('./middlewares/auth.middleware');
const app = express();
app.use(bodyParser.json());//su dung body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());//su dung cookie parser

app.use(express.static('public'));//add thư mục static để có thể truy cập dc thư mục trong public

app.set('view engine','pug');//Su dung pubhtml
app.set('views','./views');

app.get('/', (req,res) => {
    res.render('index',{
        name: 'TTH'
    }); 
});
//Add route user vào
app.use('/users',authMiddleware.requireAuth,userRoute);//tất cả các route thông qua miidleware kiểm tra login
//Add route auth vao
app.use('/auth',authRoute);

app.listen(port, () => {
    console.log('Server listening on port '+ port);
});