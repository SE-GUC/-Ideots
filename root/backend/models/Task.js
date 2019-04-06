const mongoose = require('mongoose')
require('mongoose-type-url');
const Schema = mongoose.Schema


const TaskSchema = new Schema(
    {
       
        partnerID :
        {
            type : Schema.Types.ObjectId,
            required : true
        }
        ,
        requiredSkills :
        {
            type : [String],
            required : true
        }
        ,
        consultancyID :
        {
            type : Schema.Types.ObjectId,
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
            required: true
        }
        ,
       /* finalProduct :
        {
            type: URL,
           // required: true
        }*/

        finalProduct: {
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
            required : true
        } 
        ,
        yearsOfExperience : {
            
            type : Number,
            required : true
        
        },                                  //-1 rejected , 0 pending , 1 accepted
        done :
        {
            type: Boolean,
            required:true
        
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
        
        },
        applicants ://IDs ?????????????????????????????????????
        {
            type: [Schema.Types.ObjectId],
           // required:true
        
        }


    }
)
               
module.exports = Request = mongoose.model('tasks',TaskSchema)