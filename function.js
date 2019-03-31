const axios = require('axios');

const functions = {
    
    getAllNotifications : async() => {
        const notifications = await axios.get("https://lirten-hub-ideots.herokuapp.com/api/notifications")
        return notifications
    },
    
    getSpecificNotification : async() => {
        const id =await  functions.getAllNotifications()
        const notification = await axios.get("https://lirten-hub-ideots.herokuapp.com/api/notifications/"+id.data.data[0]._id)
        return notification

    },
    
    postOneNotification : async () => {
         body = {
            content: "leeh",
            recieverId: "54759eb3c090d83494e2d804",
            notifierId: "54759eb3c090d83494e2d803"
        }

        let postRes = await axios.post("https://lirten-hub-ideots.herokuapp.com/api/notifications",body);
        return postRes
    },

    

   

    updatingAnotification : async() => {
        params = {
            isRead: true
        }
        const id =await  functions.getAllNotifications()
        let update = await axios.put("https://lirten-hub-ideots.herokuapp.com/api/notifications/"+id.data.data[0]._id,params)
        return update
    },

    deleteNotification : async() => {
        const id =await  functions.getAllNotifications()
        const deleteReq = await axios.delete("https://lirten-hub-ideots.herokuapp.com/api/notifications/"+id.data.data[0]._id)
        return deleteReq 
    }


}

module.exports = functions;