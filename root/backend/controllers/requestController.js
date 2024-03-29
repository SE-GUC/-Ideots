const express = require("express");
const router = express.Router();

const validator = require('../validations/requestValidations')
// We will be connecting using database
const Request = require("../models/Request");

const notificationController = require("../controllers/sendNotificationController");

// exports.get_requests = async (req, res) => {
//   const requests = await Request.find()
//   .populate("partnerID")
//   .populate("consultancyID");
//     if(requests.length===0)
//     res.json({msg : "empty"})
//     else
//     res.json({ data: requests })
// };


exports.get_Myrequests = async (req, res) => {
  const partnerId = req.user._id;
  const requests = await Request.find({ partnerID: partnerId })
  .populate("partnerID")
  .populate("consultancyID");
    if(requests.length===0)
    res.json({msg : "empty"})
    else
    res.json({ data: requests })
};

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

  exports.create_request = async (req, res) => {
    try{
    const date = new Date();
    const myDate = date.toLocaleString();
    const partnerId = req.user._id;
    const isValidated = validator.requestCreateValidation(req.body)
    if(isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message})
    req.body.date = myDate
    req.body.partnerID=partnerId
    const request = await Request.create(req.body)
  
   //------------------------(Notify Admins)-------------------------------------
   const requestId = request._id;
   await notificationController.notifyAdmins(requestId,`New task request has been created`);
   //------------------------------------------------------------------

    res.json({msg:'Request was created successfully', data: request });
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
    //------------------------(Notify Partner that his request is rejected)-------------------------------------
    const recieverId = deletedRequest.partnerID;
    await notificationController.notifyUser(id,recieverId,`Your task request has been deleted by admin`);
    //------------------------------------------------------------------  

    res.json({msg:'Request was deleted successfully', data: deletedRequest });
    }
    catch(error){
      console.log(error)
    }
  }