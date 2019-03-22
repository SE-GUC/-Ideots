// The  Application Model
const mongoose=require('mongoose')
const schema=mongoose.Schema

const ApplicationSchema = new schema({
        //applicantId:Schema.Types.ObjectId,
    applicantId:{
        Type:schema.Types.ObjectId,
        required:true,
        // ref:'User'
    },
        
    taskId:{
        Type:schema.Types.ObjectId,
        required:true,
        // ref:'Task'
    },
    date:{
        Type:Date,
        default:Date.now()
    },
    acceptence:{                // acceptance state for the application  -1: rejected  , 0: waiting  , 1: accepted
        type:Number,
        min:[-1,'Must be -1 or 0 or 1'],
        max:[1,'Must be -1 or 0 or 1'],
        default:0

    },
    
})

var Application=mongoose.model('Application',ApplicationSchema)
module.exports = Application