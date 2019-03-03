const express = require("express");
const router = express.Router();

// We will be connecting using database
const Request = require("../../models/Request");

// temporary data created as if it was pulled out of the database ...
const requests = [
  new Request(1, "1/9/1999", "first discription", true, true, ""),
  new Request(2, "1/2/1988", "second description", false, false, "not precise")
];

// getting the requests
router.get("/", (req, res) =>{
       res.json({ data: requests })
 });


// getting specific request

router.get('/:id', (req, res) => {  
  const  requestId = req.params.id;  
  const request = requestList.find(request => request.id === requestId);    
  return res.json({request});
});

//Creating
router.post("/", (req, res) => {
  const partnerID = req.body.partnerID;
  const description = req.body.description;
  const consult = req.body.consult;
  const date = new Date();
  const myDate = date.toLocaleString();
  const accepted = req.body.accepted;
  const feedback = req.body.feedback;

  const schema = {
    partnerID:    Joi.required(),
    description:  Joi.required(),
    consult:   Joi.boolean().required(),
    accepted:  Joi.any().valid([0, 1,2]).required(),
   
  }

const result = Joi.validate(req.body, schema)

if (result.error) return res.status(400).send({ error: result.error.details[0].message })




  const request = new Request(
    partnerID,
    myDate,
    description,
    consult,
    accepted,
    feedback
  );

  requests.push(request);
  res.json({ data: requests });
});

//update
router.put("/:id",  (req, res) => {
  const requestId = req.params.id;
  
  const requestUpdate = req.body.description;
  const consult = req.body.consult;
  const Accepted = req.body.accepted;
  const Feedback = req.body.feedback;
  const request =  requests.find(request => request.requestID === requestId);
  
  const schema = {
    consult:   Joi.boolean(),
    accepted:  Joi.any().valid([0, 1,2])
   
  }

const result = Joi.validate(req.body, schema);

if (result.error) return res.status(400).send({ error: result.error.details[0].message })
  
  if (consult) request.consult = consult;
  
  if (Feedback) request.feedback = Feedback;
  
  if (typeof (Accepted) != undefined ) request.accepted = Accepted;
  
  if (requestUpdate) request.description = requestUpdate;
  
  res.json({ data: requests });
});

//Delete

router.delete("/:requestId",  (req, res) => {
  const requestID = req.params.requestId;
  const request = requests.find(x => x.requestID == requestID);

  let idx = requests.indexOf(request);
  requests.splice(idx, 1);
  res.json({ data: requests });
});

module.exports = router;
