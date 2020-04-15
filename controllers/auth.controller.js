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
    res.cookie('userId',user.id);
    res.redirect('/users');
}