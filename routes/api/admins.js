const express = require('express');
const router = express.Router();

const Admin =require('../../controllers/admins')

// Get all admins
router.get("/",Admin.getAdmins);

// Get a certain admin
router.get('/:id', Admin.getAdmin);

// Create a admin
router.post('/', Admin.postAdmin);

// Update a admin info
router.put('/:id', Admin.putAdmin);

// Delete a admin
router.delete('/:id',Admin.deleteAdmin);

module.exports = router