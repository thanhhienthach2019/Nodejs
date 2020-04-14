module.exports.postCreate = (req,res,next) =>{
    var errors = [];
    if(!req.body.name){
        errors.push('Name is required!');
    }
    if(!req.body.phone){
        errors.push('Phone is required');
    }
    if(errors.length){
        console.log(errors);
        res.render('users/create',{
            err: errors,
            values: req.body
        });
        return;
    }
    res.locals.success = true;//gửi biến qua controller
    next();
}