const express = require('express');
const FrontController = require('../controllers/FrontController');
const AdminController = require('../controllers/admin/AdminController');
const route = express.Router()
const checkAuth = require('../middleware/auth');
const CourseController = require('../controllers/CourseController');


route.get('/home',checkAuth, FrontController.home);
route.get('/about',checkAuth, FrontController.about);
route.get('/',FrontController.login);
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
route.get('/admin/dashboard',checkAuth,AdminController.dashboard);
route.get('/admin/studentDisplay',checkAuth,AdminController.displayStudent);
route.get('/admin/deleteStudent/:id',checkAuth,AdminController.deleteStudent);
route.get('/admin/studentView/:id',checkAuth,AdminController.viewStudent);
route.get('/admin/StudentEdit/:id',checkAuth,AdminController.updateStudent);

//add student

// route.post('/admin/StudentUpdate',AdminController.StudentUpdate);
route.post('/admin/insertStudent',AdminController.StudentInsert);

//contact
// route.post("/insertContact", ContactController.insertContact)

//course
route.post("/course_insert",checkAuth,CourseController.CourseInsert)
route.get("/CourseDisplay",checkAuth,CourseController.CourseDisplay)
route.get("/courseView/:id",checkAuth,CourseController.courseView)
route.get("/courseEdit/:id",checkAuth,CourseController.courseEdit)
route.post("/courseUpdate/:id",checkAuth,CourseController.courseUpdate)
route.get("/courseDelete/:id",checkAuth,CourseController.courseDelete)



module.exports = route;