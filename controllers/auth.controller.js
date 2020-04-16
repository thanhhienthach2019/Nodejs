const md5 = require('md5');//import md5
const db = require('../db');


module.exports.login = (req,res) =>{
    res.render('auth/login');
};

module.exports.postLogin = (req,res) =>{
    var email = req.body.email;
    var password = req.body.password;
    var user = db.get('users').find({email: email}).value();

    if(!user){
        res.render('auth/login',{
            err: [
                'User does not exist.'
            ],
            values: req.body
        });
        return;
    }
    var hashedPassword = md5(password);//mã hóa md5
    if(user.password !== hashedPassword){
        res.render('auth/login',{
            err: [
                'Wrong password.'
            ],
            values: req.body
        });
        return;
    }
    res.cookie('userId',user.id,{//cookies sẽ tạo ra 1 chuỗi ngẫu nhiên để xác thực cookies hiện tại
        signed: true//su dung signed cookie để tránh trường hợp chèn cookie khác để đăng nhập,
    });
    res.redirect('/users');
}