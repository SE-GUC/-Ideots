
// The  Application Model
const mongoose=require('mongoose')
const Schema=mongoose.Schema

const ApplicationSchema = new Schema({
    applicantId:{
        type : Schema.Types.ObjectId ,
        required:true,
        ref:'Users'
    },
        
    taskId:{
        type : Schema.Types.ObjectId ,
        required:true,
         ref:'tasks'
    },
    date:{
        type:Date,
	    default: Date.now 
    },
    acceptance:{                // acceptance state for the application  -1: rejected  , 0: waiting  , 1: accepted
        type:Number,
        min:[-1,'Must be -1 or 0 or 1'],
        max:[1,'Must be -1 or 0 or 1'],
        default:0

    }
    
})

module.exports = Application=mongoose.model('applications',ApplicationSchema)