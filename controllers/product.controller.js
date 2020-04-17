//import lowdb
const db = require('../db');

module.exports.index =  (req,res) => {
    var page = req.query.page || 1;//nếu k có giá trị thì mặc định = 1
    var perPage = 8;//x
    var start = (page - 1) * perPage;
    var end = page * perPage;

    var drop = (page - 1) * perPage;
    res.render('products/index',{
        //prod:  db.get('products').value().slice(start,end)
        prod:  db.get('products').drop(drop).take(perPage).value()//sử dụng thư viện lodash(lodash.com), drop đi n phần tử đầu tiên
    });
}