const jwt = require('jsonwebtoken')
const { verifyLogin } = require('../controllers/FrontController')

const checkAuth =(req,res, next)=>{
    // console.log("hello auth")
    const {token} = req.cookies
    if(!token){
        req.flash('error','Unauthorised user please login')
        res.redirect('/')
    }else{
        const verifyToken = jwt.verify(token,'hars12345')
        // console.log(verifyLogin)
        next();


        //next();   next method route par pacha dega
    }
    // console.log(token)
}

module.exports = checkAuth