const jwt = require('jsonwebtoken')

const authRoles = (roles) =>{
    return (req,res,next) =>{
        // console.log(req.user.role)
        if (!roles.includes(req.userData.role)){   // role is the key in req.user
            req.flash('error','Unauthorised user Please login with a valid account')
            res.redirect('/')
        }
        next();
    }
}
module.exports = authRoles