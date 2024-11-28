const CourseModel = require("../../models/course");
const UserModel = require("../../models/user");
const nodemailer = require('nodemailer')

class AdminController {
  static dashboard = async (req, res) => {
    try {
      const { name, image } = req.userData;
      res.render("admin/dashboard", { n: name, i: image });
    } catch (error) {
      console.log(error);
    }
  };
  static displayStudent = async (req, res) => {
    try {
      const { name, image } = req.userData;
      const data = await UserModel.find();
      // console.log(data)
      res.render("admin/displaystudent", { d: data, n: name, i: image });
    } catch (error) {
      console.log(error);
    }
  };
  static deleteStudent = async (req, res) => {
    try {
      // const data = await UserModel.find();
      // console.log(data)
      // res.render('',{d:data});
      console.log(req.params.id);
    } catch (error) {
      console.log(error);
    }
  };
  static viewStudent = async (req, res) => {
    try {
      const { name, image } = req.userData;
      const data = await UserModel.findById(req.params.id);
      res.render("admin/view", { view: data, n: name, i: image });
    } catch (error) {
      console.log(error);
    }
  };
  static editStudent = async (req, res) => {
    try {
      const { name, image } = req.userData;
      const result = await UserModel.findById(req.params.id);
      res.render("admin/StudentEdit", { d: result, n: name, i: image });
    } catch (error) {
      console.log(error);
    }
  };
  static updateStudent = async (req, res) => {
    try {
      const id = req.params.id;
      const { name, email, password, course } = req.body;
      await UserModel.findByIdAndUpdate(id, {
        name,
        email,
        password,
      });
      res.redirect("admin/displaystudent");
    } catch (error) {
      console.log(error);
    }
  };

  static StudentInsert = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      await UserModel.create({
        name,
        email,
        password,
      });
      res.redirect("/admin/studentDisplay");
    } catch (error) {
      console.log(error);
    }
  };

  //course Display
  static courseDisplay = async (req, res) => {
    try {
      const { name, image } = req.userData;
      const course = await CourseModel.find();
      // console.log(data)
      res.render("admin/courseDisplay", { c: course, n: name, i: image });
    } catch (error) {
      console.log(error);
    }
  };

  static updateProfile = async (req, res) => {
    try {
      const { id } = req.userData;
      const { name, email, role } = req.body;
      if (req.files) {
        const user = await UserModel.findById(id);
        const imageID = user.image.public_id;
        console.log(imageID);

        //deleting image from Cloudinary
        await cloudinary.uploader.destroy(imageID);
        //new image update
        const imagefile = req.files.image;
        const imageupload = await cloudinary.uploader.upload(
          imagefile.tempFilePath,
          {
            folder: "userprofile",
          }
        );
        var data = {
          name: name,
          email: email,
          image: {
            public_id: imageupload.public_id,
            url: imageupload.secure_url,
          },
        };
      } else {
        var data = {
          name: name,
          email: email,
        };
      }
      await UserModel.findByIdAndUpdate(id, data);
      req.flash("success", "Update Profile successfully");
      res.redirect("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  static changePassword = async (req, res) => {
    try {
      const { id } = req.userData;
      //      console.log(req.body)
      const { op, np, cp } = req.body;
      if (op && np && cp) {
        const user = await UserModel.findById(id);
        const isMatched = await bcrypt.compare(op, user.password);
        //console.log(isMatched)
        if (!isMatched) {
          req.flash("error", "Current password is incorrect ");
          res.redirect("/profile");
        } else {
          if (np != cp) {
            req.flash("error", "Password does not match");
            res.redirect("/profile");
          } else {
            const newHashPassword = await bcrypt.hash(np, 10);
            await UserModel.findByIdAndUpdate(id, {
              password: newHashPassword,
            });
            req.flash("success", "Password Updated successfully ");
            res.redirect("/");
          }
        }
      } else {
        req.flash("error", "ALL fields are required ");
        res.redirect("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };
  static update_status = async(req,res)=>{
    try{
        const id = req.params.id;
        const{name,email,status,comment,course}= req.body
        //  console.log(req.body)
        await CourseModel.findByIdAndUpdate(id,{
            status,
            comment
        })
        this.sendEmail(name,email,status,comment,course)
        res.redirect('/admin/courseDisplay',)
    }catch (error){
        console.log(error);
    }
};

  static sendEmail = async (name, email,status,comment,course) => {
    //console.log(name, email, course);
    // connenct with the smtp server

    let transporter = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,

      auth: {
        user: "deewan.harsh001@gmail.com",
        pass: "egdvgxwfdqnccsyb",
      },
    });
    let info = await transporter.sendMail({
      from: "test@gmail.com", // sender address
      to: email, // list of receivers
      subject: ` Course ${course}`, // Subject line
      text: "heelo", // plain text body
      html: `<b>${name}</b> Course  <b>${course}</b> ${status} successful! ${comment} <br>
                 `, // html body
    });
  };
}
module.exports = AdminController;
