const express = require("express");
const router = express.Router();

const validator = require('../validations/requestValidations')
// We will be connecting using database
const Request = require("../models/Request");


// exports.get_requests = async (req, res) => {
//   const requests = await Request.find()
//   .populate("partnerID")
//   .populate("consultancyID");
//     if(requests.length===0)
//     res.json({msg : "empty"})
//     else
//     res.json({ data: requests })
// };



exports.get_Allrequests = async (req, res) => {
  const requests = await Request.find()
  .populate("partnerID")
  .populate("consultancyID");
    if(requests.length===0)
    res.json({msg : "empty"})
    else
    res.json({ data: requests })
};

exports.get_requests_byId = async (req, res) => {  
    try{
    const  requestId = req.params.id;
    const request = await Request.findById(requestId)
    .populate("partnerID")
    .populate("consultancyID");
    if(!request) { return res.status(404).send({error: "Request does not exist"})}
                        
    return res.json({request});
    }
    catch(error)
    {
      console.log(error)
    }
    
  }


  exports.update_request = async  (req, res) => {
    try{
    const requestId = req.params.id;
    
    const request =  await Request.findById(requestId)
    if(!request) return res.status(404).send({error:  'Request does not exist'})
    
    const isValidated = validator.requestUpdateValidation(req.body)
    if (isValidated.error) return   res.status(400).send({ error: isValidated.error.details[0].message })
    const updatedRequest = await Request.updateOne({'_id':requestId},req.body)
    res.json({msg: 'Request updated successfully' , data: request });
    }
    catch(error)
    {
      console.log(error)
    }
  }

  exports.delete_request =  async (req, res) => {
    try{ 
    const id = req.params.requestId;
    const deletedRequest = await Request.findByIdAndRemove(id) 
    if(!deletedRequest) return res.status(404).send({error: 'request does not exist' })

    res.json({msg:'Request was deleted successfully', data: deletedRequest });
    }
    catch(error){
      console.log(error)
    }
  }