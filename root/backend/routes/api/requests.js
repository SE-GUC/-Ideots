const express = require("express");
const router = express.Router();
//const mongoose = require('mongoose')
const validator = require('../../validations/requestValidations')
// We will be connecting using database
const Request = require("../../models/Request")
const RequestsFunctions = require('../../controllers/requestController')


// getting the requests

router.get("/",RequestsFunctions.get_requests);



router.get('/:id', RequestsFunctions.get_requests_byId);

//Creating
router.post("/", RequestsFunctions.create_request);

//update

router.put("/:id",RequestsFunctions.update_request);

//Delete

router.delete("/:requestId",RequestsFunctions.delete_request);



module.exports = router;
