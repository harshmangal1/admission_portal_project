const ContactModel = require('../models/contact')
class ContactController{

    static insertContact =async(req,res)=>{
        try {
            console.log(req.body)
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports =ContactController