const Task = require("../models/Task");
const Admin = require("../models/Admin");
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

exports.notifyUser = async function(taskId, recieverId, content) {
  try {
    body = {
      content: content + " , " + taskId,
      recieverId: recieverId,
      notifierId: taskId
    };
    await notificationController.postNotification(body);
  } catch (error) {
    console.log(error);
  }
};

exports.notifyManyUsers = async function(taskId, recieverIds, content) {
  try {
    recieverIds.forEach(async function(idItem) {
      const recieverId = idItem;
      await notifyUser(taskId, recieverId,content);
    });
  } catch (error) {
    console.log(error);
  }
};


exports.notifyAdmins = async function(taskId, content) {
  try {
    const ids = await Admin.find({}  , {_id:1});
    await notifyManyUsers(taskId, ids, content);
  } catch (error) {
    console.log(error);
  }
};






