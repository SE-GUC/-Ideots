// The Notification Model

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotificationSchema = new Schema({
    content : {
        type : String ,
        required : true 
    } ,
    recieverId:{
        type : Schema.Types.ObjectId ,
        required : true 
    },
    notifierId:{
        type : Schema.Types.ObjectId ,
        required : true 
    },
    date:{
        type : Date , 
        default: Date.now 
    },
    isRead : {
        type : Boolean ,
        default:false
    }
     
}) ; 
module.exports = Notification=mongoose.model('notifications',NotificationSchema)