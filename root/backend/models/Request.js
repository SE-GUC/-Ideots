
const uuid = require('uuid')
const mongoose = require('mongoose')

const Schema = mongoose.Schema


const RequestSchema = new Schema(
    {
        partnerID :
        {
            type : Schema.Types.ObjectId,

            ref:'Users',
//required : true

        }
        ,
        consultancyID :
        {
            type : Schema.Types.ObjectId,
            ref:'Users',
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
         //   required : true
        } 
        ,
        accepted : {
            

            type : Boolean,

           // required : true
        
        },                                  //-1 rejected , 0 pending , 1 accepted
        feedback :
        {
            type: String,
        
        },


    }
)
               
module.exports = Request = mongoose.model('requests',RequestSchema)