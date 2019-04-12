const Request = require("../models/Request");
const User = require("../models/User");

const notificationController=require('../controllers/notificationController');

exports.getOneRequest = async function(requestId) {    
    try{ 
        const request = await Request.findOne({"_id":requestId})
        if(!task)
             return res.status(400).send({error: 'Request does not exist'})
        return request;
        }
        catch(error)
        {
          console.log(error)   
        }
};

exports.notifyUser=async function (requestId,recieverId,content){
  try{
    const request = await Request.findOne({"_id":requestId})
    recieverId=request.partnerID
        body={           
                "content": content + ' , '+requestId ,
                "recieverId": recieverId,
                "notifierId": requestId
            }
        await notificationController.postNotification(body);

  }
  catch(error){
    console.log(error)
  }
}

exports.notifyManyUsers = async function(requestId, recieverIds, content) {
    try {
      recieverIds.forEach(async function(idItem) {
        const recieverId = idItem;
        await this.notifyUser(requestId, recieverId,content);
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  
  exports.notifyAdmins = async function(requestId, content) {
    try {
      const ids = await User.find({type: "admin"}  , {_id:1});
      await this.notifyManyUsers(requestId, ids, content);
    } catch (error) {
      console.log(error);
    }
  };
  