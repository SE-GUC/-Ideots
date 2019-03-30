const axios = require('axios');

const functions = {
    postOneNotification : async () => {
        params = {
            content: "hello brother",
            recieverId: "54759eb3c090d83494e2d804",
            notifierId: "54759eb3c090d83494e2d803"
        }

        let postRes = await axios.post("http://localhost:3000/api/notification",params);
        return postRes
    },

    getAllNotifications : async() => {
        const notifications = await axios.get("http://localhost:3000/api/notification")
        return notifications
    },

    getSpecificNotification : async() => {
        const notification = await axios.get("http://localhost:3000/api/notification/5c9cefeeb1cf804b90d3fd61")
        return notification

    },

    updatingAnotification : async() => {
        params = {
            isRead: true
        }

        let update = await axios.put("http://localhost:3000/api/notification/5c9cefeeb1cf804b90d3fd61", params)
        return update
    },

    deleteNotification : async() => {
        const deleteReq = await axios.delete("http://localhost:3000/api/notification/5c9cefeeb1cf804b90d3fd61")
        return deleteReq 
    }


}

module.exports = functions