const mongoose = require('mongoose')
require('mongoose-type-url');
const Schema = mongoose.Schema


const TaskSchema = new Schema(
    {
       
        partnerID :
        {
            type : Schema.Types.ObjectId,
            ref:'Users',

        }
        ,
        requiredSkills :
        {
            type : [String],
           
        }
        ,
        consultancyID :
        {
            type : Schema.Types.ObjectId,
            ref:'Users'
           // required : true
        }
        ,
        description :
        {
            type: String,
            required: true
        }
        ,
        payment :
        {
            type: Number,
            //required: true
        }
        ,
       /* finalProduct :
        {
            type: URL,
           // required: true
        }*/

        finalProduct:
        {
            type: mongoose.SchemaTypes.Url
        }
       
        ,
        timeLine : 
        {
            type: Date,
            
        }
        ,
        state : 
        {
            type: String,
            
        }
        ,
        category : 
        {
            type : String,
          //  required : true
        } 
        ,
        yearsOfExperience : {
            
            type : Number,
            //required : true
        
        },                                  //-1 rejected , 0 pending , 1 accepted
        done :
        {
            type: Boolean,
            //required:true
        
        },
        ratePartnerDoer :
        {
            type: Number,
            //required:true
        
        },
        ratePartnerConsultancy :
        {
            type: Number,
            //required:true
        
        },
        assignedPerson ://ID ?????????????????????????????????????
        {
            type: Schema.Types.ObjectId,
           // required:true
           ref:'Users'
        
        },
        applicants ://IDs ?????????????????????????????????????
        {
            type: [Schema.Types.ObjectId],
           // required:true
           ref:'Users'
        
        }


    }
)
               
module.exports = Request = mongoose.model('tasks',TaskSchema)