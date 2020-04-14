//import lowdb
const db = require('../db');
//import shortid
const shortid = require('shortid'); 

module.exports.index =  (req,res) => {
    res.render('users/index',{
        users:  db.get('users').value()
    });
}

module.exports.search = (req,res) => {
    var q = req.query.q;
    var matchUsers = db.get('users').filter((user) =>{
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index',{
        users: matchUsers.value()
    });
}

module.exports.create = (req,res) =>{
    res.render('users/create');
}

module.exports.get = (req,res) =>{
    var id = req.params.id;
    //console.log(typeof id);
    var user = db.get('users').find({ id : id }).value();
    res.render('users/view',{
        user: user
    });
}

module.exports.postCreate = (req,res) =>{
    //console.log(req.body);
    req.body.id = shortid.generate();
    console.log(res.locals);//hien thị biến từ validation gửi wa
    //console.log(errors);
    db.get('users').push(req.body).write();
    res.redirect('/users');
}