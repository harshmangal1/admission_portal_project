const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    roll:{
        type:String,
        default:"Student"
    }
},{timestamps:true})
const UserModel = mongoose.model('user',UserSchema)
module.exports = UserModel