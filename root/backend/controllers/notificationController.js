const Notification = require("../models/Notification");

exports.postNotification = async function(body) {
  try {
    const newNotification = await Notification.create(body);
    return newNotification;
  } catch (error) {
    console.log(error);
  }
};
