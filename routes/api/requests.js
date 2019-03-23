const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const validator = require('../../validations/requestValidations')
// We will be connecting using database
const Request = require("../../models/Request");



// getting the requests
router.get("/",async (req, res) =>{
       const requests = await Request.find()
       res.json({ data: requests })
 });


// getting specific request

router.get('/:id', async (req, res) => {  
  try{
  const  requestId = req.params.id;  
  const request = await Request.findById(requestId)
  if(!request) return res.status(404).send({error: 'Request does not exist'})
  return res.json({request});
  }
  catch(error)
  {
    console.log(error)
  }
});

//Creating
router.post("/",async (req, res) => {
  try{
  const date = new Date();
  const myDate = date.toLocaleString();
 

  const isValidated = validator.requestCreateValidation(req.body)
  if(isValidated.error) return res.status(404).send({error: isValidated.error.details[0].message})


  const request = await Request.create(req.body)
  request.date = myDate

  res.json({msg:'Request was created successfully', data: request });
  }
  catch(error)
  {
    console.log(error)
  }
});

//update
router.put("/:id",async  (req, res) => {
  try{
  const requestId = req.params.id;
  
  const request =  await Request.findById(requestId)
  if(!request) return res.status(404).send({error: 'Request does not exist'})
  
  const isValidated = validator.requestUpdateValidation(req.body)
  if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
  const updatedRequest = await Request.updateOne({'_id':requestId},req.body)
  res.json({msg: 'Request updated successfully' , data: request });
  }
  catch(error)
  {
    console.log(error)
  }
});

//Delete

router.delete("/:requestId", async (req, res) => {
  try{ 
  const id = req.params.requestId;
  const deletedRequest = await Request.findByIdAndRemove(id) 
  if(!deletedRequest) return res.status(404).send({error: 'request does not exist' })
  res.json({msg:'Request was deleted successfully', data: deletedRequest });
  }
  catch(error){
    console.log(error)
  }
});

module.exports = router;
