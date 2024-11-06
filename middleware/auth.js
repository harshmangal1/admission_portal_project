const jwt = require('jsonwebtoken')
const { verifyLogin } = require('../controllers/FrontController')
const UserModel = require('../models/user');

const checkAuth =async(req,res, next)=>{
    // console.log("hello auth")
    const {token} = req.cookies
    if(!token){
        req.flash('error','Unauthorised user please login')
        res.redirect('/')
    }else{
        const verifyToken = jwt.verify(token,'hars12345')
        // console.log(verifyLogin)
        const data = await UserModel.findOne({_id:verifyToken.ID})
        // console.log(data)
        req.userData= data
        next();


        //next();   next method route par pacha dega
    }
    // console.log(token)
}

module.exports = checkAuth