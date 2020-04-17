require('dotenv').config();//tìm file .env nếu có thì lấy biến add vào process.env.SESSION_SECRET
//  console.log(process.env.SESSION_SECRET);//xem biến môi trường trong hệ thống
//sử dụng trang onetimesecret.com để gửi thông tin mật
//*thêm "start": "nodemon --inspect index.js" vào packege.json để chạy với chế độ debug
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
//import route product
const productRoute = require('./routes/product.route');
//import miidleware auth login
const authMiddleware = require('./middlewares/auth.middleware');
const app = express();
app.use(bodyParser.json());//su dung body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser(process.env.SESSION_SECRET));//su dung cookie parser//truyền vào biến môi trường để k đưa KEY env vào trong git->(tạo ra file .env),
//cài dotenv(npm i dotenv)
//và tạo file .gitignore(-> add tên file .env) để khi đưa lên git thì k add những file đó vào

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
//Add route product vào
app.use('/products',productRoute);

app.listen(port, () => {
    console.log('Server listening on port '+ port);
});