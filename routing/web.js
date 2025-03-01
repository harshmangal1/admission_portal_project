const express = require("express");
const FrontController = require("../controllers/FrontController");
const AdminController = require("../controllers/admin/AdminController");
const CourseController = require("../controllers/CourseController");
const ContactController = require('../controllers/ContactController');
const checkAuth = require("../middleware/auth");
const adminRole = require("../middleware/adminRole");
const isLogin = require("../middleware/isLogin");

const route = express.Router();  // Corrected reference

/** --------------------------------
 *  Public Routes
 * -------------------------------- */
// Home and Info Pages
route.get("/", isLogin, FrontController.login); // Login page
route.get("/home", checkAuth, FrontController.home); // Dashboard/Home
route.get("/about", checkAuth, FrontController.about); // About page
route.get("/contact", checkAuth, FrontController.contact); // Contact page
route.get("/register", FrontController.register); // Registration page

// Route to handle contact form submission
route.post('/contact', ContactController.insertContact); // Fixed "route" instead of "router"
// Route to display all contacts (admin route)
route.get('/admin/studentContact', ContactController.getAllContacts);

// Route to view a single contact (optional)
route.get('/admin/viewContact/:id', checkAuth, adminRole("admin"), ContactController.viewContact);

// Authentication
route.post("/verifyLogin", FrontController.verifyLogin); // Verify login credentials
route.get("/logout", FrontController.logout); // Logout

// Forgot Password
route.post("/forgot_Password", FrontController.forgetPasswordVerify); // Forgot password process
route.get("/reset-password", FrontController.reset_Password); // Reset password page
route.post("/reset_Password1", FrontController.reset_Password1); // Reset password logic

// Email Verification
route.get("/verify", FrontController.verifyMail); // Email verification

/** --------------------------------
 *  Profile and User Management
 * -------------------------------- */
// Profile
route.get("/profile", checkAuth, FrontController.profile); // View profile
route.post("/updateProfile", checkAuth, FrontController.updateProfile); // Update profile
route.post("/changePassword", checkAuth, FrontController.changePassword); // Change password

/** --------------------------------
 *  Student Management
 * -------------------------------- */
// Add or Insert Student
route.post("/insertStudent", FrontController.insertStudent); // Insert new student

// Admin View for Students
route.get(
  "/admin/studentDisplay",
  checkAuth,
  adminRole("admin"),
  AdminController.displayStudent
);
route.get(
  "/admin/studentView/:id",
  checkAuth,
  adminRole("admin"),
  AdminController.viewStudent
);
route.get(
  "/admin/StudentEdit/:id",
  checkAuth,
  adminRole("admin"),
  AdminController.updateStudent
);
route.get(
  "/admin/deleteStudent/:id",
  checkAuth,
  adminRole("admin"),
  AdminController.deleteStudent
);
route.post(
  "/admin/insertStudent",
  adminRole("admin"),
  AdminController.StudentInsert
);

/** --------------------------------
 *  Course Management
 * -------------------------------- */
// Course Operations
route.post("/course_insert", checkAuth, CourseController.CourseInsert); // Insert course
route.get("/CourseDisplay", checkAuth, CourseController.CourseDisplay); // Display courses
route.get("/courseView/:id", checkAuth, CourseController.courseView); // View course details
route.get("/courseEdit/:id", checkAuth, CourseController.courseEdit); // Edit course
route.post("/courseUpdate/:id", checkAuth, CourseController.courseUpdate); // Update course
route.get("/courseDelete/:id", checkAuth, CourseController.courseDelete); // Delete course

/** --------------------------------
 *  Admin Dashboard
 * -------------------------------- */
// Admin Dashboard
route.get(
  "/admin/dashboard",
  checkAuth,
  adminRole("admin"),
  AdminController.dashboard
);

// Course Management (Admin)
route.get(
  "/admin/courseDisplay",
  checkAuth,
  adminRole("admin"),
  AdminController.courseDisplay
);
route.post(
  "/admin/update_status/:id",
  checkAuth,
  adminRole("admin"),
  AdminController.update_status
);

module.exports = route;  // Ensure we're exporting "route"
