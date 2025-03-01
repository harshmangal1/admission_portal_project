const ContactModel = require('../models/contact');
const express = require('express');
const router = express.Router();

// Controller to insert a new contact
class ContactController {
    static insertContact = async (req, res) => {
        try {
            const { name, email, phone, message } = req.body;

            // Save contact information to the database
            const newContact = new ContactModel({
                name,
                email,
                phone,
                message,
            });
            await newContact.save();

            // Redirect to the contact page with a success message
            res.redirect('/contact?success=1');
        } catch (error) {
            console.log(error);
            // Redirect to the contact page with an error message
            res.redirect('/contact?error=1');
        }
    };

    // Controller to get all student contacts
    static getAllContacts = async (req, res) => {
        try {
            const contacts = await ContactModel.find(); // Fetch all contacts
            const { name, image } = req.userData; // Fetch user details from request (if available)
            res.render('admin/displaycontact', { contacts, n: name, i: image }); // Pass all required variables
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error: Unable to fetch contacts');
        }
    };     

    // Controller to view a single contact (optional)
    static viewContact = async (req, res) => {
        try {
            const contact = await ContactModel.findById(req.params.id); // Find a contact by ID
            res.render('viewContact', { contact }); // Render the view for single contact
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error: Unable to fetch the contact');
        }
    };
}

module.exports = ContactController;  // Export the controller, not the router
