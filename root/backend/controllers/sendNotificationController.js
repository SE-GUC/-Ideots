const Admin = require("../models/Admin");
const User = require("../models/User");
const Task = require("../models/Task");
const notificationController = require("../controllers/notificationController");


exports.getOneTask = async function(taskId) {
  try {
    const task = await Task.findOne({ _id: taskId });
    if (!task) return res.status(400).send({ error: "Task does not exist" });
    return task;
  } catch (error) {
    console.log(error);
  }
};


exports.notifyUser = async function(notifierId, recieverId, content) {
  try {
    body = {
      content: content,
      recieverId: recieverId,
      notifierId: notifierId
    };
    await notificationController.postNotification(body);
  } catch (error) {
    console.log(error);
  }
};

exports.notifyManyUsers = async function(notifierId, ids, content) {
  try {
    ids.forEach(async function(idItem) {
      const recieverId = idItem;
      body = {
        content: content ,
        recieverId: recieverId,
        notifierId: notifierId
      };
      await notificationController.postNotification(body);

  }); 
  } catch (error) {
    console.log(error);
  }
};

exports.notifyAllMembers = async function(notifierId, content) {
  try {
    const ids = await User.find({type: "member" }, { _id: 1 });
    ids.forEach(async function(idItem) {
      const recieverId = idItem;
      body = {
        content: content ,
        recieverId: recieverId,
        notifierId: notifierId
      };
      await notificationController.postNotification(body);

  }); 
  } catch (error) {
    console.log(error);
  }
};

exports.notifyAllPartners = async function(notifierId, content) {
  try {
    const ids = await User.find({type: "partner" }, { _id: 1 });
    ids.forEach(async function(idItem) {
      const recieverId = idItem;
      body = {
        content: content ,
        recieverId: recieverId,
        notifierId: notifierId
      };
      await notificationController.postNotification(body);

  }); 
  } catch (error) {
    console.log(error);
  }
};

exports.notifyAllConsultancy = async function(notifierId, content) {
  try {
    const ids = await User.find({type: "consultancy_agency" }, { _id: 1 });
    ids.forEach(async function(idItem) {
      const recieverId = idItem;
      body = {
        content: content ,
        recieverId: recieverId,
        notifierId: notifierId
      };
      await notificationController.postNotification(body);

  }); 
  } catch (error) {
    console.log(error);
  }
};

exports.notifyAdmins = async function(notifierId, content) {
  try {
      const adminIds = await Admin.find({}  , {_id:1});
      adminIds.forEach(async function(idItem) {
        const recieverId = idItem;
        body = {
          content: content,
          adminId: recieverId,
          notifierId: notifierId
        };
        await notificationController.postNotification(body);
      }); 
  } catch (error) {
    console.log(error);
  }
};





