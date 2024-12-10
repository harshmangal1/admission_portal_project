const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')

const isLogin = async (req, res, next) => {
    //console.log('hello middleware')
    const{token}=req.cookies
    // console.log(token)
    if(token){
        verifyLogin = jwt.decode(token);
        const data = await UserModel.findOne({_id: verifyLogin.ID});
        if(data.role == "student"){
            res.redirect("/home");
        }else if(data.role == "admin"){
            res.redirect("/admin/dashboard");
        }
        next();
    }else{
        next();
    }
};
module.exports = isLogin