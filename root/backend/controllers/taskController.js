const Task = require("../models/Task");
const notificationController=require('../controllers/notificationController');

exports.getOneTask = async function(taskId) {    
    try{ 
        const task = await Task.findOne({"_id":taskId})
        if(!task)
             return res.status(400).send({error: 'Task does not exist'})
        return task;
        }
        catch(error)
        {
          console.log(error)   
        }
};

exports.notifyUser=async function (taskId,recieverId,content){
  try{
    const task = await Task.findOne({"_id":taskId})
    recieverId=task.partnerID
        body={           
                "content": content + ' , '+taskId ,
                "recieverId": recieverId,
                "notifierId": taskId
            }
        await notificationController.postNotification(body);

  }
  catch(error){
    console.log(error)
  }
}