const UserModel = require("../models/user");
const TeacherModel = require("../models/teacher");
const cloudinary = require('cloudinary')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

//setup
cloudinary.config({
  cloud_name:"dgggmgzas",
  api_key:"467741997849787",
  api_secrect:"wN7oPL0_W5uzP9jIR1aqtvX18UI",
})
class FrontController {
  static home = async (req, res) => {
    try {
      res.render("home");
    } catch (error) {
      console.log(error);
    }
  };
  static about = async (req, res) => {
    try {
      res.render("about");
    } catch (error) {
      console.log(error);
    }
  };
  static login = async (req, res) => {
    try {
      res.render("login", {message: req.flash("success"),msg:req.flash('error')});
    } catch (error) {
      console.log(error);
    }
  };
  static register = async (req, res) => {
    try {
      res.render("register", {message: req.flash("error"),
        msg:req.flash('success') });
    } catch (error) {
      console.log(error);
    }
  };
  static contact = async (req, res) => {
    try {
      res.render("contact");
    } catch (error) {
      console.log(error);
    }
  };

  // insert Data
  static insertStudent = async (req, res) => {
    try {
      console.log(req.body)
      const { name, email, password, confirmpasword } = req.body;
      if (!name || !email || !password || !confirmpasword) {
        req.flash("error", "All Fields are Required.");
        return res.redirect("/register");
      }
      const isEmail = await UserModel.findOne({ email });
      if (isEmail){
        req.flash("error", "Email Already Exists.");
        return res.redirect("/register");
      }
      if (password != confirmpasword){
        req.flash("error", "Password does not match.");
        return res.redirect("/register");
      }
      const file = req.files.image;
      const imageUpload = await cloudinary.uploader.upload(file.tempFilePath,{
        folder: "userprofile"
      })
       
      const hashPassword = await bcrypt.hash(password, 10);
      const data = await UserModel.create({
        name,
        email,
        password: hashPassword,
        image:{
          public_id : imageUpload.public_id,
          url: imageUpload.secure_url,
        },
      });
      req.flash("success", "Register Secure ! plz Login");
      req.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };

  static verifyLogin = async (req, res) => {
    try {
      const{ email, password } = req.body;
      if(email && password) {
        const user = await UserModel.findOne({ email: email })
        if (user != null) {
          const isMatched = await bcrypt.compare(password, user.password)
          console.log(isMatched)
          if(isMatched){
            // create token
            var token = jwt.sign({ ID: user.id }, 'hars12345');
            // console.log(token)
            res.cookie('token',token)

            res.redirect('/home')
          } else {
            req.flash('error', 'Email or password is not valid')
            return res.redirect('/')
          }
        } else {
          req.flash('error','You are not a registered user')
          return res.redirect('/')
        }
      }else{
        req.flash('error','All Fields Reduired')
        res.redirect('/')
      }
    } catch (error) {
      console.log(error);
    }
  };
  static logout = async (req, res) => {
    try {
      res.clearCookie("token"); //clearCookie  --> token expire
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = FrontController;
