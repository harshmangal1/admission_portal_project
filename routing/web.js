const express = require('express');
const FrontController = require('../controllers/FrontController');
const AdminController = require('../controllers/admin/AdminController');
const route = express.Router()
const checkAuth = require('../middleware/auth')


route.get('/home',checkAuth, FrontController.home);
route.get('/about',checkAuth, FrontController.about);
route.get('/',FrontController.login);
route.get('/register',FrontController.register);
route.get('/contact',checkAuth, FrontController.contact);

// insert data
route.post('/insertStudent',FrontController.insertStudent);
//verifyLogin
route.post('/verifyLogin',FrontController.verifyLogin);
route.get('/logout',FrontController.logout);



//adminController
route.get('/admin/dashboard',AdminController.dashboard);
route.get('/admin/studentDisplay',AdminController.displayStudent);
route.get('/admin/deleteStudent/:id',AdminController.deleteStudent);

route.get('/admin/studentView/:id',AdminController.viewStudent);
route.get('/admin/StudentEdit/:id',AdminController.updateStudent);

//add student
route.post('/admin/insertStudent',AdminController.StudentInsert);


module.exports = route;