// Dependencies
const express = require("express");
const Joi = require("joi");
const router = express.Router();
Joi.objectId = require("joi-objectid")(Joi);
const passport = require("passport");

// Models
const Notification = require("../../models/Notification");
// const User = require('../../models/User');

// Get all notification
router.get("/", async (req, res) => {
  const notifications = await Notification.find()
    .populate("recieverId")
    .populate("adminId");

  res.json({ data: notifications });
});
//----------------------------------------------------------------------------------------------

// Get notification in range
router.get("/:limit/:offset", async (req, res) => {
  const recieverId = req.user._id;
  const schema = {
    limit: Joi.required(),
    offset: Joi.required()
  };
  const result = Joi.validate(req.params, schema);
  if (result.error)
    return res.status(400).send({ error: result.error.details[0].message });
  const limit = parseInt(req.params.limit, 10);
  const offset = parseInt(req.params.offset, 10); // if some thing wrong happend remove the populate 
  // const notifications = await Notification.find({ recieverId: recieverId }).populate("recieverId")
  const notifications = await Notification.find({ recieverId: recieverId }).sort({isRead:1,date: -1}).populate("recieverId")
  .populate("adminId")
    .skip(offset)
    .limit(limit);
  res.json({ data: notifications });
});

// Get specific notification
router.get("/:id", async (req, res) => {
  const notificationId = req.params.id;
  const notification = await Notification.findById(notificationId)
    .populate("recieverId")
    .populate("adminId");
  if (!notification)
    return res.status(400).send({ error: "Notification does not exist" });
  return res.json({ notification });
});

// Create a new notification
router.post("/", async (req, res) => {
  try {
    const schema = {
      content: Joi.string().required(),
      // recieverId: Joi.objectId().required(),
      notifierId: Joi.objectId().required(),
      recieverId: Joi.objectId(),
      adminId: Joi.objectId()
    };

    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).send({ error: result.error.details[0].message });
    }
    /*
        const reciever = User.findOne({recieverId});
        if(!reciever)
          return res.status(404).send({error:'reciever does not exist'}); 
          */

    const newNotification = await Notification.create(req.body);
    return res.json({
      msg: "Notification was created successfully",
      data: newNotification
    });
  } catch (error) {
    console.log(error);
  }
});

//update notification
router.put("/:id", async (req, res) => {
  try {
    const notificationId = req.params.id;
    const notification = Notification.findOne({ notificationId });
    if (!notification)
      return res.status(400).send({ error: "Notification does not exist" });

    const schema = {
      isRead: Joi.boolean()
    };

    const result = Joi.validate(req.body, schema);
    if (result.error)
      return res.status(400).send({ error: result.error.details[0].message });
    const updatedNotification = await Notification.updateOne(
      { _id: notificationId },
      req.body
    );
    res.json({ data: updatedNotification });
  } catch (error) {
    // will be handled
    console.log(error);
  }
});

//delete notification
router.delete("/:id", async (req, res) => {
  try {
    const notificationId = req.params.id;
    const notification = Notification.findOne({ notificationId });
    if (!notification)
      return res.status(400).send({ error: "Notification does not exist" });
    const deletedNotification = await Notification.findByIdAndRemove(
      notificationId
    );
    res.json({
      msg: "Notification was deleted successfully",
      data: deletedNotification
    });
  } catch (error) {
    //error will be handled later
    console.log(error);
  }
});

//specific user

router.patch("/:id", async (req, res) => {
  const recieverId = req.params.id;
  const notifications = await Notification.find({ recieverId: recieverId });
  res.json({ data: notifications });
});

module.exports = router;
