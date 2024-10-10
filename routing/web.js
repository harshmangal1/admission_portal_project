const express = require('express');
const FrontController = require('../controllers/FrontController');
const AdminController = require('../controllers/admin/AdminController');
const route = express.Router()

//routing
// route.get("/", (req, res) => {
//     res.send("Home");
//   });
  
// route.get("/about", (req, res) => {
//     res.send("About");
//   });
  
// route.get("/team", (req, res) => {
//     res.send("team");
//   });
route.get('/home',FrontController.home);
route.get('/about',FrontController.about);
route.get('/',FrontController.login);
route.get('/register',FrontController.register);
route.get('/contact',FrontController.contact);

// insert data
route.post('/insertStudent',FrontController.insertStudent);



//adminController
route.get('/admin/dashboard',AdminController.dashboard);
route.get('/admin/studentDisplay',AdminController.displayStudent);
route.get('/admin/deleteStudent/:id',AdminController.deleteStudent);

route.get('/admin/studentView/:id',AdminController.viewStudent);
route.get('/admin/StudentEdit/:id',AdminController.updateStudent);

//add student
route.post('/admin/insertStudent',AdminController.StudentInsert);


module.exports = route;