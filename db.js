//import lowdb
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

//Để không cho server restart lại liên tục khi sử dụng lowdb thì tạo thêm file nodemon.json -> ignore: "db.json"
//Lowdb
//xet mac dinh cho bảng users
db.defaults({users: []})
   .write();
// const users =  [
//     {id: 1, name: 'Thach'},
//     {id: 2, name: 'Thanh'},
//     {id: 3, name: 'Hien'}
// ]
module.exports = db;