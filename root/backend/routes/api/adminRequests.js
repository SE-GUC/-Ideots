const express = require("express");
const router = express.Router();
//const mongoose = require('mongoose')
const validator = require('../../validations/requestValidations')
// We will be connecting using database
const Request = require("../../models/Request")
const RequestsFunctions = require('../../controllers/adminReuestController')


// getting the requests


router.get("/all",RequestsFunctions.get_Allrequests);



router.get('/:id', RequestsFunctions.get_requests_byId);



//update

router.put("/:id",RequestsFunctions.update_request);

//Delete

router.delete("/:requestId",RequestsFunctions.delete_request);



module.exports = router;
