const Task = require("../models/Task");

exports.getOneTask = async function(taskID) {    
    try{ 
        const task = await Task.findOne({"_id":taskID})
        if(!task)
             return res.status(400).send({error: 'Task does not exist'})
        return task;
        }
        catch(error)
        {
          console.log(error)   
        }
};
