
//const uuid = require('uuid')
const mongoose = require('mongoose')

const Schema = mongoose.Schema


const RequestSchema = new Schema(
    {
       
        partnerID :
        {
            type : Schema.Types.ObjectId,
            required : true
        }
        ,
        description :
        {
            type: String,
            required: true
        }
        ,
        date : 
        {
            type: String,
            
        }
        ,
        consult : 
        {
            type : Boolean,
            required : true
        } 
        ,
        accepted : {
            
            type : Number,
            required : true
        
        },                                  //-1 rejected , 0 pending , 1 accepted
        feedback :
        {
            type: String,
        
        }

    }
)
               
module.exports = Request = mongoose.model('requests',RequestSchema)