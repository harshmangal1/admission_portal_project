const express = require('express');
const FrontController = require('../controllers/FrontController');
const AdminController = require('../controllers/admin/AdminController');
const route = express.Router()
const checkAuth = require('../middleware/auth');
const CourseController = require('../controllers/CourseController');
const adminRole = require('../middleware/adminRole')
const isLogin = require('../middleware/isLogin')


route.get('/home',checkAuth, FrontController.home);
route.get('/about',checkAuth, FrontController.about);
route.get('/',isLogin,FrontController.login);
route.get('/register',FrontController.register);
route.get('/contact',checkAuth, FrontController.contact);
//profile update and changePassword
route.get('/profile',checkAuth,FrontController.profile);
route.post('/changePassword',checkAuth,FrontController.changePassword);
route.post('/updateProfile',checkAuth,FrontController.updateProfile);


// insert data
route.post('/insertStudent',FrontController.insertStudent);
//verifyLogin
route.post('/verifyLogin',FrontController.verifyLogin);
route.get('/logout',FrontController.logout);



//adminController
route.get('/admin/dashboard',checkAuth,adminRole('admin'), AdminController.dashboard);
route.get('/admin/studentDisplay',checkAuth,adminRole('admin'),AdminController.displayStudent);
route.get('/admin/deleteStudent/:id',checkAuth,adminRole('admin'),AdminController.deleteStudent);
route.get('/admin/studentView/:id',checkAuth,adminRole('admin'),AdminController.viewStudent);
route.get('/admin/StudentEdit/:id',checkAuth,adminRole('admin'),AdminController.updateStudent);
//course display admin
route.get('/admin/courseDisplay',checkAuth,adminRole('admin'),AdminController.courseDisplay);
route.post('/admin/update_status/:id',checkAuth,adminRole('admin'),AdminController.update_status);



//add student

// route.post('/admin/StudentUpdate',AdminController.StudentUpdate);
route.post('/admin/insertStudent',adminRole('admin'),AdminController.StudentInsert);

//contact
// route.post("/insertContact", ContactController.insertContact)

//course
route.post("/course_insert",checkAuth,CourseController.CourseInsert)
route.get("/CourseDisplay",checkAuth,CourseController.CourseDisplay)
route.get("/courseView/:id",checkAuth,CourseController.courseView)
route.get("/courseEdit/:id",checkAuth,CourseController.courseEdit)
route.post("/courseUpdate/:id",checkAuth,CourseController.courseUpdate)
route.get("/courseDelete/:id",checkAuth,CourseController.courseDelete)

// forget password
route.post('/forgot_Password',FrontController.forgetPasswordVerify)
route.get('/reset-password',FrontController.reset_Password)
route.post('/reset_Password1',FrontController.reset_Password1)

// verify mail 
route.get('/verify',FrontController.verifyMail)

module.exports = route;